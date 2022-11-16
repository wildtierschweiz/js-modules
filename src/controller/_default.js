/**
 * this is an example js page controller
 * which uses the modules
 */
(function ($) {
    $.fn.controller = function (options, callback) {
        var api = {};
        var defaults = {
            // ajax event callbacks
            beforeSend: $.noop,
            complete: $.noop,
            error: $.noop
        };
        var controls = {};
        var settings = $.extend({}, defaults, options);

        /**
         * initial query to build modules
         * from server data
         */
        var init = function () {
            $.ajax({
                url: window.location.href,
                type: 'GET',
                success: build,
                beforeSend: settings.complete,
                complete: settings.complete,
                error: settings.error,
            });
        };

        /**
         * build modules with server data
         * @param {Object} data 
         */
        var build = function (data) {
            // on change callback for all modules
            var onChange = query;
            $.each(data.controls ?? {}, function (k, v) {
                // create the module instance, if module is found
                if ($.isFunction($.fn[v.ctrltype])) {
                    controls[k] = $.fn[v.ctrltype](
                        $.extend({}, { id: k + '_1', ctrlelem: $('#' + k), onChange: onChange }, v)
                    );
                }
            });
        };

        /**
         * update modules with server data
         * @param {Object} data 
         */
        var update = function (data) {
            $.each(data.controls, function (k, v) {
                controls[k].update(v);
            });
        };

        /**
         * query the server with parameters
         * from the modules
         */
        var query = function () {
            $.ajax({
                url: window.location.href,
                type: 'GET',
                data: createState(),
                success: update,
                beforeSend: settings.beforeSend,
                complete: settings.complete,
                error: settings.error,
            });
        };

        /**
         * create state and array of module 
         * values to query the server
         * @param {Bool} replace 
         * @returns {Array} query parameters
         */
        var createState = function (replace) {
            var p = {};
            $.each(controls, function (k, v) {
                if ($.isFunction(v.ctrlname) && $.isFunction(v.value))
                    p[v.ctrlname()] = v.value();
            });
            // create url from control values
            var url = window.location.href.split('?')[0] + '?' + $.param(p)
            if (replace === true)
                window.history.replaceState({ url: url }, url, url);
            else window.history.pushState({ url }, url, url);
            return p;
        };

        init();
        return api;
    };
})($);
