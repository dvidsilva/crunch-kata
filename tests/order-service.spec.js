describe("Order Service", function () {
    var orderService;
    beforeEach(function () {
        module('crunch-kata');
        inject(function (_crunchOrder_) {
            orderService = _crunchOrder_;
        });
    });

    it("Should flattened a graph as expected.", function () {
        var result = helpers.flattenGraph(data);
        it("The length of the result should be 4.", function () {
            expect(result.length).toBe(4);
        });

        it("The first element should be 11b0b9.", function () {
            expect(result[0]).toBe("11b0b9");
        });

    });

    it("Should return null if the position doesn't exists.", function () {
        expect(orderService).toBeDefined();
        orderService.get(100).then(function (result) {
            expect(result).toBeNull();
        }, function (err) {
            expect(err).toBeNull();
        });
    });

    it("Should return null if the position doesn't exists.", function () {
        orderService.get(1).then(function (result) {
            expect(result).toBeNull();
        }, function (err) {
            expect(err).toBeNull();
        });
    });

});
