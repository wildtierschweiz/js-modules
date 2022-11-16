(function ($) {
    $.fn.bs5checkbox = function (options) {
        var api = {};
        var defaults = {
            ctrlelem: null,
            ctrlname: '',
            ctrltype: '',
            id: '',
            value: '',
            checked: false,
            disabled: false,
            readonly: false,
            required: false,
            containerclass: '',
            class: '',
            title: '',
            label: '',
            tooltip: '',
            onChange: $.noop,
        };
        var settings = $.extend(true, {}, defaults, options);

        var init = function () {
            build();
        };

        var create = function () {
            var $e = $('<div></div>');
            $e.attr('class', 'form-check ' + settings.containerclass);
            var $label = $('<label></label>');
            $label.attr('for', settings.id);
            $label.addClass('form-check-label');
            $label.text(settings.label);
            var $input = $('<input></input>');
            $input.attr('type', 'checkbox');
            $input.attr('name', settings.ctrlname);
            if (settings.id)
                $input.attr('id', settings.id);
            $input.attr('value', settings.value);
            if (settings.checked)
                $input.attr('checked', 'checked');
            if (settings.disabled)
                $input.attr('disabled', 'disabled');
            if (settings.required)
                $input.attr('required', 'required');
            if (settings.readonly)
                $input.attr('readonly', 'readonly');
            if (settings.title)
                $input.attr('title', settings.title);
            $input.attr('class', 'form-check-input ' + settings.class);
            if (settings.tooltip) {
                $input.attr('title', settings.tooltip);
                $input.attr('data-bs-placement', 'top');
                $input.tooltip({
                    trigger: 'hover'
                });
            }
            $input.on('click', function () {
                if (settings.readonly)
                    return false;
            });
            $input.on('change', function () {
                if ($.isFunction(settings.onChange))
                    settings.onChange();
            });
            $e.append($input);
            $e.append($label);
            return $e;
        };

        var build = function () {
            settings.ctrlelem.empty();
            settings.ctrlelem.append(create());
        };

        api.value = function () {
            if (settings.ctrlelem.find('input').prop('checked'))
                return settings.value;
            else return null;
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
