/**
 * request a querystring variable
 * @param {*} variable 
 * @returns {string|null} 
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable)
            return pair[1];
    }
    return (false);
}

/**
 * return query string as an array
 * of key and value pairs
 * @returns {Array}
 */
function getQueryArray() {
    let result = [];
    let query = window.location.search.substring(1);
    // Regex for replacing addition symbol with a space
    let pl = /\+/g;
    let decode = function (s) {
        return decodeURIComponent(s.replace(pl, " "));
    };
    let match;
    // key:value splitter
    let search = /([^&=]+)=?([^&]*)/g;
    let key;
    let value;

    while (match = search.exec(query)) {
        key = match[1];
        value = match[2];
        if (decode(key) in result) {
            if (!Array.isArray(result[decode(key)]))
                result[decode(key)] = [result[decode(key)]];
            result[decode(key)].push(decode(value));
        } else result[decode(key)] = decode(value);
    }
    return result;
};
