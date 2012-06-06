var CollectionItemView = Backbone.View.extend({

    log: function(text) {
        console.log(this.label + " - " + text);
    },

    getDefaultTemplate: function() {
        return _.template("<ul><% _.each(data, function(value) { %><li><%= value %></li><% }) %></ul>");
    },

    parseOptions: function(options) {
        options = options || {};

        this.label = options.label || "CollectionItemView";
        this.template = options.template || this.getDefaultTemplate();
    },

    bindEvents: function(options) {
        this.model.bind("change", this.render, this);
    },

    render: function() {
        this.$el.html(this.template({ data: this.model.serialize() }));
        return this;
    },

    initialize: function(options) {
        this.parseOptions(options);
        this.bindEvents(options);
    }
});
