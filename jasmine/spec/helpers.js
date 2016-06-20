
// Abstract out some common testing methods in custom ensure object.
ensure = {

    definedAndNotEmpty: function (obj, key) {

        describe(obj.name + ' ' + key, function () {
            it('is defined and not empty', function () {
                expect( obj[key] ).toBeDefined();
                expect( obj[key].trim() ).not.toBe('');
            });
        });
    }
};