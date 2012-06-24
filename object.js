/**
 * Object utilities which should be useful to all.
 * @author Rob Taylor [manix84@gmail.com]
 */

define('utils/object', [
    'utils/core'
], function (utilsBase) {

    /**
     * @exports utils/object
     * @requires utils/core
     */
    var object = {

        /**
         * Turns an object into a string
         * @param {object} object - Object to be converted to a string
         * @example object.toString({key1: 'var', key2: 'var'}); // RETURNS: "{key1: 'var', key2: 'var'}"
         * @returns {string} E.G: "{key1: 'var', key2: 'var'}"
         */
        toString: function (object) {
            if (typeof JSON === 'object' && typeof JSON.stringify !== 'undefined') {
                return JSON.stringify(object);
            } else {
                var parse = function (input) {
                    var output = [],
                        value,
                        key;

                    for (key in input) {
                        if (input.hasOwnProperty(key)) {
                            value = input[key];
                            switch (typeof value) {
                            case 'object':
                                output[output.length] = ("\"" + key + "\":{ " + parse(value).join(", ") + "}");
                                break;
                            case 'string':
                                output[output.length] = ["\"" + key + "\":\"" + value.toString() + "\""];
                                break;
                            default:
                                output[output.length] = ["\"" + key + "\":" + value.toString()];
                            }
                        }
                    }
                    return output;
                };
                return "{" + parse(object).join(", ") + "}";
            }
        },

        /**
         * Checks whether the passed object is empty
         * @param {object} object - object to be checked
         * @example object.isEmpty({key1: 'var', key2: 'var'}); // RETURNS: false
         * @example object.isEmpty({); // RETURNS: true
         * @returns {boolean}
         */
        isEmpty: function (object) {
            var prop;
            for (prop in object) {
                if (object.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return true;
        },

        /**
         * Compare two objects to each-other.
         * @param {object} objectA - first object to be compared to second
         * @param {object} objectB - second object to be compared to first
         * @example object.compare({key1: 'var', key2: 'var'}, {key1: 'var', key2: 'var'}); // RETURNS: true
         * @example object.compare({key1: 'var', key2: 'var'}, {key1: 'var'}); // RETURNS: false
         * @returns {boolean}
         */
        compare: function (objectA, objectB) {
            var key;

            if (typeof objectA !== 'object' || typeof objectB !== 'object') {
                return false;
            } else if (this.length(objectA) !== this.length(objectB)) {
                return false;
            } else {
                for (key in objectA) {
                    if (objectA.hasOwnProperty(key)) {
                        if (typeof objectA[key] !== typeof objectB[key]) {
                            return false;
                        }
                        if ((objectA[key] === null) !== (objectB[key] === null)) {
                            return false;
                        }
                        switch (typeof objectA[key]) {
                        case 'undefined':
                            if (typeof objectB[key] !== 'undefined') {
                                return false;
                            }
                            break;
                        case 'object':
                            if (objectA[key] !== null && objectB[key] !== null &&
                                    (objectA[key].constructor.toString() !== objectB[key].constructor.toString() ||
                                    !this.compare(objectA[key], objectB[key]))) {
                                return false;
                            }
                            break;
                        case 'function':
                            if (objectA[key].toString() !== objectB[key].toString()) {
                                return false;
                            }
                            break;
                        default:
                            if (objectA[key] !== objectB[key]) {
                                return false;
                            }
                        }
                    }
                }
                return true;
            }
        }
    };

    return object;
});
