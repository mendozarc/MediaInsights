var ReportInfo = function () {

	var handleReportInfo = function () {
		var loadDataTable = function (id) {
			//$.ajax({
			//	type: 'POST',
			//	url: 'ReportInfo.aspx/getContents',
			//	contentType: contentType,
			//	dataType: "json",
			//	data: JSON.stringify({ projectBrief: id }),
			//	success: function (data) {
			//		$("#testtable").DataTable().destroy();
			//		$('#testtable').empty();

			//		var d = JSON.parse(data.d);
			//		var f = d[0];
			//		$("#testtable").DataTable({
			//			columns: f.columns,
			//			data: f.rows
			//		});
			//	}
			//})
			//.fail(function () {
			//	CommSights.alert("<b>Failed!</b> Failed to load contents.", "danger");
			//});
		}

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

		$.ajax({
			type: 'POST',
			url: 'ReportInfo.aspx/getProjects',
			contentType: contentType,
			dataType: "json",
			success: function (data) {
				var items = [];
				$.each(JSON.parse(data.d), function (i, item) {
					items.push('<li value="' + item.ID + '"><a href="javascript:;">' + item.Name + '</a></li>');
					//items.push('<li><a href="?id=' + item.ID + '">' + item.Name + '</a></li>');
				});
				$('#project_list').append(items.join(''));
			}
		})
			.fail(function () {
				CommSights.alert("<b>Failed!</b> Failed to load projects.", "danger");
			});

		$("#project_list").on('click', "li", function (e) {
			var li = $(this);
			if (li.hasClass("active")) return;

			$("#project_list li").removeClass("active");
			li.addClass("active");
			loadDataTable(li.attr('value'));
		});
	}

	var portlet = '#report_contents';
	var table = $('#sample_editable_1');
	var projectBriefId = 1;// $('#project_brief_id');
	var contentType = "application/json; charset=utf-8";

	var saveRecord = function (args) {
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
	};

	var deleteRecord = function (id) {
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

	var getLayouts = function () {
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
	}

	var getProjects = function () {
		$.ajax({
			type: 'POST',
			url: 'ReportInfo.aspx/getProjects',
			contentType: contentType,
			dataType: "json",
			success: function (data) {
				var items = [];
				$.each(JSON.parse(data.d), function (i, item) {
					items.push('<li><a href="?id=' + item.ID + '">' + item.Name + '</a></li>');
				});
				$('#project_list').append(items.join(''));
			}
		})
			.fail(function () {
				CommSights.alert("<b>Failed!</b> Failed to load layouts.", "danger");
			});
	}

	return {

		init: function () {
			jQuery(document).ready(function () {
				Metronic.init(); // init metronic core components
				Layout.init(); // init current layout
				//Demo.init(); // init demo features
				TableEditable.init();
				handleReportInfo();
				//getLayouts();
				//getProjects();
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