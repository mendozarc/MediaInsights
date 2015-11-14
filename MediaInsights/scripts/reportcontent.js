var ReportContent = function () {
	var charts = [];
	var contentType = "application/json; charset=utf-8";
	var contentId = $('#contentId').val();
	var summary = $('label[title="Summary"] + div > textarea');
	var callout = $('label[title="Callout"] + div > textarea');
	var main_portlet = $('#main_portlet');
	var div_analysis_portlets = $('#analysis_portlets');
	var btnAddPortlet = $('a[data-id="add_portlet"]');

	var handleReportContent = function () {
		// load charts
		$.ajax({
			type: 'POST',
			url: 'ReportContent.aspx/getCharts',
			contentType: contentType,
			dataType: "json",
			success: function (data) {
				charts = JSON.parse(data.d);

				var ddChart = $('.select2me');
				ddChart.empty();
				$.each(charts, function () {
					ddChart.append($("<option></option>")
						.attr("value", this.ID)
						.attr("title", this.Description)
						.text(this.Name));
				});
			}
		})
			.fail(function () {
				CommSights.alert("<b>Failed!</b> Failed to load charts.", "danger");
			});

		// load content
		$.ajax({
			type: 'POST',
			url: 'ReportContent.aspx/getContent',
			contentType: contentType,
			dataType: "json",
			data: JSON.stringify({ contentId: contentId }),
			error: function (ts) { alert(ts.responseText) },
			success: function (data) {
				var content = JSON.parse(data.d);
				summary.val(content[0].Summary);
				if (content[0].LayoutID == 3) {
					showMainCallout(true);

					callout.val(content[0].Callout);
				} else if (content[0].LayoutID == 2) {
					btnAddPortlet.show();
					div_analysis_portlets.show();
					autosize.update($('textarea.autosizeme'));
				}

				if (content[0].LayoutID != 3) {
					
				}
				if (content[0].LayoutID != 2) {
					btnAddPortlet.hide();
					div_analysis_portlets.hide();
				}

				$('#content_title').text(content[0].Title);

				loadContentAnalysis();
			}
		})
			.fail(function () {
				CommSights.alert("<b>Failed!</b> Failed to load content.", "danger");
			});

		$('a.btn:last', main_portlet.children('.portlet-title').children('.actions')).click(function () {
			saveContent();
			// trigger other save
			$.each($('.portlet', div_analysis_portlets), function () {
				if (!$(this).is(':hidden')) {
					$('div.actions > a.btn:first', this).trigger('click');
				} else { return false; }
			});
		});

		$('div.actions > a.btn:first', div_analysis_portlets).click(function () {
			saveContentAnalysis($(this).closest('.portlet'));
		});

		$('div.actions > a.btn:nth-child(2)', div_analysis_portlets).click(function () {
			var thisPortlet = $(this);
			bootbox.confirm("Are you sure you want to delete this section?", function (result) {
				if (result) {
					// ajax
					// clear all values
					thisPortlet.closest('.portlet').hide();
					btnAddPortlet.show();
				}
			});
		});

		btnAddPortlet.click(function () {
			$('a.collapse').trigger('click');
			var hiddenFields = $('input[type="hidden"][data-sequence]');
			var portletCount = 0;
			$.each(hiddenFields, function () {
				var analysisPortlet = $(this).parent('.portlet');
				if (analysisPortlet.is(':hidden')) {
					analysisPortlet.show();
					$('a.expand', analysisPortlet).trigger('click');
					autosize.update($('textarea.autosizeme', analysisPortlet));
					if (portletCount > 1) btnAddPortlet.hide();
					return false;
				}
				portletCount = portletCount + 1;
			});
		})

		$('.select2me').on("click", function (e) {
			e.preventDefault();

			var data = [
			  ['Year', 'Sales', 'Expenses', 'Profit'],
			  ['2014', 1000, 400, 200],
			  ['2015', 1170, 460, 250],
			  ['2016', 660, 1120, 300],
			  ['2017', 1030, 540, 350]
						];

			var args = {
				chartType: 1,
				title: "Sales, Expenses, and Profit: 2014-2017"
			};
			//CommSights.loadChart.drawChart(data, args, document.getElementById("chart_div"));
		});

		function showMainCallout(show) {
			var form_group_callout = $('#form_group_callout');
			if (show) {
				form_group_callout.show();
				autosize.update(callout);
			} else {
				form_group_callout.hide();
				callout.val('');
			}
		}

		function loadContentAnalysis() {
			$.ajax({
				type: 'POST',
				url: 'ReportContent.aspx/getContentAnalysis',
				contentType: contentType,
				dataType: "json",
				data: JSON.stringify({ contentId: contentId }),
				error: function (ts) { alert(ts.responseText) },
				success: function (data) {
					var analyses = JSON.parse(data.d);

					$.each(analyses, function () {
						var inputHidden = $('input[data-sequence="' + this.Sequence + '"]')
						inputHidden.val(this.ID);
						var portletAnalysis = inputHidden.parent('.portlet');
						$('div.caption > span', portletAnalysis).text(this.Name);
						$('select[data-placeholder="select chart"]', portletAnalysis).val(this.Chart);
						$('textarea[placeholder="analysis..."]', portletAnalysis).val(this.Analysis);
						$('textarea[placeholder="callout..."]', portletAnalysis).val(this.Callout);
					});

					//summary.val(content[0].Summary);
					//if (content[0].LayoutID == 3) {
					//	showMainCallout(true);

					//	callout.val(content[0].Callout);
					//} else if (content[0].LayoutID == 2) {
					//	$('#lnkAdd').show();
					//	div_analysis_portlets.show();
					//	autosize.update($('textarea.autosizeme'));
					//}

					//$('#content_title').text(content[0].Title);
				}
			})
			.fail(function () {
				CommSights.alert("<b>Failed!</b> Failed to load content analysis.", "danger");
			});
		}
	};

	function saveContent() {
		Metronic.blockUI({ target: main_portlet, boxed: true });
		var data = {
			contentId: contentId,
			summary: summary.val(),
			callout: callout.val()
		};

		$.ajax({
			type: 'POST',
			url: 'ReportContent.aspx/saveSummaryCallout',
			contentType: contentType,
			dataType: "json",
			data: JSON.stringify(data),
			error: function (ts) { alert(ts.responseText) },
			success: function () {
				CommSights.alert("<b>Success.</b> Content has been saved.");
			}
		})
            .fail(function () {
            	CommSights.alert("<b>Failed!</b> Saving failed.", "danger");
            })
            .always(function () {
            	Metronic.unblockUI(main_portlet);
            });
	}

	function saveContentAnalysis(portlet) {
		Metronic.blockUI({ target: portlet, boxed: true });

		var portletSummary = $('label + textarea[placeholder="analysis..."]', portlet);
		var portletCallout = $('label + textarea[placeholder="callout..."]', portlet);
		var portletChart = $('select[data-placeholder="select chart"]', portlet);
		var field_id = $('input[type="hidden"]', portlet);
		var field_id_value = $('input[type="hidden"]', portlet).val();
		var id = field_id_value;
		if (field_id_value === '') {
			id = Custom.newGuid();
		}
		var name = $('div.caption span', portlet).text();

		var data = {
			id: id,
			name: name,
			contentId: contentId,
			sequence: field_id.attr('data-sequence'),
			chart: portletChart.val(),
			analysis: portletSummary.val(),
			callout: portletCallout.val(),
			isNew: field_id_value === ''
		};

		$.ajax({
			type: 'POST',
			url: 'ReportContent.aspx/saveContentAnalysis',
			contentType: contentType,
			dataType: "json",
			data: JSON.stringify(data),
			error: function (ts) { alert(ts.responseText) },
			success: function () {
				CommSights.alert("<b>Success.</b> Content has been saved.");
				field_id.val(id);
			}
		})
            .fail(function () {
            	CommSights.alert("<b>Failed!</b> Saving failed.", "danger");
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
				ComponentsFormTools2.init();
				handleReportContent();
			})
		}
	};
}();