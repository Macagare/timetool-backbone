var EditView = Backbone.View.extend({
    // Cache the template function for a single item.
    template: _.template( TextLoader.load("templates/edit.tpl") ),
    
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