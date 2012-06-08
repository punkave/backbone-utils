var CollectionItemView = Backbone.View.extend({
    log: function(text) {
        console.log(this.label + " - " + text);
    },

    // This is a default inline template that simply lists all keys and values for the model
    getDefaultTemplate: function() {
        return _.template("<ul><% _.each(data, function(value) { %><li><%= value %></li><% }) %></ul>");
    },

    // We do this manually to avoid unnecessary template compilation
    parseOptions: function(options) {
        options = options || {};

        this.label = options.label || "CollectionItemView";
        this.template = options.template || this.getDefaultTemplate();
    },

    // Re-render every time the model changes
    bindEvents: function(options) {
        this.model.bind("change", function() {
            this.render();
        }, this);
    },

    render: function() {
        this.$el.html(this.template({ data: this.model.toJSON() }));
        return this;
    },

    initialize: function(options) {
        this.parseOptions(options);
        this.bindEvents(options);
    }
});
