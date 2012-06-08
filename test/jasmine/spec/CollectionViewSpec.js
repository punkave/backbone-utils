describe("CollectionView", function() {
    var TestCollection = Backbone.Collection.extend({
        model: Backbone.Model
    });
    var collection;
    var collectionView;

    beforeEach(function() {
        collection = new TestCollection([
            { name: "Test item 1" }
        ]);
        collectionView = new CollectionView({
            collection: collection,
            itemOptions: {
                template: _.template("<%= data.name %>")
            }
        });
    });

    it("should render collections", function() {
        collectionView.render();
        expect(collectionView.$el.html().length > 0).toBe(true);
    });

    it("should be able to create subviews", function() {
        var view = collectionView.createSubView( new Backbone.Model({ name: "New Model" }));
        view.render();
        expect(view.$el.html()).toBe("New Model");
    });

    it("should empty itself and clear all subviews when reset", function() {
        collectionView.reset();
        expect(collectionView.$el.html()).toBe("");
    });

    it("should call add when adding items to the collection", function() {
        spyOn(collectionView, "add");
        collection.add(new Backbone.Model({ name: "new super model " }));
        expect(collectionView.add).toHaveBeenCalled();
    });

    it("should render when the collection is reset", function() {
        spyOn(collectionView, "render");
        collection.reset();
        expect(collectionView.render).toHaveBeenCalled();
    });
});
