(function ($) {
	$.fn.bs5dropdown = function (options) {
		var api = {};
		var defaults = {
			ctrlelem: null,
			ctrlname: '',
			ctrltype: '',
			options: {},
			chosen: '',
			id: '',
			disabled: false,
			readonly: false,
			tooltip: '',
			containerclass: '',
			class: 'btn-secondary',
			placeholder: 'Please select',
			onChange: $.noop,
		};
		var settings = $.extend(true, {}, defaults, options);

		var init = function () {
			build();
		};

		var create = function () {
			var $e = $('<div></div>');
			$e.attr('class', 'dropdown w-100 ' + settings.containerclass);
			if (settings.disabled)
				$e.addClass('disabled');
			// create dropdown button
			var $button = $('<button></button>');
			$button.attr('class', 'btn dropdown-toggle w-100 ' + settings.class);
			$button.attr('data-toggle', 'dropdown');
			if (settings.id)
				$button.attr('id', settings.id);
			$button.attr('type', 'button');
			$button.attr('data-bs-toggle', 'dropdown');
			$button.attr('aria-expanded', 'false');
			if (settings.disabled)
				$button.addClass('disabled');
			$button.text(settings.placeholder);
			// create dropdown menu container
			var $ul = $('<ul></ul>');
			$ul.attr('class', 'dropdown-menu w-100');
			if (settings.id)
				$ul.attr('aria-labelledby', settings.id);
			// add options to dropdown menu
			$.each(settings.options, function (k, v) {
				var $li = $('<li></li>');
				var $a = $('<a></a>');
				$a.addClass('dropdown-item');
				$a.attr('data-value', k);
				$a.attr('href', '#');
				$a.text(v);
				// value is currently chosen
				if (k == settings.chosen) {
					$a.addClass('active');
					$button.text(v);
				}
				// when clicking a dropdown option entry
				$a.click(function (event) {
					event.preventDefault();
					// if no new value selected
					if (settings.chosen === $(this).attr('data-value'))
						return false;
					// reset active dropdown-item
					$(this).parents('.dropdown-menu').find('.active').removeClass('active');
					$(this).addClass('active');
					// set the new text to the dropdown button
					$(this).parents('.dropdown').find('.dropdown-toggle').text($(this).text());
					// set new chosen value
					settings.chosen = $(this).attr('data-value');
					if ($.isFunction(settings.onChange))
						settings.onChange(event, settings.chosen);
				});
				$li.append($a);
				$ul.append($li);
			});
			$e.append($button);
			$e.append($ul);
			if (settings.tooltip) {
				$e.attr('title', settings.tooltip);
				$e.attr('data-placement', 'top');
				$e.tooltip({
					trigger: 'hover'
				});
			}
			return $e;
		};

		var build = function () {
			if (!settings.ctrlelem.length)
				return;
			settings.ctrlelem.empty();
			settings.ctrlelem.append(create());
		};

		api.value = function () {
			return settings.chosen;
		};

		api.ctrlname = function () {
			return settings.ctrlname;
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
