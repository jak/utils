/**
 * Tests for date/dayOrdinal
 * @author Rob Taylor [manix84@gmail.com]
 * @requires src/date/dayOrdinal
 */
define([
    'src/date/dayOrdinal'
], function (dayOrdinal) {
    module('date/dayOrdinal');

    test('dayOrdinal', function () {
        equal(dayOrdinal(new Date(1287496289000)), 'th', "Day Ordinal (EG: 'th', 'st', 'rd')");
    });
});
