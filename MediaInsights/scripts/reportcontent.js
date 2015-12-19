var ReportContent = function () {
	var charts = [];
	var contentType = "application/json; charset=utf-8";
	var contentId = $('#contentId').val();
	var briefId = $('#briefId').val();

	// brief variables
	var languages;
	var mediatypes;
	var mediatitles;
	var companies;
	var brands;
	var subbrands;

	//var summary = $('label[title="Summary"] + div > textarea');
	var contentIdSelector = 'input[type="hidden"][data-sequence]';
	var callout = $('label[title="Callout"] + textarea');
	var main_portlet = $('#main_portlet');
	var div_analysis_portlets = $('#analysis_portlets');
	var btnAddPortlet = $('a[data-id="add_portlet"]');

	//portlet selectors
	var summarySelector = '#summary + div.note-editor > div.note-editable';
	var dropDownChartDataSelector = 'select.select2me[data-placeholder="select data"]';
	var dropDownChartSelector = 'select.select2me[data-placeholder="select chart"]';
	var titleChartSelector = 'input[type="text"][data-placeholder="chart title"]';
	var loadChartSelector = 'a[hidden="hidden"][data-id="load_chart"]';
	var otherFilterSelector = 'select.multi-select[multiple="multiple"]';
	var startDateSelector = 'input[type="text"][name="from"]';
	var endDateSelector = 'input[type="text"][name="to"]';

	var populateData = function () {
		// load chart data
		$.ajax({
			type: 'POST',
			url: 'ReportContent.aspx/getAllChartData',
			contentType: contentType,
			dataType: "json",
			success: function (data) {
				var dData = $(dropDownChartDataSelector);
				dData.empty();
				$.each(JSON.parse(data.d), function () {
					dData.append($("<option></option>")
						.attr("data-procedure", this.StoredProcedure)
						.attr("value", this.ID)
						.attr("title", this.Name)
						.text(this.Name));
				});
				dData.select2();
			}
		})
			.fail(function () {
				CommSights.alert("<b>Failed!</b> Failed to load chart data.", "danger");
			});

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
	};

	var loadFilters = function () {
		// load start end date
		$.ajax({
			type: 'POST',
			url: 'ReportContent.aspx/getBriefStartEndDate',
			contentType: contentType,
			dataType: "json",
			data: JSON.stringify({ briefId: briefId }),
			error: function (ts) { alert(ts.responseText) },
			success: function (data) {
				var content = JSON.parse(data.d);
				CSDatePickers.setStartEndDatePickers(content[0].projectstart, content[0].projectend);
			}
		}).fail(function () {CommSights.alert("<b>Failed!</b> Failed to load brief settings.", "danger"); });

		// load languages
		$.ajax({
			type: 'POST',
			url: 'ReportContent.aspx/getBriefLanguages',
			contentType: contentType,
			dataType: "json",
			data: JSON.stringify({ briefId: briefId }),
			error: function (ts) { alert(ts.responseText) },
			success: function (data) {
				var optGroup = $("<optgroup></optgroup>").attr("label", 'Languages');
				$.each(JSON.parse(data.d), function () {
					optGroup.append($("<option></option>")
						.attr("value", 'l' + this.languageid)
						.attr("title", this.languagename)
						.text(this.languagename));
				});

				$(otherFilterSelector).append(optGroup);
				$(otherFilterSelector).multiSelect('refresh');
			}
		}).fail(function () { CommSights.alert("<b>Failed!</b> Failed to load brief languages.", "danger"); });

		// load mediatype
		$.ajax({
			type: 'POST',
			url: 'ReportContent.aspx/getBriefMediaTypes',
			contentType: contentType,
			dataType: "json",
			data: JSON.stringify({ briefId: briefId }),
			success: function (data) {
				var optGroup = $("<optgroup></optgroup>").attr("label", 'Media Types');
				$.each(JSON.parse(data.d), function () {
					optGroup.append($("<option></option>")
						.attr("value", 'm' + this.mediatypeid)
						.attr("title", this.mediatypename)
						.text(this.mediatypename));
				});

				$(otherFilterSelector).append(optGroup);
			}
		}).fail(function () {CommSights.alert("<b>Failed!</b> Failed to load brief media types.", "danger"); });
		
		// load mediatitles
		$.ajax({
			type: 'POST',
			url: 'ReportContent.aspx/getBriefMediaTitles',
			contentType: contentType,
			dataType: "json",
			data: JSON.stringify({ briefId: briefId }),
			error: function (ts) { alert(ts.responseText) },
			success: function (data) {
				var optGroup = $("<optgroup></optgroup>").attr("label", 'Media Titles');
				$.each(JSON.parse(data.d), function () {
					optGroup.append($("<option></option>")
						.attr("value", "n" + this.mediatitleid)
						.attr("title", this.mediatitlename)
						.text(this.mediatitlename));
				});

				$(otherFilterSelector).append(optGroup);
				$(otherFilterSelector).multiSelect('refresh');
			}
		}).fail(function () { CommSights.alert("<b>Failed!</b> Failed to load brief mediatitles.", "danger"); });

		// load company/brand
		$.ajax({
			type: 'POST',
			url: 'ReportContent.aspx/getCompanyBrands',
			contentType: contentType,
			dataType: "json",
			data: JSON.stringify({ briefId: briefId }),
			error: function (ts) { alert(ts.responseText) },
			success: function (data) {
				var ogCompanies = $("<optgroup></optgroup>").attr("label", 'Companies');
				var lastCompanyId = 0;
				var ogBrands = $("<optgroup></optgroup>").attr("label", 'Brands');
				var lastBrandId = 0;
				var ogSubBrands = $("<optgroup></optgroup>").attr("label", 'Sub Brands');
				$.each(JSON.parse(data.d), function () {
					if (this.companyid !== '' && lastCompanyId !== this.companyid) {
						ogCompanies.append($("<option></option>")
							.attr("value", 'c' + this.companyid)
							.attr("title", this.CompanyName)
							.text(this.CompanyName));
					}

					if (this.brandid !== '' && lastBrandId !== this.brandid) {
						ogBrands.append($("<option></option>")
							.attr("value", 'b' + this.brandid)
							.attr("title", this.BrandName)
							.text(this.BrandName));
					}

					if (this.subbrandid !== '') {
						ogSubBrands.append($("<option></option>")
							.attr("value", 's' + this.subbrandid)
							.attr("title", this.Subbrand)
							.text(this.Subbrand));
					}

					lastCompanyId = this.companyid;
					lastBrandId = this.brandid;
				});

				$(otherFilterSelector).append(ogCompanies);
				$(otherFilterSelector).append(ogBrands);
				$(otherFilterSelector).append(ogSubBrands);
				$(otherFilterSelector).multiSelect('refresh');
			}
		}).fail(function () { CommSights.alert("<b>Failed!</b> Failed to load brief companies/brands/subbrands.", "danger"); });
	};

	var handleReportContent = function () {
		var initializeControlEvents = function () {
			$('a.btn:nth-child(2)', main_portlet.children('.portlet-title').children('.actions')).click(function () {
				saveContent();
				// trigger other save
				$.each($('.portlet', div_analysis_portlets), function () {
					if (!$(this).is(':hidden')) {
						$('div.actions > a.btn[data-id="save_portlet"]:first', this).trigger('click');
					} else { return false; }
				});
			});

			$('div.actions > a.btn[data-id="save_portlet"]:first', div_analysis_portlets.children()).click(function () {
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

			$(dropDownChartDataSelector).on('change', function () {
				loadChartData(this);
			});

			$(loadChartSelector).on("click", function (e) {
				e.preventDefault();

				var portlets = $(this).parents('.portlet');
				var portletGeneratedChart = portlets[0];
				var portletChart = portlets[1];

				var o = $(dropDownChartDataSelector, portletChart);
				var filter = {
					procedure: $('option:selected', o).data('procedure'),
					brief: briefId,
					startDate: $(startDateSelector, portletChart).val(),
					endDate: $(endDateSelector, portletChart).val(),
					filters: $(otherFilterSelector, portletChart).val()
				};

				$.ajax({
					type: 'POST',
					url: 'ReportContent.aspx/getChartDataValues',
					contentType: contentType,
					data: JSON.stringify(filter),
					dataType: "json",
					async: false,
					error: function (ts) { alert(ts.responseText) },
					success: function (r) {
						var firstRow = $('.row:first', portletChart);
						var d = $(dropDownChartSelector, portletChart);
						var args = {
							chart: d.val(),
							chartType: d.find(":selected").attr("data-type"),
							title: $('input[type="text"][data-placeholder="chart title"]', firstRow).val(),
							elementStoreImage: $('input[type="hidden"][data-image]', portletChart)
						};

						CommSights.loadChart(r.d, args, $(".chart-div", portletGeneratedChart)[0]);
					}
				})
					.fail(function () {
						CommSights.alert("<b>Failed!</b> Failed to load chart data values.", "danger");
					});
			});
		}();

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
						$('div.caption > span:first', portletAnalysis).text(this.Name);
						$(titleChartSelector, portletAnalysis).val(this.ChartTitle);
						$(dropDownChartSelector, portletAnalysis).select2('val', this.Chart);
						$('div.note-editable', portletAnalysis).html(this.Analysis);
						$('textarea[placeholder="callout..."]', portletAnalysis).val(this.Callout);
					});
				}
			})
			.fail(function () {
				CommSights.alert("<b>Failed!</b> Failed to load content analysis.", "danger");
			});
		}

		function loadChartData(dd) {
			var d = $(dd);
			$.ajax({
				type: 'POST',
				url: 'ReportContent.aspx/getChartData',
				contentType: contentType,
				data: JSON.stringify({ chartDataId: d.find('option:selected').val() }),
				dataType: "json",
				error: function (ts) { alert(ts.responseText) },
				success: function (data) {
					var row = d.closest('.row');
					$.each(JSON.parse(data.d), function () {
						$(titleChartSelector, row).val(this.Title);
						$(dropDownChartSelector, row).select2('val', this.Chart);
					});
				}
			})
				.fail(function () {
					CommSights.alert("<b>Failed!</b> Failed to load chart data.", "danger");
				});
		}

		function getChartDataValues(filter) {
			$.ajax({
				type: 'POST',
				url: 'ReportContent.aspx/getChartDataValues',
				contentType: contentType,
				data: JSON.stringify(filter),
				dataType: "json",
				async: false,
				error: function (ts) { alert(ts.responseText) },
				success: function (data) {
					return JSON.parse(data.d);
				}
			})
				.fail(function () {
					CommSights.alert("<b>Failed!</b> Failed to load chart data values.", "danger");
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
		var portletChart = $(dropDownChartSelector, portlet);
		var portletChartTitle = $(titleChartSelector, portlet).val();
		var portletChartData = $(dropDownChartDataSelector, portlet).val();
		var field_id = $(contentIdSelector, portlet);
		var field_id_value = field_id.val();
		var id = field_id_value;
		if (field_id_value === '') {
			id = Custom.newGuid();
		}
		var name = $('div.caption span:first', portlet).text();

		var data = {
			id: id,
			name: name,
			contentId: contentId,
			sequence: field_id.attr('data-sequence'),
			chartData: portletChartData,
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
					   //['style', ['bold', 'italic', 'underline', 'clear']],
					   ['style', ['bold', 'italic']],
					   //['font', ['strikethrough', 'superscript', 'subscript']],
					   ['font', ['superscript', 'subscript']],
					   //['fontsize', ['fontsize']],
					   //['color', ['color']],
					   //['para', ['ul', 'ol', 'paragraph']],
					   //['height', ['height']],
					   ['misc', ['fullscreen', 'codeview', 'undo', 'redo']]
					]
				});
				Metronic.init(); // init metronic core components
				Layout.init(); // init current layout
				ComponentsFormTools2.init();
				CSDropDowns.init();
				populateData();
				loadFilters();
				handleReportContent();
			})
		}
	};
}();