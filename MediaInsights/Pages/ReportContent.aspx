<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMaster.Master" AutoEventWireup="true" CodeBehind="ReportContent.aspx.cs" Inherits="MediaInsights.Pages.ReportContent" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<div class="row">
		<div class="col-md-12">
			<!-- BEGIN PORTLET-->
			<div class="portlet light form-fit">
				<div class="portlet-title">
					<div class="caption font-blue">
						<i class="icon-speech font-blue"></i>
						<span class="caption-subject bold uppercase"><%= ContentDescription %></span>
						<span class="caption-helper"></span>
					</div>
					<div class="actions">
						<%--                        <a href="javascript:;" class="btn btn-circle btn-default btn-sm">
                            <i class="fa fa-pencil"></i>Edit </a>--%>
						<a id="lnkAdd" runat="server" visible="false"
							href="javascript:;" class="btn btn-circle btn-default btn-sm">
							<i class="fa fa-plus"></i>Add </a>
						<%--                        <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                            <i class="icon-wrench"></i>x
                        </a>--%>
					</div>
				</div>
				<div class="portlet-body form">
					<div id="form-username" class="form-horizontal form-bordered">
						<%--<form action="#" id="form-username" class="form-horizontal form-bordered">--%>
						<div class="form-group">
							<label class="col-md-3 control-label">Summary</label>
							<div class="col-md-9">
								<textarea class="form-control autosizeme" rows="4" placeholder="summary..."></textarea>
								<%--                                <p class="help-block">
                                    type more to see how this autosize feature works
                                </p>--%>
							</div>
						</div>
						<div class="form-group last" id="callout" runat="server" visible="false">
							<label class="col-md-3 control-label">Callout</label>
							<div class="col-md-9">
								<textarea class="form-control autosizeme" rows="2" placeholder="callout..."></textarea>
								<%--                                <p class="help-block">
                                    apply <code>autosizeme</code> class to any textarea to activate this autosize feature
                                </p>--%>
							</div>
						</div>
						<div class="form-actions">
							<div class="row">
								<div class="col-md-offset-3 col-md-9">
									<%--<button type="submit" class="btn red" id="Save" runat="server"><i class="fa fa-check"></i> Submit</button>--%>
									<asp:Button class="btn red" ID="btnSave" runat="server" Text="Submit" />
									<asp:Button class="btn default" ID="btnCancel" runat="server" Text="Cancel" />
								</div>
							</div>
						</div>
						<div class="portlet portlet-sortable light bg-inverse">
							<div class="portlet-title">
								<div class="caption">
									<i class="icon-puzzle font-red-flamingo"></i>
									<span class="caption-subject bold font-red-flamingo uppercase">Tools </span>
									<span class="caption-helper">actions...</span>
								</div>
								<div class="tools">
									<a href="" class="collapse"></a>
									<%--<a href="#portlet-config" data-toggle="modal" class="config"></a>
									<a href="" class="reload"></a>--%>
									<a href="" class="fullscreen"></a>
									<a href="" class="remove"></a>
								</div>
							</div>
							<div class="portlet-body">
								<h4>Heading text goes here...</h4>
								<p>
									Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur.
								</p>
							</div>
						</div>

						<%--</form>--%>
					</div>
				</div>
			</div>
			<!-- END PORTLET-->
		</div>
	</div>

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
