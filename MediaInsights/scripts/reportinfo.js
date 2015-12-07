var ReportInfo = function () {

	var editLink = '<a class="edit btn btn-xs blue" href="javascript;"><i class="fa fa-edit"></i> edit</a>';
	var deleteLink = '<a class="delete btn btn-xs red" href="javascript;"><i class="fa fa-trash-o"></i> delete</a>';
	var table = $("#sample_editable_1");
	var contentType = "application/json; charset=utf-8";
	var portlet = '#report_contents';
	var projectBriefId = '';

	var handleReportInfo = function () {

		// load layouts
		$.ajax({
			type: 'POST',
			url: 'ReportInfo.aspx/getLayout',
			contentType: contentType,
			dataType: "json",
			success: function (data) {
				$("#hiddenLayouts").text(data.d);
			}
		})
			.fail(function () {
				CommSights.alert("<b>Failed!</b> Failed to load layouts.", "danger");
			});

		// load projects
		$.ajax({
			type: 'POST',
			url: 'ReportInfo.aspx/getBriefs',
			contentType: contentType,
			dataType: "json",
			success: function (data) {
				var items = [];
				$.each(JSON.parse(data.d), function (i, item) {
					items.push('<li value="' + item.briefid + '"><a href="javascript:;">' + item.briefname + '</a></li>');
				});
				$('#project_list').append(items.join(''));
				setProjectBrief($('#project_list li:first-child'));
			}
		})
			.fail(function () {
				CommSights.alert("<b>Failed!</b> Failed to load projects.", "danger");
			});

		// set project
		$("#project_list").on('click', "li", function (e) {
			var li = $(this);
			if (li.hasClass("active")) return;
			$("#project_list li").removeClass("active");
			setProjectBrief(li);
		});

		function setProjectBrief(li) {
			li.addClass("active");
			projectBriefId = li.attr('value');
			loadDataTable();
		}

		function loadDataTable() {
			var edLink = editLink + deleteLink;
			var hiddenField = '<input type="hidden" value="{0}"></input>'

			$.ajax({
				type: 'POST',
				url: 'ReportInfo.aspx/getContents',
				contentType: contentType,
				dataType: "json",
				data: JSON.stringify({ projectBrief: projectBriefId }),
				success: function (data) {
					table.DataTable().destroy();
					table.empty();
					var ba = [];
					$.each(JSON.parse(data.d), function () {
						var a = [];
						var id = '';
						$.each(this, function (key, value) {
							switch (key) {
								case 'ID':
									id = value;
									value = '<a href="/Pages/ReportContent.aspx?id=' + value + '"><i class="fa fa-search"></i></a>';
									break;
								case 'LayoutID':
									return;
							}
							a.push(value);
						})

						a.push(hiddenField.replace('{0}', id) + edLink);
						ba.push(a);
					});

					table.DataTable({
						data: ba,
						order: [[2, "asc"]],
						stateSave: true,
						columns: [
							{ "width": "20px", "searchable": false, "orderable": false },
							{ "title": "Title" },
							{ "title": "Sequence", "width": "70px", "searchable": false },
							{ "title": "Layout" },
							{ "title": "Actions", "width": "140px", "searchable": false, "orderable": false }
						]
					});
				}
			})
			.fail(function () {
				CommSights.alert("<b>Failed!</b> Failed to load contents.", "danger");
			});
		}
	}

	function saveRecord (args) {
		Metronic.blockUI({ target: portlet, boxed: true });

		var data = {
			contentId: args.id,
			projectBrief: projectBriefId,
			title: args.title,
			sequence: args.sequence,
			layout: args.layout,
			isNew: args.isNew
		};

		$.ajax({
			type: 'POST',
			url: 'ReportInfo.aspx/save',
			contentType: contentType,
			dataType: "json",
			data: JSON.stringify(data)
		})
            .fail(function () {
            	CommSights.alert("<b>Failed!</b> Saving failed.", "danger");
            })
            .always(function () {
            	Metronic.unblockUI(portlet);
            });
	}

	function deleteRecord (id) {
		Metronic.blockUI({ target: portlet, boxed: true });
		$.ajax({
			type: 'POST',
			url: 'ReportInfo.aspx/delete',
			contentType: contentType,
			dataType: "json",
			data: JSON.stringify({ id: id })
		})
            .fail(function () {
            	CommSights.alert("<b>Failed!</b> Delete failed.", "danger");
            })
            .always(function () {
            	Metronic.unblockUI(portlet);
            });
	}

	return {

		init: function () {
			jQuery(document).ready(function () {
				Metronic.init(); // init metronic core components
				Layout.init(); // init current layout
				TableEditable.init();
				handleReportInfo();
			})
		},

		saveRow: function (args) {
			saveRecord(args);
		},

		deleteRow: function (id) {
			deleteRecord(id);
		}
	};
}();