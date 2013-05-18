var Job = Backbone.Model.extend({
    defaults: {
        title: "Neue Aufgabe",
        date: "",
        duration: "",
        description: ""
    }
});

var TimeTool = Backbone.Collection.extend({
    model: Job
});

var NavigationView = Backbone.View.extend({
    events: {
        'click a': 'navigate'
    },

    navigate: function(el) {
        Backbone.history.navigate($(el.target).attr('href'), { trigger: true });
        return false;
    }
});


var JobView = Backbone.View.extend({
    template: _.template( Loader.load("templates/job.tpl") ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});

var ListView = Backbone.View.extend({
    tagName: 'ul',
    events: {
        'click a': 'navigate'
    },
    template: _.template( Loader.load("templates/list-empty.tpl") ),
    render: function () {
        if (this.model.length) {
            this.model.each(function (job) {
                this.$el.append(new ListViewItem({ model: job }).render().el);
            }, this);
        } else {
            this.$el.append(this.template());
        }
        return this;
    },
    navigate: function(el) {
        Backbone.history.navigate($(el.target).attr('href'), { trigger: true });
        return false;
    }
});

var ListViewItem = Backbone.View.extend({
    tagName: 'li',
    template: _.template( Loader.load("templates/list-item.tpl") ),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var EditView = Backbone.View.extend({
    // Cache the template function for a single item.
    template: _.template( Loader.load("templates/edit.tpl") ),
    
    events: {
        'click input[type="submit"]': 'save'
    },

    save: function() {
        this.model.set({
            title: this.$el.find('#title').val(),
            date: this.$el.find('#date').val(),
            duration: this.$el.find('#duration').val(),
            description: this.$el.find('#description').val()
        });
        this.trigger('finished');
        return false;
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var TimeToolApp = Backbone.Router.extend({
    routes: {
        '': 'home',
        'job/add': 'add',
        'job/:id': 'display'
    },

    view: null,

    highestID: 0,

    initialize: function() {
        this.timetool = new TimeTool();
    },

    switchView: function(view) {
        if (this.view) {
            if (this.view.destroy) {
                this.view.destroy();
            }
            this.view = null;
        }
        this.view = view;
        $('#main').empty().append(view.render().el);
        return view;
    },

    home: function() {
        this.switchView(new ListView({ model: this.timetool }));
        $('#navigation .active').removeClass('active');
        $('#navigation [href="/"]').parent('li').addClass('active');
    },

    add: function() {
        var app = this;
        this.switchView(new EditView({
            model: new Job({
                id: ++this.highestID
            })
        }));
        $('#navigation .active').removeClass('active');
        $('#navigation [href="/recipe/add"]').parent('li').addClass('active');
        this.view.on('finished', function() {
            app.timetool.add(this.model);
            Backbone.history.navigate('/', { trigger: true });
        });
    },

    display: function(id) {
        this.switchView(new JobView({
            model: this.timetool.get(id)
        }));
    },

    templateLoader: function(url) {
        var data = "<h1> failed to load url : " + url + "</h1>";
        $.ajax({
            async: false,
            url: url,
            success: function(response) {
                data = response;
            }
        });
        return data;
    }
});

$(function() {
    var nav = new NavigationView({ el: $('#navigation') });
    var app = new TimeToolApp();
    Backbone.history.start();
});
