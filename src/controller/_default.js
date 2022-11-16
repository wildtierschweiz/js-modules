(function ($) {
    $.fn.controller = function (options, callback) {
        var api = {};
        var defaults = {};
        var controls = {};

        var init = function () {
            $.ajax({
                url: window.location.href,
                type: 'GET',
                success: build,
                beforeSend: function () {
                    console.log('sending request ...');
                },
                complete: function () {
                    console.log('complete');
                },
                error: function (xhr, status, error) {
                    console.log('error', status, error);
                },
            });
        };

        // build the markup and events for all controls
        var build = function (data) {
            $.each(data.controls ?? {}, function (k, v) {
                // create the module instance, if module is found
                if ($.isFunction($.fn[v.ctrltype])) {
                    controls[k] = $.fn[v.ctrltype](
                        $.extend({}, { id: k + '_1', ctrlelem: $('#' + k), onChange: $.noop }, v)
                    );
                }
            });
        };

        init();
        return api;
    };
})($);
