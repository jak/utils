/**
 * Core utility functions
 * @author Rob Taylor [manix84@gmail.com]
 */

define('utils/core', function () {
    /**
     * @exports utils/core
     */
    var utils = {

        /**
         * Finds and reports the object type, rather than just
         *   - This is based on code by Douglas Crockford.
         * @params {mixed} mixedObj - Anything.
         * @returns {string} Name of the object type.
         * @example utils.getType(new Date());      // RESULT: "date"
         * @example utils.getType(new String());    // RESULT: "string"
         * @example utils.getType(true);            // RESULT: "boolean"
         */
        getType: function (mixedObj) {
            // Get object type
            return Object.prototype.toString
                .call(mixedObj) // turn called object to a string
                .match(/^\[object\s(.*)\]$/)[1] // Loose the "[object " and "]" from and only pass the object type.
                .toLowerCase(); // Lowercase the name, because it comes out as "Date" or "String"
        },

        /**
         * Takes the Query/Search String, and parses it into an object.
         * @return {Object} An object, containing all query keys and values.
         */
        readQueries: function () {
            var query = [],
                outputObj = {},
                i = 0,
                queries;

            if (window.location.search) {
                queries = window.location.search.substring(1).split('&');
                for (; i < queries.length; i++) {
                    query = queries[i].split('=');
                    outputObj[query[0]] = query[1] || '';
                }
            }
            return outputObj;
        }
    };

    return utils;
});
