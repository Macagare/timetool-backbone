var ListView = Backbone.View.extend({
    tagName: 'ul',
    events: {
        'click a': 'navigate'
    },
    template: _.template( TextLoader.load("templates/list-empty.tpl") ),
    initialize: function() {
        this.model.on('change', this.render, this);
    },
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
    template: _.template( TextLoader.load("templates/list-item.tpl") ),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});