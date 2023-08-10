(function ($) {
    $.fn.flatpickr = function (options) {
        var api = {};
        var defaults = {
            ctrlelem: null,
            ctrltype: '',
            ctrldata: {
                dateFormat: "Y-m-d",
                enableTime: false,
                enableSeconds: false,
                time_24hr: true,
                maxDate: null,
                minDate: null,
                defaultDate: new Date(),
                locale: 'en'
            },
            disabled: false,
            readonly: false,
            visible: true,
        };
        var settings = $.extend(true, {}, defaults, options);

        var init = function () {
            build();
        };

        var create = function () {
            $e = $('<input></input>');
            $e.flatpickr(settings.ctrlelem);
            return $e;
        };

        var build = function () {
            settings.ctrlelem.empty();
            if (settings.visible === true)
                settings.ctrlelem.append(create());
        };

        api.update = function (data) {
            settings = $.extend({}, settings, data);
            build();
        };

        init();
        return api;
    };
})($);
