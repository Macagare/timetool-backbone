var TimeToolApp = Backbone.Router.extend({
    routes: {
        '': 'home',
        'job/add': 'add',
        'job/:id': 'display'
    },

    contentView: null,
    sideView: null,

    highestID: 0,

    initialize: function() {
        this.timetool = new TimeTool();
    },

    switchContent: function(view) {
        if (this.contentView) {
            if (this.contentView.destroy) {
                this.contentView.destroy();
            }
            this.contentView = null;
        }
        this.contentView = view;
        $('#content').empty().append(view.render().el);
        return view;
    },

    switchSidebar: function(view) {
        if (this.sideView) {
            if (this.sideView.destroy) {
                this.sideView.destroy();
            }
            this.sideView = null;
        }
        this.sideView = view;
        $('#sidebar').empty().append(view.render().el);
        return view;
    },

    home: function() {
        var app = this;
        this.switchContent(new ListView({ model: this.timetool }));
        this.switchSidebar(new EditView({ model: new Job({id:++this.highestID}) }));
        this.sideView.on('finished', function() {
            app.timetool.add(this.model);
            app.sideView.model.set( new Job( {id:++app.highestID} ) );
            Backbone.history.navigate('/', { trigger: true });
        });
    },

    add: function() {
        var app = this;
        this.switchView(new EditView({
            model: new Job({
                id: ++this.highestID
            })
        }));
        this.view.on('finished', function() {
            app.timetool.add(this.model);
            Backbone.history.navigate('/', { trigger: true });
        });
    },

    display: function(id) {
        this.switchContent(new JobView({
            model: this.timetool.get(id)
        }));
    }
});