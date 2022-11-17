/*
 * jQuery plugin bootstrap select2
 * Author: dani d
 * needs <select> ctrelem
 */

(function ($) {
    $.fn.bs5select2 = function (options) {
        var api = {};
        var defaults = {
            ctrlelem: null,
            ctrlname: '',
            ctrltype: '',
            chosen: '',
            disabled: false,
            readonly: false,
            required: false,
            visible: true,
            tooltip: '',
            multiple: false,
            allowClear: false,
            sortable: false,
            minimumInputLength: 0,
            ajaxurl: '',
            class: 'form-control',
            placeholder: '',
            onChange: $.noop,
            // needs select2-bootstrap-5-theme.css
            theme: 'bootstrap-5', //'default',
            // template result callback
            templateResult: (state) => (state.text),
        };

        var settings = $.extend(true, {}, defaults, options);

        var init = function () {
            build();
        };

        var create = function () {
            // remove current selection, if select2 is initialized
            if (settings.ctrlelem.hasClass('select2-hidden-accessible')) {
                settings.ctrlelem.val(null).trigger('change');
                settings.ctrlelem.select2('destroy');
                settings.ctrlelem.off('change');
            }
            // add element class
            settings.ctrlelem.attr('class', settings.class);
            if (settings.multiple)
                settings.ctrlelem.attr('multiple', 'multiple');
            if (settings.disabled)
                settings.ctrlelem.attr('disabled', 'disabled');
            if (settings.readonly)
                settings.ctrlelem.attr('readonly', 'readonly');
            if (settings.required)
                settings.ctrlelem.attr('required', 'required');
            settings.ctrlelem.attr('placeholder', settings.placeholder);
            if (settings.tooltip) {
                settings.ctrlelem.attr('title', settings.tooltip);
                settings.ctrlelem.attr('data-bs-placement', 'top');
                settings.ctrlelem.attr('data-bs-toggle', 'tooltip');
                settings.ctrlelem.tooltip({
                    trigger: 'hover'
                });
            }
            // append control markup and events to the container
            if (settings.ajaxurl) {
                if (settings.sortable)
                    settings.ctrlelem.select2_sortable({
                        ajax: {
                            url: settings.ajaxurl,
                            dataType: 'json',
                            cache: false,
                        },
                        disabled: settings.disabled,
                        placeholder: settings.placeholder,
                        tags: settings.tags,
                        allowClear: settings.allowClear,
                        data: settings.chosen,
                        minimumInputLength: settings.minimumInputLength,
                        maximumSelectionLength: settings.maximumSelectionLength,
                        templateResult: settings.templateResult,
                        theme: settings.theme,
                    });
                else
                    settings.ctrlelem.select2({
                        ajax: {
                            url: settings.ajaxurl,
                            dataType: 'json',
                            cache: false,
                        },
                        disabled: settings.disabled,
                        placeholder: settings.placeholder,
                        tags: settings.tags,
                        allowClear: settings.allowClear,
                        data: settings.chosen,
                        minimumInputLength: settings.minimumInputLength,
                        maximumSelectionLength: settings.maximumSelectionLength,
                        templateResult: settings.templateResult,
                        theme: settings.theme,
                    });
            } else {
                if (settings.sortable)
                    settings.ctrlelem.select2_sortable({
                        placeholder: settings.placeholder,
                        tags: settings.tags,
                        allowClear: settings.allowClear,
                        data: settings.chosen,
                        disabled: settings.disabled,
                        minimumInputLength: settings.minimumInputLength,
                        maximumSelectionLength: settings.maximumSelectionLength,
                        templateResult: settings.templateResult,
                        theme: settings.theme,
                    });
                else
                    settings.ctrlelem.select2({
                        placeholder: settings.placeholder,
                        tags: settings.tags,
                        allowClear: settings.allowClear,
                        data: settings.chosen,
                        disabled: settings.disabled,
                        minimumInputLength: settings.minimumInputLength,
                        maximumSelectionLength: settings.maximumSelectionLength,
                        templateResult: settings.templateResult,
                        theme: settings.theme,
                    });
            }
            if (settings.chosen) {
                var selection = [];
                settings.chosen.forEach(function (value, index) {
                    selection.push(value['id']);
                });
                settings.ctrlelem.val(selection).trigger('change');
            }
            settings.ctrlelem.on('change', function () {
                if ($.isFunction(settings.onChange))
                    settings.onChange();
            });
        };

        var build = function () {
            if (!settings.ctrlelem.length)
                return;
            create();
        };

        api.value = function () {
            var result = [];
            var data = settings.ctrlelem.select2('data');
            if (!data)
                return result;
            data.forEach(function (k, v) {
                result.push(k.id);
            });
            return result;
        };

        api.ctrlname = function () {
            return settings.ctrlname;
        };

        api.update = function (data) {
            settings.chosen = data.chosen;
            settings = $.extend(true, {}, settings, data);
            build();
        };

        api.destroy = function () {
        };

        init();
        return api;
    };
})($);

/**
 * select2 sortable
 */
(function ($) {
    $.fn.extend({
        select2_sortable: function (options) {
            var select = $(this);
            $(select).select2(options);
            var ul = $(select).next('.select2-container').first('ul.select2-selection__rendered');
            ul.sortable({
                placeholder: 'ui-state-highlight',
                forcePlaceholderSize: true,
                items: 'li:not(.select2-search__field)',
                tolerance: 'pointer',
                delay: 500,
                stop: function () {
                    $($(ul).find('.select2-selection__choice').get().reverse()).each(function () {
                        var selected = $(select).select2('data');
                        var value = $(this).attr('title');
                        for (var i = 0; i < selected.length; i++) {
                            if (selected[i].text == value) {
                                value = selected[i].id;
                            }
                        }
                        var option = $(select).find('option[value="' + value + '"]')[0];
                        $(select).prepend(option);
                    });
                }
            });
        }
    });
}($));
