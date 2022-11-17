/**
 * monkey patches for
 * onpushstate and onreplacestate events
 */
(function (history) {
    // backup original
    var pushState = history.pushState;
    var replaceState = history.replaceState;
    // add pushState monkey patch
    history.pushState = function (state) {
        // if user function was added
        if (typeof history.onpushstate == "function")
            history.onpushstate({ state: state });
        // original functionality
        return pushState.apply(history, arguments);
    };
    // add replaceState monkey patch
    history.replaceState = function (state) {
        // if user function was added
        if (typeof history.onreplacestate == "function")
            history.onreplacestate({ state: state });
        // original functionality
        return replaceState.apply(history, arguments);
    };
})(window.history);
