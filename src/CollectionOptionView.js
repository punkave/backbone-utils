var CollectionOptionView = CollectionItemView.extend({
    tagName: 'option',

    initialize: function(options) {
        CollectionItemView.prototype.parseOptions.call(this, options);

        this.model.on('change:selected', function(model, selected) {
            this.$el.prop('selected', selected);
        }, this);
    },

    // This is a default inline template that simply lists all keys and values for the model
    getDefaultTemplate: function() {
        return _.template("<%= data.name %>");
    },

    render: function() {
        this.$el.html(this.template({ data: this.model.toJSON() }));
        this.$el.val(this.model.get('id'));
        this.$el.prop('selected', this.model.get('selected'));
        
        return this;
    }

});
