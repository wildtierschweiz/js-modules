(function ($) {
    $.fn.bs5image = function (options) {
        var api = {};
        var defaults = {
            ctrlelem: null,
            ctrltype: '',
            class: 'img-fluid',
            tooltip: '',
            src: '',
        };
        var settings = $.extend(true, {}, defaults, options);

        var init = function () {
            build();
        };

        var create = function () {
            $e = $('<img></img>');
            if (settings.class)
                $e.attr('class', settings.class);
            if (settings.src)
                $e.attr('src', settings.src);
            if (settings.tooltip) {
                $e.attr('title', settings.tooltip);
                $e.attr('data-bs-placement', 'top');
                $e.attr('data-bs-toggle', 'tooltip');
                $e.tooltip({
                    trigger: 'hover'
                });
            }
            return $e;
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
