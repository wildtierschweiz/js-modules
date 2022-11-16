
/**
 * check password complexity
 * @param {String} p the password to check 
 * @param {Object} options
 * @return {Object}
 */
 function isComplexPassword(p, options) {
    options = options ?? {};
    var result = {};
    result.result = true;
    var defaults = {
        length: 8,
        upper: 1,
        lower: 1,
        num: 1,
        special: 1
    };
    var settings = {
        ...defaults,
        ...options
    };

    var a_upper = /[A-Z]/;
    var a_lower = /[a-z]/;
    var a_num = /[0-9]/;
    var a_special = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

    if (p.length < settings.length) {
        result.result = false;
        result.error = "PASSWORD_TOO_SHORT";
        result.target = settings.length;
        return result;
    }

    var upper = settings.upper;
    var lower = settings.lower;
    var num = settings.num;
    var special = settings.special;

    for (var i = 0; i < p.length; i++) {
        if (a_upper.test(p[i]))
            upper--;
        else if (a_lower.test(p[i]))
            lower--;
        else if (a_num.test(p[i]))
            num--;
        else if (a_special.test(p[i]))
            special--;
    }

    if (upper > 0) {
        result.result = false;
        result.error = "PASSWORD_UPPER_MISSING";
        result.target = settings.upper
    }
    if (lower > 0) {
        result.result = false;
        result.error = "PASSWORD_LOWER_MISSING";
        result.target = settings.lower
    }
    if (num > 0) {
        result.result = false;
        result.error = "PASSWORD_NUM_MISSING";
        result.target = settings.num
    }
    if (special > 0) {
        result.result = false;
        result.error = "PASSWORD_SPECIAL_MISSING";
        result.target = settings.special
    }
    return result;
}
