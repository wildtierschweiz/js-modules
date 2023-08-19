(function ($) {
    $.fn.bs4select = function (options) {

        var api = {};
        var defaults = {
            data: {},
            ctrlelem: null,
            ctrlname: '',
            ctrltype: '',
            options: {},
            chosen: '',
            disabled: false,
            readonly: false,
            visible: true,
            tooltip: '',
            class: 'form-control',
            placeholder: 'Please select',
            onChange: $.noop,
        };

        var settings = $.extend(true, {}, defaults, options);

        var init = function () {
            settings = $.extend(true, {}, settings, settings.data);
            build();
        };

        // creating markup and event listeners for the control
        var create = function () {
            var $e = $('<select></select>');
            $e.attr('class', settings.class);
            if (settings.disabled)
                $e.attr('disabled', 'disabled');
            $e.attr('title', settings.tooltip);
            // position of tooltip
            $e.attr('data-placement', 'top');

            if (settings.placeholder) {
                var $placeholder = $('<option></option>');
                $placeholder.attr('value', '');
                $placeholder.text(settings.placeholder);
                $e.append($placeholder);
            }

            $.each(settings.options, function (k, v) {
                var $option = $('<option></option>');
                $option.attr('value', k);
                $option.text(v);
                // value is currently chosen
                if (k.trim() == settings.chosen)
                    $option.attr('selected', true);
                // when clicking a dropdown option entry
                $option.click(function () {
                    settings.chosen = $(this).attr('value').trim();
                    if ($.isFunction(settings.onChange))
                        settings.onChange();
                });
                $e.append($option);
            });
            $e.tooltip({
                trigger: 'hover'
            });
            // fix persistent tooltips
            $e.on('click', function () {
                $(this).tooltip('hide');
            });
            return $e;
        };

        // build the control
        var build = function () {
            settings.ctrlelem.empty();
            if (settings.visible)
                settings.ctrlelem.append(create());
        };

        // get chosen value
        api.value = function () {
            return (settings.chosen);
        };

        api.ctrlname = function () {
            return (settings.ctrlname);
        };

        // update the created module
        api.update = function (data) {
            settings = $.extend(true, {}, settings, data);
            build();
        };

        api.destroy = function () {
        };

        init();
        return api;
    };
})($);
