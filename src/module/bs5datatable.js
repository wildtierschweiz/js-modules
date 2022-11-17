(function ($) {
    $.fn.bs5datatable = function (options) {
        var api = {};
        var defaults = {
            ctrlelem: null,
            ctrltype: '',
            ctrldata: {},
            containerclass: '',
            class: '',
            disabled: false,
        };
        var settings = $.extend(true, {}, defaults, options);

        var init = function () {
            build();
        };

        var create = function () {
            var $div = $('<div></div>');
            $div.attr('class', settings.containerclass);
            var $table = $('<table></table>');
            $table.attr('class', 'w-100 ' + settings.class);
            if (settings?.ctrldata?.caption?.title ?? null) {
                $title = $('<h4></h4>');
                $title.text(settings.ctrldata.caption.title);
                $div.append($title);
            }
            if (settings?.ctrldata?.caption?.subtitle ?? null) {
                $subtitle = $('<p></p>');
                $subtitle.text(settings.ctrldata.caption.subtitle);
                $div.append($subtitle);
            }
            $div.append($table);
            return $div;
        };

        var build = function () {
            if (!settings.ctrlelem.length)
                return;
            settings.ctrlelem.empty();
            settings.ctrlelem.append(create());
            settings.ctrlelem.find('table').DataTable(settings.ctrldata);
        };

        api.update = function (data) {
            settings = $.extend({}, settings, data);
            if (!$.isFunction(settings.ctrlelem.find('table').DataTable))
                build();
            settings.ctrlelem.find('table').DataTable(settings.ctrldata);
        };

        init();
        return api;
    };
})($);
