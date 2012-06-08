var CollectionSelectView = CollectionView.extend({
    tagName: 'select',

    getDefaultItemView: function() {
        return CollectionOptionView;
    },

    getValue: function() {
        return this.$el.val();
    }
});
