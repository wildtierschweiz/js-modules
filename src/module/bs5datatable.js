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

        /**
         * initial build the control
         */
        var init = function () {
            build();
        };

        /**
         * create the dom element
         * @returns {jQueryDOMElement}
         */
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

        /**
         * build the control
         * @returns when the container element is not found
         */
        var build = function () {
            if (!settings.ctrlelem.length)
                return;
            if (!settings.ctrlelem.find('table').length)
                settings.ctrlelem.append(create());
            settings.ctrlelem.find('table').DataTable(settings.ctrldata);
        };

        /**
         * update control with server data
         * @param {Object} data
         */
        api.update = function (data) {
            settings = $.extend({}, settings, data);
            // TODO::better handling
            // otherwise the control needs to be destroyed manually
            //if (!(settings?.ctrldata?.destroy === true)) {
                api.destroy();
                settings.ctrlelem.append(create());
            //}
            settings.ctrlelem.find('table').DataTable(settings.ctrldata);
        };

        /**
         * destroy the control
         */
        api.destroy = function () {
            if (settings.ctrlelem.length && $.fn.dataTable.isDataTable(settings.ctrlelem.find('table')))
                settings.ctrlelem.find('table').DataTable().destroy();
            if (settings.ctrlelem.length)
                settings.ctrlelem.empty();
        };

        init();
        return api;
    };
})($);
