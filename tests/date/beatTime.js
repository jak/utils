/**
 * Tests for date/beatTime
 * @author Rob Taylor [manix84@gmail.com]
 * @requires src/date/beatTime
 */
define([
    'src/date/beatTime'
], function (beatTime) {
    module('date/beatTime');

    test('beatTime', function () {
        equal(beatTime(new Date(1287496289000)), 619, 'Swatch Beat Time');
    });
});
