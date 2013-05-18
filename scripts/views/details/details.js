var JobView = Backbone.View.extend({
    template: _.template( TextLoader.load("templates/job.tpl") ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    },
    events: {
        'click a' : 'navigate'
    },
    navigate: function(el) {
        Backbone.history.navigate($(el.target).attr('href'), { trigger: true });
        return false;
    }
});