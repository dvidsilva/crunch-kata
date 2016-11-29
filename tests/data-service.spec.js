describe("Tests for the data service that fetches the fixtures", function () {
    var dataService;
    var orderResponse = {
        "element": "shoji:order",
        "self": "/datasets/349d49/variables/hier/",
        "graph": [{
            "Awareness Metrics": [{
                "Taxis": ["11b0b9", "7a89e0"]
            }, {
                "Coffee": ["786c0f", "2d27ab"]
            }]
        }]
    };

    beforeEach(function () {
        module('crunch-kata');
        inject(function (_data_, $httpBackend) {
            dataService = _data_;
        });

    });

    it("Should reject a promise if not name is provided.", function () {
        dataService.get().then(function (data) {
            expect(data).not.toBeDefined();
        }, function (err) {
            expect(err).toBeTruthy();
        });

    });

    it("Fetches the order.json file from fixtures.", function () {
        dataService.get('order').then(function (data) {
            expect(data.element).toBeTruthy();
        }, function (err) {
            expect(err).toBeNull();
        });

    });

    it("Fetches the variables.json file from fixtures.", function () {
        dataService.get('variables').then(function (data) {
            expect(data).toBeTruthy();
        }, function (err) {
            expect(err).toBeNull();
        });

    });

    it("Returns a cached value when requested for a subsequent time.", function () {
        dataService.get('order').then(function (data) {
            expect(data._cached).toBeTruthy();
        }, function (err) {
            expect(err).toBeNull();
        });

    });

});
