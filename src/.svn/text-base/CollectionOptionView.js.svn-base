var CollectionOptionView = CollectionItemView.extend({
    tagName: 'option',

    // This is a default inline template that simply lists all keys and values for the model
    getDefaultTemplate: function() {
        return _.template("<%= data.name %>");
    },

    render: function() {
        this.$el.html(this.template({ data: this.model.toJSON() }));
        this.$el.val(this.model.get('id'));
        this.$el.prop('selected', this.model.get('selected'));
        
        return this;
    },

});
