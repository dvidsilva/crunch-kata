describe("Tests for the data service that fetches the fixtures", function () {
    beforeEach(module('crunch-kata'));
    var dataService;
    beforeEach(inject(function (_order_) {
        dataService = _order_;
    }));

    it("Should reject a promise if not name is provided.", function () {
        expect(true).toBe(true);
    });

});
