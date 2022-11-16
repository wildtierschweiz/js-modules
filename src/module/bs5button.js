(function ($) {
    $.fn.bs5button = function (options) {
        var api = {};
        var defaults = {
            ctrlelem: null,
            ctrlname: '',
            ctrltype: '',
            type: '',
            label: '',
            name: '',
            disabled: false,
            tooltip: '',
            class: 'btn',
            onClick: $.noop,
            onClickReplaceUrl: '',
        };
        var settings = $.extend(true, {}, defaults, options);

        /**
         * init the module
         */
        var init = function () {
            build();
        };

        /**
         * create dom element
         * @returns {jQueryDomElement}
         */
        var create = function () {
            var $e = $('<button></button>');
            if (settings.class)
                $e.attr('class', settings.class);
            if (settings.tooltip) {
                $e.attr('title', settings.tooltip);
                $e.attr('data-placement', 'top');
                $e.tooltip({
                    trigger: 'hover'
                });
            }
            if (settings.name)
                $e.attr('name', settings.name);
            if (settings.type)
                $e.attr('type', settings.type);
            if (settings.label)
                $e.text(settings.label);
            if (settings.disabled) {
                $e.addClass('disabled');
                $e.attr('disabled', 'disabled');
            } else {
                $e.removeClass('disabled');
                $e.removeAttr('disabled');
            }
            $e.on('click', function (event) {
                event.preventDefault();
                if (settings.onClickReplaceUrl)
                    window.location.replace(settings.onClickReplaceUrl);
                else if ($.isFunction(settings.onClick))
                    settings.onClick();
            });
            return $e;
        };

        var build = function () {
            if (!settings.ctrlelem.length)
                return;
            settings.ctrlelem.empty();
            settings.ctrlelem.append(create());
        };

        api.ctrlname = function () {
            return settings.ctrlname;
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
