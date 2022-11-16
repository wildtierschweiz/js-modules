(function ($) {
    $.fn.bs5fileinput = function (options) {
        var api = {};
        var defaults = {
            ctrlelem: null,
            ctrlname: '',
            ctrltype: '',
            chosen: '',
            disabled: false,
            readonly: false,
            required: false,
            multiple: true,
            tooltip: '',
            id: '',
            containerclass: '',
            class: '',
            placeholder: '',
            onChange: $.noop,
        };
        var settings = $.extend(true, {}, defaults, options);

        var init = function () {
            build();
        };

        var create = function () {
            var $div = $('<div></div>');
            $div.attr('class', settings.containerclass);
            if (settings.tooltip) {
                $div.attr('title', settings.tooltip);
                $div.attr('data-bs-placement', 'top');
                $div.tooltip({ trigger: 'hover' });
            }
            if (settings.label) {
                var $label = $('<label></label>');
                $label.attr('class', 'form-label');
                if (settings.id)
                    $label.attr('for', settings.id);
                $label.text(settings.label);
            }
            var $input = $('<input></input>');
            $input.attr('class', 'form-control ' + settings.class);
            if (settings.id)
                $input.attr('id', settings.id);
            $input.attr('type', 'file');
            if (settings.required)
                $input.attr('required', 'required');
            if (settings.disabled)
                $input.attr('disabled', 'disabled');
            if (settings.readonly)
                $input.attr('readonly', 'readonly');
            if (settings.multiple)
                $input.attr('multiple', 'multiple');
            if (settings.chosen)
                if (settings.label)
                    $label.addClass('selected').text(settings.chosen);
            $input.attr('placeholder', settings.placeholder);
            $input.on('change', function () {
                var fileName = $(this).val().split("\\").pop();
                settings.chosen = fileName;
                if ($.isFunction(settings.onChange))
                    settings.onChange();
            });
            if (settings.label)
                $div.append($label);
            $div.append($input);
            return $div;
        };

        var build = function () {
            if (!settings.ctrlelem.length)
                return;
            settings.ctrlelem.empty();
            settings.ctrlelem.append(create());
        };

        api.value = function () {
            return (settings.chosen);
        };

        api.ctrlname = function () {
            return (settings.ctrlname);
        };

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
