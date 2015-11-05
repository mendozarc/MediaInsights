<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMaster.Master" AutoEventWireup="true" CodeBehind="ReportContent.aspx.cs" Inherits="MediaInsights.Pages.ReportContent" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<!-- BEGIN PORTLET-->
	<div class="portlet light">
		<div class="portlet-title">
			<div class="caption font-blue">
				<i class="fa fa-cubes font-blue"></i>
				<span class="caption-subject bold uppercase"><%= ContentDescription %></span>
				<span class="caption-helper"></span>
			</div>
			<div class="actions">
				<a id="lnkAdd" runat="server" visible="false"
					href="javascript:;" class="btn green-haze btn-circle btn-sm">
					<i class="fa fa-plus"></i>&nbsp;Add Section</a>
				<a class="btn btn-circle btn-sm purple" href="javascript:;">
					<i class="fa fa-save"></i>&nbsp;Save </a>
			</div>
		</div>
		<div class="portlet-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="col-md-2 control-label">Summary</label>
						<div class="col-md-10">
							<textarea class="form-control autosizeme" rows="3" placeholder="summary..."></textarea>
						</div>
					</div>
					<div class="form-group last" id="callout" runat="server" visible="false">
						<label class="col-md-2 control-label">Callout</label>
						<div class="col-md-10">
							<textarea class="form-control autosizeme" rows="2" placeholder="callout..." />
						</div>
					</div>
				</div>
			</div>
			<br />
			<!-- PORTLETS -->
			<div class="row">
				<div class="col-md-12">
					<!-- BEGIN PORTLET -->
					<div class="portlet box blue">
						<div class="portlet-title">
							<div class="caption">
								<i class="fa fa-cube"></i>Section 1 
							</div>
							<div class="tools">
								<a href="" class="collapse"></a>
								<a href="" class="fullscreen"></a>
								<a href="" class="remove"></a>
							</div>
						</div>
						<div class="portlet-body">
							<div class="row">
								<div class="col-md-12">
									<div class="portlet box blue">
										<div class="portlet-title">
											<div class="caption">
												<i class="fa fa-bar-chart-o"></i>Chart 
											</div>
											<div class="tools">
												<a href="" class="collapse"></a>
												<a href="" class="fullscreen"></a>
												<%--<a href="" class="remove"></a>--%>
											</div>
										</div>
										<div class="portlet-body">
											<h4>Heading text goes here...</h4>
											<p>
												Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur.
											</p>

										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-9">
									<div class="portlet box blue">
										<div class="portlet-title">
											<div class="caption">
												<i class="fa fa-puzzle-piece"></i>Analysis 
											</div>
											<div class="tools">
												<a href="" class="collapse"></a>
												<a href="" class="fullscreen"></a>
												<%--<a href="" class="remove"></a>--%>
											</div>
										</div>
										<div class="portlet-body">
											<div class="row">
												<div class="col-md-12">
													<div class="form-group">
														<textarea class="form-control autosizeme" rows="3" placeholder="summary..."></textarea>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-3">
									<div class="portlet box blue">
										<div class="portlet-title">
											<div class="caption">
												<i class="fa fa-comment"></i>Callout 
											</div>
											<div class="tools">
												<a href="" class="collapse"></a>
												<a href="" class="fullscreen"></a>
												<%--<a href="" class="remove"></a>--%>
											</div>
										</div>
										<div class="portlet-body">
											<div class="row">
												<div class="col-md-12">
													<textarea class="form-control autosizeme" rows="4" placeholder="callout..."></textarea>
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
			<!-- ENF OF PORTLETS -->
		</div>
	</div>
	<!-- END PORTLET-->

	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script src="/global/plugins/bootstrap-selectsplitter/bootstrap-selectsplitter.min.js" type="text/javascript"></script>
	<script src="/global/plugins/jquery-minicolors/jquery.minicolors.min.js" type="text/javascript"></script>
	<script src="/global/plugins/autosize/autosize.min.js" type="text/javascript"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="/styles/pages/scripts/components-form-tools2.js"></script>
	<!-- END PAGE LEVEL SCRIPTS -->
	<script>
		jQuery(document).ready(function () {
			// initiate layout and plugins
			Metronic.init(); // init metronic core components
			Layout.init(); // init current layout
			ComponentsFormTools2.init();
		});
	</script>
	<!-- END JAVASCRIPTS -->
</asp:Content>
