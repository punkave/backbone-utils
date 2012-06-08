var CollectionSelectView = CollectionView.extend({
    tagName: 'select',

    events: {
        "change select":    "callChangeFunction"
    },

    parseOptions: function(options) {
        // call super class
        CollectionView.prototype.parseOptions.call(this, options);

        this.addEmpty = options.addEmpty || false;
        this.changeFunction = options.changeFunction || function() {};
    },

    getDefaultItemView: function() {
        return CollectionOptionView;
    },

    getValue: function() {
        return this.$el.val();
    },

    render: function() {
        CollectionView.prototype.render.call(this);

        if (this.addEmpty) {
            this.collection.add([{ selected: true }], { at: 0 });
        }

        return this;
    },

    callChangeFunction: function(event) {
        this.changeFunction(this.getValue());
    }
});
