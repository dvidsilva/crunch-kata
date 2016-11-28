describe("Main jasmine file", function () {
    it("This test will fail if there are errors declaring the module", function () {
        beforeEach(module('crunch-kata'));
        expect(true).toBe(true);
    });
});
