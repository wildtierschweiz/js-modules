
(function ($) {
	$.fn.quillrte = function (options) {
		var api = {};
		var defaults = {
			data: {},
			ctrlelem: null,
			ctrlname: '',
			ctrltype: '',
			ctrldata: {
				theme: 'snow',
				modules: {
					toolbar: [
						[{ font: [] }],
						[{ header: [1, 2, 3, false] }],
						['bold', 'italic', 'underline'],
						[{ color: [] }, { background: [] }],
						['link'],
						['blockquote', 'code-block'],
						[{ list: 'ordered' }, { list: 'bullet' }],
						[{ indent: '-1' }, [{ indent: '+1' }]],
						['clean'],
					],
				},
			},
			chosen: '',
			disabled: false,
			visible: true,
		};

		var quill;

		// reset toolbar if customized, so the buttons don't get deep merged
		if (options?.ctrldata?.modules?.toolbar)
			defaults.ctrldata.modules.toolbar = {};
		var settings = $.extend(true, {}, defaults, options);

		var init = function () {
			settings = $.extend(true, {}, settings, settings.data);
			build();
		};

		// build the control
		var build = function () {
			settings.ctrlelem.empty();
			$('.ql-toolbar').remove();
			if (settings.visible) {
				settings.ctrlelem.html(settings.chosen);
				quill = new Quill(settings.ctrlelem.get(0), settings.ctrldata);
			}
			settings.chosen = quill.root.innerHTML;
			quill.on('text-change', function () {
				settings.chosen = quill.root.innerHTML;
			});
		};

		// update the control
		api.update = function (data) {
			settings = $.extend(true, {}, settings, data);
			build();
		};

		// get chosen value
		api.value = function () {
			return settings.chosen;
		};

		api.ctrlname = function () {
			return settings.ctrlname;
		};

		api.destroy = function () {
			settings.ctrlelem.empty();
			$('.ql-toolbar').remove();
		};

		init();
		return api;
	};
})($);
