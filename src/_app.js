/**
 * exaple application
 */
 (function ($) {
    // page controller
    $.fn.app = function (options, callback) {
        var api = {};
        var defaults = {};
        var controller;
        var settings = $.extend({}, defaults, options);

        // constructor
        var init = function () {
            // onpush and onpop state events
            history.onpopstate = history.onpushstate = function (event) {
                if (!event.state)
                    return;
                // do something ...
            };
            // launch page controller, if exists
            if ($.isFunction($.fn.controller))
                controller = $.fn.controller();
        };

        init();
        return api;
    };
})($);
