describe("Tests for the data service that fetches the fixtures", function () {
    beforeEach(module('crunch-kata'));
    var dataService;
    beforeEach(inject(function (_data_) {
        dataService = _data_;
    }));

    it("Should reject a promise if not name is provided.", function () {
        dataService.get().then(function (data) {
        }, function (err) {
            expect(err).toBeTruthy();
        });
    });

    it("Fetches the order.json file from fixtures.", function () {
        dataService.get('order').then(function (data) {
            expect(data).toBeTruthy();
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
