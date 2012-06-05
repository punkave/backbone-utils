var CollectionItemView = Backbone.View.extend({
    label:      "CollectionItemView",
    template:   _.template(
        "<ul>
            <% _.each(item, function(value) { %>
                <li><%= value %></li>
            <% }) %>
        </ul>"
    ), 

    parseOptions: function(options) {
    },

    bindEvents: function(options) {
        this.model.bind("change", this.render, this);
    },

    render: function() {
        this.$el.html(this.template(this.model.serialize()));
        return this;
    }
});
