var CollectionView = Backbone.View.extend({
    initialize: function(options) {
        this.subViews = [];

        this.parseOptions(options);
        this.bindEvents(options);
    },

    // This is a handy function for debugging.
    log: function(text) {
        console.log(this.label + " - " + text);
    },

    // The default collectionFilter should simply return true. This will gaurantee that
    // everything in the collection is rendered
    getDefaultFilter: function() {
        return function(item) {
            return true;
        };
    },

    getDefaultItemView: function() {
        return CollectionItemView;
    },

    // Instead of doing anything fancy with _.pick or _.extend, I chose to do this manually.
    // I did so to avoid any extraneous work or memory usage when setting up default view
    // filters.
    parseOptions: function(options) {
        options = options || {};

        this.label = options.label || "CollectionView";
        this.collectionFilter = options.collectionFilter || this.getDefaultFilter();

        this.itemViewClass = options.itemViewClass || this.getDefaultItemView();
        this.itemOptions = options.itemOptions || {};

        return options;
    },

    // Binds to add and render events.
    bindEvents: function(options) {
        this.collection.bind("add", function(item, collection, options) {
            this.add(item, collection, options);
        }, this);

        this.collection.bind("remove", function(item, collection, options) {
            this.remove(item, collection, options);
        }, this);

        this.collection.bind("reset", function() {
            this.render()
        }, this);
    },

    // This is a helper function that instantiates a new itemView for an item
    // using default item options
    createSubView: function(item) {
        return new this.itemViewClass(_.extend(this.itemOptions, {
            model: item
        }));
    },

    // When a model is simply added to the collection, we only want to render one
    // sub view. We also maintain an ordering for subviews so we can put their
    // els in the right spot. This is more efficient then rendering the entire
    // collection for each addition
    add: function(item, collection, options) {
        var index = options.index;
        var view = this.createSubView(item);
        view.render();

        if (options.index < this.subViews.length) {
            this.subViews[options.index].$el.before(view.$el);
            this.subViews.splice(options.index, 0, view);
        } else {
            this.$el.append(view.$el);
            this.subViews.push(view);
        }
    },

    // When a model is simply removed from the collection, we only want to remove one
    // sub view. We also maintain an ordering for subviews so we can put their
    // els in the right spot. This is more efficient then rendering the entire
    // collection for each addition
    remove: function(item, collection, options) {
        var index = options.index;
        var view = this.subViews.splice(options.index, 1)[0];
        view.remove();
    },

    // Render the entire collection. This will empty the element and clear the
    // subViews array. Garbage collection will then free that stuff from memory
    render: function() {
        this.$el.empty();
        this.subViews = [];

        var self = this;
        this.collection.chain().filter(this.collectionFilter).each(function(item, index) {
            var view = this.createSubView(item);

            self.subViews[index] = view;
            self.$el.append(view.render().$el);
        }, this);

        return this;
    }
});

