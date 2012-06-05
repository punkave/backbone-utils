var CollectionView = Backbone.View.extend({
    subViews:   [],

    log: function(text) {
        console.log(this.label + " - " + text);
    },

    parseOptions: function(options) {
        options = options || {};

        this.label = options.label || "CollectionView";
        this.collectionFilter = options.collectionFilter || null;

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

        var collection = this.collection;
        if (this.collectionFilter) {
            collection = this.collection.filter(this.collectionFilter);
        }

        var self = this;
        collection.each(function(item) {
            var itemView = new self.itemViewClass(_.extend(self.itemOptions, {
                model: item
            }));

            self.subViews.push(itemView);
            self.$el.append(itemView.render().$el);
        });

        return this;
    }
});

