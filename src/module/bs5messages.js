(function ($) {
    $.fn.bs5messages = function (options) {
        var api = {};
        var defaults = {
            ctrlelem: null,
            ctrltype: '',
            options: {},
            containerclass: '',
            onChange: $.noop,
        };
        var settings = $.extend(true, {}, defaults, options);

        var init = function () {
            build();
        };

        var create = function () {
            var $div = $('<div></div>');
            $div.attr('class', settings.containerclass);
            // for ever message in options
            $.each(settings.options, function (k, v) {
                // set deafult dismissible parameter
                if (typeof v.dismissible === 'undefined')
                    v.dismissible = true;
                var $e = $('<div></div>');
                $e.attr('role', 'alert');
                $e.addClass('alert');
                $e.addClass('alert-' + v.type);
                if (v.dismissible === true) {
                    $e.addClass('alert-dismissible');
                    $e.addClass('fade');
                    $e.addClass('show');
                    var $button = $('<button></button>');
                    $button.attr('type', 'button');
                    $button.attr('class', 'btn-close');
                    $button.attr('data-bs-dismiss', 'alert');
                    $button.attr('aria-label', 'Close');
                    $e.append($button);
                }
                $e.html(v.text);
                $div.append($e);
            });
            return $div;
        };

        var build = function () {
            if (!settings.ctrlelem.length)
                return;
            settings.ctrlelem.empty();
            settings.ctrlelem.append(create());
        };

        api.update = function (data) {
            settings = $.extend({}, settings, data);
            build();
        };

        api.destroy = function () {
        };

        init();
        return api;
    };
})($);
