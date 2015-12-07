var ReportContent = function () {
	var charts = [];
	var contentType = "application/json; charset=utf-8";
	var contentId = $('#contentId').val();
	//var summary = $('label[title="Summary"] + div > textarea');
	var contentIdSelector = 'input[type="hidden"][data-sequence]';
	var callout = $('label[title="Callout"] + textarea');
	var main_portlet = $('#main_portlet');
	var div_analysis_portlets = $('#analysis_portlets');
	var btnAddPortlet = $('a[data-id="add_portlet"]');

	//portlet selectors
	var summarySelector = '#summary + div.note-editor > div.note-editable';
	var dropDownChartSelector = 'select.select2me[data-placeholder="select chart"]';

	var handleReportContent = function () {
		// load charts
		$.ajax({
			type: 'POST',
			url: 'ReportContent.aspx/getCharts',
			contentType: contentType,
			dataType: "json",
			success: function (data) {
				charts = JSON.parse(data.d);

				var ddChart = $(dropDownChartSelector);
				ddChart.empty();
				var chartType = "";
				$.each(charts, function () {
					if (chartType !== this.Type) {
						var optGroup = $("<optgroup></optgroup>").attr("label", this.ChartType);
						addOptions(optGroup, this);
						ddChart.append(optGroup);
						chartType = this.Type;
					} else {
						var optGroup = $('optgroup[label="' + this.ChartType + '"]', ddChart);
						addOptions(optGroup, this);
					}

					function addOptions(optGroup, chart) {
						optGroup.append($("<option></option>")
							.attr("data-type", chart.Type)
							.attr("value", chart.ID)
							.attr("title", chart.Description)
							.text(chart.Name));
					}
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
				//summary.val(content[0].Summary);
				$(summarySelector).html(content[0].Summary);
				if (content[0].LayoutID == 3) {
					showMainCallout(true);
					callout.val(content[0].Callout);
				} else if (content[0].LayoutID == 2) {
					btnAddPortlet.show();
					div_analysis_portlets.show();
					autosize.update($('textarea.autosizeme'));
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

		$('div.actions > a.btn:first', div_analysis_portlets.children()).click(function () {
			saveContentAnalysis($(this).closest('.portlet'));
		});

		$('div.actions > a.btn:nth-child(2)', div_analysis_portlets).click(function () {
			var portlet = $(this).closest('.portlet');
			var id = $(contentIdSelector, portlet);
			var idValue = id.val();
			var clear = true;
			if (idValue !== 'undefined' && idValue !== '') {
				bootbox.confirm("Are you sure you want to delete this section?", function (result) {
					if (result) {
						$.ajax({
							type: 'POST',
							url: 'ReportContent.aspx/deleteContentAnalysis',
							contentType: contentType,
							dataType: "json",
							data: JSON.stringify({ id: idValue }),
							error: function (ts) { alert(ts.responseText) },
						})
						.fail(function () {
							CommSights.alert("<b>Failed!</b> Failed to delete section.", "danger");
							clear = false;
						})
						.always(function () { resetInputs(); });
					} else { clear = false; }
				});
			} else { resetInputs(); }

			function resetInputs() {
				if (!clear) return;
				id.val('');
				// TODO: clear the chart
				$('input[type="text"]', portlet).val('');
				$('div.note-editable', portlet).html('');
				$('textarea[placeholder="callout..."]', portlet).val('');
				$(portlet).hide();
				btnAddPortlet.show();
			}
		});

		btnAddPortlet.click(function () {
			$('a.collapse').trigger('click');
			var hiddenFields = $(contentIdSelector);
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

		$(dropDownChartSelector).on("change", function (e) {
			e.preventDefault();

			var parentPortletBody = $(this).closest('.portlet-body');
			var data = [
			  ['Year', 'Sales', 'Expenses', 'Profit'],
			  ['2014', 1000, 400, 200],
			  ['2015', 1170, 460, 250],
			  ['2016', 660, 1120, 300],
			  ['2017', 1030, 540, 350]];

			var p = parentPortletBody.closest('.portlet');
			var args = {
				chart: $(this).val(),
				chartType: $(this).find(":selected").attr("data-type"),
				title: $('input[type="text"]', parentPortletBody).val(),
				elementStoreImage: $('input[type="hidden"][data-image]', p.closest('.portlet-body').parent('.portlet'))
			};
			CommSights.loadChart(data, args, $(".chart-div", parentPortletBody)[0]);
		});

		function showMainCallout(show) {
			var form_group_callout = $('#form_group_callout');
			if (show) {
				form_group_callout.show();
				autosize.update(callout);
				var parent = $("#summary").parent();
				parent.removeClass("col-md-12").addClass("col-md-10");
			} else {
				form_group_callout.hide();
				callout.val('');
				var parent = $("#summary").parent();
				parent.removeClass("col-md-10").addClass("col-md-12");
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
						portletAnalysis.show();
						autosize.update($('textarea'));
						$('div.caption > span', portletAnalysis).text(this.Name);
						$('input[type="text"]', portletAnalysis).val(this.ChartTitle);
						$('select[data-placeholder="select chart"]', portletAnalysis).val(this.Chart).trigger('change');
						$('div.note-editable', portletAnalysis).html(this.Analysis);
						$('textarea[placeholder="callout..."]', portletAnalysis).val(this.Callout);
					});
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
			summary: $(summarySelector).html(),
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

		var portletSummary = $('div.note-editable', portlet);
		var portletCallout = $('label + textarea[placeholder="callout..."]', portlet);
		var portletChart = $('select[data-placeholder="select chart"]', portlet);
		var portletChartTitle = $('input[type="text"]', portlet).val();
		var field_id = $(contentIdSelector, portlet);
		var field_id_value = field_id.val();
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
			chartTitle: portletChartTitle,
			analysis: portletSummary.html(),
			callout: portletCallout.val(),
			imageData: field_id.attr('data-image').replace('data:image/png;base64,', ''),
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
				$('.summernote').summernote({
					height: 100,
					toolbar: [
					   ['style', ['bold', 'italic', 'underline', 'clear']],
					   ['font', ['strikethrough', 'superscript', 'subscript']],
					   ['fontsize', ['fontsize']],
					   ['color', ['color']],
					   ['para', ['ul', 'ol', 'paragraph']],
					   ['height', ['height']],
					   ['misc', ['fullscreen', 'codeview', 'undo', 'redo']]
					]
				});
				Metronic.init(); // init metronic core components
				Layout.init(); // init current layout
				ComponentsFormTools2.init();
				handleReportContent();
			})
		}
	};
}();