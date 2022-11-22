(function ($) {
    $.fn.bs5pagination = function (options) {
        var api = {};
        var defaults = {
            ctrlelem: null,
            ctrltype: '',
            ctrlname: '',
            options: {},
            chosen: '',
            disabled: false,
            readonly: false,
            tooltip: '',
            class: 'pagination justify-content-center flex-wrap',
            containerclass: '',
            onChange: $.noop,
        };
        var settings = $.extend(true, {}, defaults, options);

        var init = function () {
            build();
        };

        var create = function () {
            var $e = $('<nav></nav>');
            $e.attr('class', settings.containerclass);
            $e.attr('aria-label', 'Page navigation');

            var $ul = $('<ul></ul>');
            $ul.attr('class', settings.class);

            var $li_prev = $('<li></li>');
            $li_prev.attr('class', 'page-item');

            var $a_prev = $('<a></a>');
            $a_prev.attr('class', 'page-link');
            $a_prev.attr('href', '#');
            $a_prev.attr('aria-label', 'Previous');

            $a_prev.click(function (event) {
                event.preventDefault();
            });

            var $span1_prev = $('<span></span>');
            $span1_prev.attr('area-hidden', 'true');
            $span1_prev.html('&laquo;');

            $a_prev.append($span1_prev);
            $li_prev.append($a_prev);

            if (settings.chosen <= 1)
                $li_prev.addClass('disabled');

            $li_prev.click(function (event) {
                event.preventDefault();
                if (settings.chosen <= 1 || $(this).hasClass('disabled'))
                    return false;
                settings.chosen--;
                if ($.isFunction(settings.onChange))
                    settings.onChange();
            });
            $ul.append($li_prev);

            $.each(settings.options, function (k, v) {
                $li = $('<li></li>');
                $li.addClass('page-item');
                $li.attr('data-value', v);
                if (v == settings.chosen)
                    $li.addClass('active');
                if (settings.disabled)
                    $li.attr('disabled', 'disabled');

                $a = $('<a></a>');
                $a.attr('class', 'page-link');
                $a.attr('href', '#');
                $a.text(v);
                $a.click(function (event) {
                    event.preventDefault();
                });
                $li.append($a);
                $li.click(function (event) {
                    event.preventDefault();
                    if (settings.chosen == $(this).attr('data-value')
                        || $(this).hasClass('active')
                        || $(this).hasClass('disabled'))
                        return false;
                    $(this).parent().find('.active').removeClass('active');
                    $(this).addClass('active');
                    settings.chosen = $(this).attr('data-value');
                    if ($.isFunction(settings.onChange))
                        settings.onChange();
                });
                $ul.append($li);
            });

            var $li_next = $('<li></li>');
            $li_next.attr('class', 'page-item');

            var $a_next = $('<a></a>');
            $a_next.attr('class', 'page-link');
            $a_next.attr('href', '#');
            $a_next.attr('aria-label', 'Next');
            $a_next.click(function (event) {
                event.preventDefault();
            });

            var $span1_next = $('<span></span>');
            $span1_next.attr('area-hidden', 'true');
            $span1_next.html('&raquo;');

            $a_next.append($span1_next);
            $li_next.append($a_next);

            if ($.inArray(settings.chosen + 1, settings.options) == -1)
                $li_next.addClass('disabled');

            $li_next.click(function (event) {
                event.preventDefault();
                if ($.inArray(settings.chosen + 1, settings.options) == -1)
                    return false;
                settings.chosen++;
                if ($.isFunction(settings.onChange))
                    settings.onChange();
            });

            $ul.append($li_next);
            if (settings.tooltip) {
                $e.attr('title', settings.tooltip);
                $e.attr('data-bs-placement', 'top');
                $e.tooltip({ trigger: 'hover' });
            }
            $e.append($ul);
            return $e;
        };

        var build = function () {
            settings.ctrlelem.empty();
            settings.ctrlelem.append(create());
        };

        api.update = function (data) {
            settings = $.extend({}, settings, data);
            build();
        };

        api.value = function () {
            return settings.chosen;
        };

        api.ctrlname = function () {
            return settings.ctrlname;
        };

        api.destroy = function () {
        };

        init();
        return api;
    };
})($);
