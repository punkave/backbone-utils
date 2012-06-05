var CollectionView = Backbone.View.extend({
    subViews:   [],

    log: function(text) {
        console.log(this.label + " - " + text);
    },

    parseOptions: function(options) {
        options = options || {};

        this.label = options.label || "CollectionView";
        this.itemViewClass = options.itemViewClass || CollectionItemView;
        this.itemOptions = options.itemOptions || {};

        return options;
    },

    initialize: function(options) {
        this.parseOptions(options);
        this.bindEvents(options);
    },

    bindEvents: function(options) {
        this.collection.bind("add", this.render, this);
        this.collection.bind("reset", this.render, this);
    },

    reset: function() {
        this.$el.empty();
        this.subViews = [];
    },

    render: function() {
        this.reset();

        var self = this;
        this.collection.each(function(item) {
            var itemView = new self.itemViewClass({
                model: item
            });

            self.subViews.push(itemView);
            self.$el.append(itemView.render().$el);
        });

        return this;
    }
});

