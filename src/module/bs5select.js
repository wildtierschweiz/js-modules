(function ($) {
    $.fn.bs5select = function (options) {

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
            class: 'form-select',
            containerclass: '',
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
            var $div = $('<div></div>');
            $div.attr('class', settings.containerclass);
            var $select = $('<select></select>');
            if (settings.label) {
                var $label = $('<label></label>');
                if (settings.id)
                    $label.attr('for', settings.id);
                $label.text(settings.label);
            }
            $select.attr('class', settings.class);
            if (settings.readonly)
                $select.attr('readonly', settings.readonly);
            if (settings.disabled)
                $select.attr('disabled', settings.disabled);
            if (settings.placeholder) {
                var $placeholder = $('<option></option>');
                $placeholder.attr('value', '');
                $placeholder.text(settings.placeholder);
                $select.append($placeholder);
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
                $select.append($option);
            });
            // fix persistent tooltips
            $select.on('click', function () {
                $(this).tooltip('hide');
            });
            if (settings.tooltip) {
                $div.attr('title', settings.tooltip);
                $div.attr('data-bs-placement', 'top');
                $div.attr('data-bs-toggle', 'tooltip');
                $div.tooltip({
                    trigger: 'hover'
                });
            }
            if (settings.label && !$div.hasClass('form-floating'))
                $div.append($label);
            $div.append($select);
            if (settings.label && $div.hasClass('form-floating'))
                $div.append($select);
            return $div;
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
