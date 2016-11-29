describe("Tests for the helpers service", function () {
    var helpers;
    beforeEach(function () {
        module('crunch-kata');
        inject(function (_helpers_) {
            helpers = _helpers_;
        });
    });

    var data = [
		{
			"Awareness Metrics": [
				{
					"Taxis": [
						"11b0b9",
						"7a89e0"
					]
				},
				{
					"Coffee": [
						"786c0f",
						"2d27ab"
					]
				}
			]
		},
    ];

    it("Should flattened a graph as expected.", function () {
        var result = helpers.flattenGraph(data);
        it("The length of the result should be 4.", function () {
            expect(result.length).toBe(4);
        });

        it("The first element should be 11b0b9.", function () {
            expect(result[0]).toBe("11b0b9");
        });

    });

});
