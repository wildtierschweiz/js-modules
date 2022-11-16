(function ($) {
	$.fn.bs5input = function (options) {
		var api = {};
		var defaults = {
			ctrlelem: null,
			ctrlname: '',
			ctrltype: '',
			id: '',
			label: '',
			chosen: '',
			type: 'text',
			disabled: false,
			readonly: false,
			required: false,
			tooltip: '',
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
			if (settings.label) {
				var $label = $('<label></label>');
				if (settings.id)
					$label.attr('for', settings.id);
				$label.text(settings.label);
			}
			var $input = $('<input></input>');
			if (settings.id)
				$input.attr('id', settings.id);
			$input.attr('class', 'form-control ' + settings.class);
			if (settings.type)
				$input.attr('type', settings.type);
			$input.attr('placeholder', settings.placeholder);
			$input.val(settings.chosen);
			if (settings.required)
				$input.attr('required', 'required');
			if (settings.disabled)
				$input.attr('disabled', 'disabled');
			if (settings.readonly)
				$input.attr('readonly', 'readonly');
			if (settings.tooltip) {
				$input.attr('title', settings.tooltip);
				$input.attr('data-placement', 'top');
				$input.tooltip({
					trigger: 'hover'
				});
			}
			$input.on('change', function () {
				settings.chosen = $(this).val();
				if ($.isFunction(settings.onChange))
					settings.onChange();
			});
			if (settings.label && !$div.hasClass('form-floating'))
				$div.append($label);
			$div.append($input);
			if (settings.label && $div.hasClass('form-floating'))
				$div.append($label);
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
