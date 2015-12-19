<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMaster.Master" AutoEventWireup="true" CodeBehind="ReportContent.aspx.cs" Inherits="MediaInsights.Pages.ReportContent" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link rel="stylesheet" type="text/css" href="/global/plugins/bootstrap-select/bootstrap-select.min.css" />
	<link rel="stylesheet" type="text/css" href="/global/plugins/select2/select2.css" />
	<link rel="stylesheet" type="text/css" href="/global/plugins/jquery-multi-select/css/multi-select.css" />
	<link rel="stylesheet" type="text/css" href="/global/plugins/bootstrap-summernote/summernote.css" />
	<link rel="stylesheet" type="text/css" href="/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" />
	<!-- END PAGE LEVEL STYLES -->
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<input type="hidden" id="contentId" value="<%= Request["id"] %>" />
	<input type="hidden" id="briefId" value="<%= Request["brief"] %>" />
	<!-- BEGIN PORTLET-->
	<div id="main_portlet" class="portlet light">
		<div class="portlet-title">
			<div class="caption font-blue">
				<i class="fa fa-cubes font-blue"></i>
				<span id="content_title" class="caption-subject bold uppercase"></span>
				<span class="caption-helper"></span>
			</div>
			<div class="actions">
				<a hidden="hidden" class="btn green-haze btn-circle btn-sm" data-id="add_portlet">
					<i class="fa fa-plus"></i>&nbsp;Add Section</a>
				<a class="btn btn-circle btn-sm purple" href="javascript:;">
					<i class="fa fa-save"></i>&nbsp;Save All</a>
				<a class="btn btn-circle btn-sm grey" href="javascript:window.history.back();">
					<i class="fa fa-mail-reply-all"></i>&nbsp;Back</a>
			</div>
		</div>
		<div class="portlet-body form">
			<div class="portlet light">
				<div class="portlet-title">
					<div class="caption">
						<i class="fa fa-cogs font-green-sharp"></i>
						<span class="caption-subject">Summary</span>
					</div>
					<div class="tools">
						<a href="javascript:;" class="collapse"></a>
						<a href="" class="fullscreen"></a>
					</div>
				</div>
				<div class="portlet-body form">
					<div class="row">
						<div class="col-md-12">
							<div class="form-group col-md-12">
								<div id="summary" class="summernote">
								</div>
							</div>
							<div class="form-group col-md-2" id="form_group_callout" hidden="hidden">
								<label class="control-label" title="Callout">Callout</label>
								<textarea class="form-control autosizeme" rows="5" placeholder="callout..."></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="analysis_portlets" hidden="hidden">
				<!-- PORTLET1 -->
				<div class="row">
					<div class="col-md-12">
						<div>
							<!-- BEGIN PORTLET -->
							<div class="portlet box red-haze">
								<input type="hidden" data-sequence="1" data-image="" />
								<div class="portlet-title">
									<div class="caption">
										<i class="fa fa-cube"></i><span>Section 1</span>
									</div>
									<div class="tools">
										<a href="" class="collapse"></a>
										<a href="" class="fullscreen"></a>
									</div>
									<div class="actions">
										<a class="btn btn-default btn-sm" href="javascript:;" data-id="save_portlet">
											<i class="fa fa-save"></i>&nbsp;Save</a>
										<a class="btn btn-default btn-sm" href="javascript:;">
											<i class="fa fa-times"></i>&nbsp;Remove</a>
									</div>
								</div>
								<div class="portlet-body">
									<div class="row">
										<div class="col-md-12">
											<div class="portlet box red-intense">
												<div class="portlet-title">
													<div class="caption">
														<i class="fa fa-bar-chart-o"></i>Chart 
													</div>
													<div class="tools">
														<a href="" class="collapse"></a>
														<a href="" class="fullscreen"></a>
													</div>
												</div>
												<div class="portlet-body form">
													<div class="form-horizontal form-body custom ">
														<div class="row">
															<div class="col-md-6">
																<h4 class="form-section">Chart Properties</h4>
																<div class="form-group">
																	<label class="control-label col-md-2">Data</label>
																	<div class="col-md-10">
																		<select class="form-control select2me input-sm" data-placeholder="select data">
																		</select>
																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label col-md-2">Title</label>
																	<div class="col-md-10">
																		<input type="text" class="form-control input-sm" data-placeholder="chart title" />
																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label col-md-2">Chart</label>
																	<div class="col-md-10">
																		<select class="form-control select2me input-sm" data-placeholder="select chart">
																		</select>
																	</div>
																</div>
															</div>
															<div class="col-md-6">
																<h4 class="form-section">Data Filter</h4>
																<div class="form-group">
																	<label class="control-label col-md-2">Date</label>
																	<div class="col-md-10">
																		<div class="input-group date-picker input-daterange" data-date-format="dd/mm/yyyy">
																			<input type="text" class="form-control" name="from" />
																			<span class="input-group-addon">to</span>
																			<input type="text" class="form-control" name="to" />
																		</div>
																	</div>
																</div>

																<div class="form-group last">
																	<label class="control-label col-md-2">Other</label>
																	<div class="col-md-10">
																		<select multiple="multiple" class="multi-select"></select>
																	</div>
																</div>

															</div>
														</div>
														<div class="row">
															<div class="col-md-12">

																<div class="portlet light">
																	<div class="portlet-title">
																		<div class="caption">
																			<span class="caption-subject">Generated Chart</span>
																		</div>
																		<div class="actions">
																			<a hidden="hidden" class="btn green-haze btn-circle btn-sm" data-id="load_chart">
																				<i class="fa fa-signal"></i>&nbsp;Load Chart</a>
																		</div>
																	</div>
																	<div class="portlet-body">
																		<div class="row">
																			<div class="col-md-12">
																				<div class="chart-div"></div>
																			</div>
																		</div>
																	</div>
																</div>

															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-12">
											<div class="portlet box red">
												<div class="portlet-title">
													<div class="caption">
														<i class="fa fa-puzzle-piece"></i>Analysis 
													</div>
													<div class="tools">
														<a href="" class="collapse"></a>
														<a href="" class="fullscreen"></a>
													</div>
												</div>
												<div class="portlet-body">
													<div class="row">
														<div class="col-md-10">
															<label class="control-label">Analysis</label>
															<div class="summernote"></div>
														</div>
														<div class="col-md-2">
															<label class="control-label">Callout</label>
															<textarea class="form-control autosizeme input-sm" rows="7" placeholder="callout..."></textarea>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- END PORTLET -->
						</div>
					</div>
				</div>
				<!-- END OF PORTLET1 -->
				<!-- PORTLET2 -->
				<div class="row">
					<div class="col-md-12">
						<div>
							<!-- BEGIN PORTLET -->
							<div class="portlet box red-haze" hidden="hidden" data-id="save_portlet">
								<input type="hidden" data-sequence="2" data-image="" />
								<div class="portlet-title">
									<div class="caption">
										<i class="fa fa-cube"></i><span>Section 2</span>
									</div>
									<div class="tools">
										<a href="" class="collapse"></a>
										<a href="" class="fullscreen"></a>
									</div>
									<div class="actions">
										<a class="btn btn-default btn-sm" href="javascript:;">
											<i class="fa fa-save"></i>&nbsp;Save</a>
										<a class="btn btn-default btn-sm" href="javascript:;">
											<i class="fa fa-times"></i>&nbsp;Remove</a>
									</div>
								</div>
								<div class="portlet-body">
									<div class="row">
										<div class="col-md-12">
											<div class="portlet box red-intense">
												<div class="portlet-title">
													<div class="caption">
														<i class="fa fa-bar-chart-o"></i>Chart 
													</div>
													<div class="tools">
														<a href="" class="collapse"></a>
														<a href="" class="fullscreen"></a>
													</div>
												</div>
												<div class="portlet-body form">
													<div class="form-horizontal form-body custom ">
														<div class="row">
															<div class="col-md-6">
																<h4 class="form-section">Chart Properties</h4>
																<div class="form-group">
																	<label class="control-label col-md-2">Data</label>
																	<div class="col-md-10">
																		<select class="form-control select2me input-sm" data-placeholder="select data">
																		</select>
																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label col-md-2">Title</label>
																	<div class="col-md-10">
																		<input type="text" class="form-control input-sm" data-placeholder="chart title" />
																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label col-md-2">Chart</label>
																	<div class="col-md-10">
																		<select class="form-control select2me input-sm" data-placeholder="select chart">
																		</select>
																	</div>
																</div>
															</div>
															<div class="col-md-6">
																<h4 class="form-section">Data Filter</h4>
																<div class="form-group">
																	<label class="control-label col-md-2">Date</label>
																	<div class="col-md-10">
																		<div class="input-group date-picker input-daterange" data-date-format="dd/mm/yyyy">
																			<input type="text" class="form-control" name="from" />
																			<span class="input-group-addon">to</span>
																			<input type="text" class="form-control" name="to" />
																		</div>
																	</div>
																</div>

																<div class="form-group last">
																	<label class="control-label col-md-2">Other</label>
																	<div class="col-md-10">
																		<select multiple="multiple" class="multi-select"></select>
																	</div>
																</div>

															</div>
														</div>
														<div class="row">
															<div class="col-md-12">

																<div class="portlet light">
																	<div class="portlet-title">
																		<div class="caption">
																			<span class="caption-subject">Generated Chart</span>
																		</div>
																		<div class="actions">
																			<a hidden="hidden" class="btn green-haze btn-circle btn-sm" data-id="load_chart">
																				<i class="fa fa-signal"></i>&nbsp;Load Chart</a>
																		</div>
																	</div>
																	<div class="portlet-body">
																		<div class="row">
																			<div class="col-md-12">
																				<div class="chart-div"></div>
																			</div>
																		</div>
																	</div>
																</div>

															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-12">
											<div class="portlet box red">
												<div class="portlet-title">
													<div class="caption">
														<i class="fa fa-puzzle-piece"></i>Analysis 
													</div>
													<div class="tools">
														<a href="" class="collapse"></a>
														<a href="" class="fullscreen"></a>
													</div>
												</div>
												<div class="portlet-body">
													<div class="row">
														<div class="col-md-10">
															<label class="control-label">Analysis</label>
															<div class="summernote"></div>
														</div>
														<div class="col-md-2">
															<label class="control-label">Callout</label>
															<textarea class="form-control autosizeme input-sm" rows="7" placeholder="callout..."></textarea>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- END PORTLET -->
						</div>
					</div>
				</div>
				<!-- END OF PORTLET2 -->
				<!-- PORTLET3 -->
				<div class="row">
					<div class="col-md-12">
						<div>
							<!-- BEGIN PORTLET -->
							<div class="portlet box red-haze" hidden="hidden">
								<input type="hidden" data-sequence="3" data-image="" />
								<div class="portlet-title">
									<div class="caption">
										<i class="fa fa-cube"></i><span>Section 3</span>
									</div>
									<div class="tools">
										<a href="" class="collapse"></a>
										<a href="" class="fullscreen"></a>
									</div>
									<div class="actions">
										<a class="btn btn-default btn-sm" href="javascript:;">
											<i class="fa fa-save"></i>&nbsp;Save</a>
										<a class="btn btn-default btn-sm" href="javascript:;">
											<i class="fa fa-times"></i>&nbsp;Remove</a>
									</div>
								</div>
								<div class="portlet-body">
									<div class="row">
										<div class="col-md-12">
											<div class="portlet box red-intense">
												<div class="portlet-title">
													<div class="caption">
														<i class="fa fa-bar-chart-o"></i>Chart 
													</div>
													<div class="tools">
														<a href="" class="collapse"></a>
														<a href="" class="fullscreen"></a>
													</div>
												</div>
												<div class="portlet-body form">
													<div class="form-horizontal form-body custom ">
														<div class="row">
															<div class="col-md-6">
																<h4 class="form-section">Chart Properties</h4>
																<div class="form-group">
																	<label class="control-label col-md-2">Data</label>
																	<div class="col-md-10">
																		<select class="form-control select2me input-sm" data-placeholder="select data">
																		</select>
																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label col-md-2">Title</label>
																	<div class="col-md-10">
																		<input type="text" class="form-control input-sm" data-placeholder="chart title" />
																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label col-md-2">Chart</label>
																	<div class="col-md-10">
																		<select class="form-control select2me input-sm" data-placeholder="select chart">
																		</select>
																	</div>
																</div>
															</div>
															<div class="col-md-6">
																<h4 class="form-section">Data Filter</h4>
																<div class="form-group">
																	<label class="control-label col-md-2">Date</label>
																	<div class="col-md-10">
																		<div class="input-group date-picker input-daterange" data-date-format="dd/mm/yyyy">
																			<input type="text" class="form-control" name="from" />
																			<span class="input-group-addon">to</span>
																			<input type="text" class="form-control" name="to" />
																		</div>
																	</div>
																</div>

																<div class="form-group last">
																	<label class="control-label col-md-2">Other</label>
																	<div class="col-md-10">
																		<select multiple="multiple" class="multi-select"></select>
																	</div>
																</div>

															</div>
														</div>
														<div class="row">
															<div class="col-md-12">

																<div class="portlet light">
																	<div class="portlet-title">
																		<div class="caption">
																			<span class="caption-subject">Generated Chart</span>
																		</div>
																		<div class="actions">
																			<a hidden="hidden" class="btn green-haze btn-circle btn-sm" data-id="load_chart">
																				<i class="fa fa-signal"></i>&nbsp;Load Chart</a>
																		</div>
																	</div>
																	<div class="portlet-body">
																		<div class="row">
																			<div class="col-md-12">
																				<div class="chart-div"></div>
																			</div>
																		</div>
																	</div>
																</div>

															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-12">
											<div class="portlet box red">
												<div class="portlet-title">
													<div class="caption">
														<i class="fa fa-puzzle-piece"></i>Analysis 
													</div>
													<div class="tools">
														<a href="" class="collapse"></a>
														<a href="" class="fullscreen"></a>
													</div>
												</div>
												<div class="portlet-body">
													<div class="row">
														<div class="col-md-10">
															<label class="control-label">Analysis</label>
															<div class="summernote"></div>
														</div>
														<div class="col-md-2">
															<label class="control-label">Callout</label>
															<textarea class="form-control autosizeme input-sm" rows="7" placeholder="callout..."></textarea>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- END PORTLET -->
						</div>
					</div>
				</div>
				<!-- END OF PORTLET3 -->
			</div>
		</div>
	</div>
	<!-- END PORTLET-->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script type="text/javascript" src="/global/plugins/bootstrap-selectsplitter/bootstrap-selectsplitter.min.js"></script>
	<script type="text/javascript" src="/global/plugins/jquery-minicolors/jquery.minicolors.min.js"></script>
	<script type="text/javascript" src="/global/plugins/autosize/autosize.min.js"></script>
	<script type="text/javascript" src="/global/plugins/bootstrap-select/bootstrap-select.min.js"></script>
	<script type="text/javascript" src="/global/plugins/select2/select2.min.js"></script>
	<script type="text/javascript" src="/global/plugins/jquery-multi-select/js/jquery.multi-select.js"></script>
	<script type="text/javascript" src="/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
	<script type="text/javascript" src="/global/plugins/bootstrap-daterangepicker/moment.min.js"></script>
	<script type="text/javascript" src="/global/plugins/jquery.quicksearch.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="../styles/pages/scripts/components-form-tools2.js"></script>
	<script src="/global/plugins/bootstrap-summernote/summernote.min.js" type="text/javascript"></script>
	<script src="../styles/scripts/commsights-datepickers.js"></script>
	<!-- END PAGE LEVEL SCRIPTS -->
	<!-- BEGIN PROJECT PAGE SCRIPTS -->
	<script type="text/javascript" src="../styles/pages/scripts/custom.js"></script>
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
	<script type="text/javascript" src="../styles/scripts/commsights-dropdowns.js"></script>
	<script type="text/javascript" src="../styles/scripts/commsights-chart.js"></script>
	<script type="text/javascript" src="../scripts/reportcontent.js"></script>
	<!-- END PROJECT PAGE SCRIPTS -->
	<script>
		ReportContent.init();
	</script>
	<!-- END JAVASCRIPTS -->
</asp:Content>
