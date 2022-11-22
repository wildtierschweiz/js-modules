(function ($) {
    $.fn.bs5highchart = function (options) {
        var api = {};
        var defaults = {
            ctrlelem: null,
            ctrltype: '',
            ctrldata: {},
            disabled: false,
            // on print header image (is added when printing the chart)
            onprintheaderimage: false,
        };
        var settings = $.extend(true, {}, defaults, options);

        var init = function () {
            build();
        };

        var build = function () {
            if (!settings.ctrlelem.length)
                return;
            // highcharts set globals
            Highcharts.setOptions({
                lang: {
                    thousandsSep: settings?.ctrldata?.customsettings?.thousandSeparator ?? '\'',
                    decimalPoint: settings?.ctrldata?.customsettings?.decimalSeparator ?? '.',
                }
            });
            // format tooltips
            var formatter = function () {
                var s = '<b>' + this.x + '</b>',
                    sum = 0;
                $.each(this.points, function (i, point) {
                    s += '<br/><span style="color:' + point.color + '">●</span> '
                        + point.series.name + ': <b>' + Highcharts.numberFormat(point.y, settings.ctrldata.customsettings.decimals) + '</b>'
                        + ' (' + Math.round(point.percentage) + '%)';

                    sum += point.y;
                });
                s += '<br/>Total: <b>' + Highcharts.numberFormat(sum, settings.ctrldata.customsettings.decimals) + '</b>';
                return s;
            };

            // TODO:: PRINT HEADER IMAGE
            var image;
            var events = {
                /*
                load: function () {
                    if(this.options.chart.forExport) {
                        // add header image, when set
                        if(settings.onprintheaderimage) {
                            this.renderer.image(settings.onprintheaderimage,30,80,730,85).add();
                        }
                    }
                },
                afterPrint: function(event) {
                    this.options.chart.height = 700;
                    this.options.chart.spacingTop = 5;
                    this.options.chart.spacingBottom = 100;
                    this.options.chart.marginTop = 100;
                    // remove header image, if set
                    if(settings.onprintheaderimage) {
                        image.element.remove();
                    }
                    // rerender the control to update settings
                    api.update();
                },
                beforePrint: function(event) {
                    this.options.chart.height = 1000;
                    this.options.chart.spacingTop = 210;
                    this.options.chart.spacingBottom = 100;
                    this.options.chart.marginTop = 290;
                    // set header image before print, if one is set
                    if(settings.onprintheaderimage) {
                        image = this.renderer.image(settings.onprintheaderimage,30,80,730,85).add();
                    }
                },
                */
            };
            settings.ctrldata.tooltip.formatter = formatter;
            settings.ctrldata.chart.events = events;
            settings.ctrlelem.empty();
            settings.ctrlelem.highcharts(settings.ctrldata);
        };

        api.update = function (data) {
            settings = $.extend({}, settings, data);
            build();
        };

        init();
        return api;
    };
})($);
