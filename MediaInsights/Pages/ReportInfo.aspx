<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMaster.Master" AutoEventWireup="true" CodeBehind="ReportInfo.aspx.cs" Inherits="MediaInsights.Pages.ReportInfo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link rel="stylesheet" type="text/css" href="/global/plugins/select2/select2.css" />
	<link rel="stylesheet" type="text/css" href="/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="/global/plugins/bootstrap-select/bootstrap-select.min.css" />
	<link rel="stylesheet" type="text/css" href="/styles/pages/css/todo.css" />
	<!-- END PAGE LEVEL STYLES -->
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<input id="hiddenLayouts" hidden="hidden" />
	<!-- BEGIN TODO SIDEBAR -->
	<div class="todo-sidebar">
		<div class="portlet light">
			<div class="portlet-title">
				<div class="caption" data-toggle="collapse" data-target=".todo-project-list-content">
					<span class="caption-subject font-green-sharp bold uppercase">PROJECT BRIEFS</span>
					<span class="caption-helper visible-sm-inline-block visible-xs-inline-block">click to view project list</span>
				</div>
			</div>
			<div class="portlet-body todo-project-list-content">
				<div class="todo-project-list">
					<ul id="project_list" class="nav nav-pills nav-stacked"></ul>
				</div>
			</div>
		</div>
	</div>
	<!-- END TODO SIDEBAR -->
	<!-- BEGIN TODO CONTENT -->
	<div class="todo-content">
		<!-- BEGIN TABLE PORTLET-->
		<div class="portlet light">
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-bar-chart-o font-red-sunglo"></i>
					<span class="caption-subject font-red-sunglo bold uppercase">Report Contents</span>
					<span class="caption-helper">table of contents in the report...</span>
				</div>
				<div class="actions">
					<button id="sample_editable_1_new" class="btn btn-circle green">
						<i class="fa fa-plus"></i>&nbsp;Add New
					</button>
					<button id="generate_report" runat="server" class="btn blue-hoki" onserverclick="generate_report_ServerClick">
						<i class="fa fa-gears"></i>&nbsp;Generate Report
					</button>
				</div>
			</div>
			<table id="sample_editable_1" class="table table-striped table-hover table-bordered">
				<thead>
					<tr>
						<th></th>
						<th>Title</th>
						<th>Sequence</th>
						<th>Layout</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
		<!--</div>-->
		<!-- END TABLE PORTLET-->
	</div>
	<!-- END TODO CONTENT -->
	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script type="text/javascript" src="/global/plugins/jquery-validation/js/jquery.validate.min.js"></script>
	<script type="text/javascript" src="/global/plugins/jquery-validation/js/additional-methods.min.js"></script>
	<script type="text/javascript" src="/global/plugins/select2/select2.min.js"></script>
	<script type="text/javascript" src="/global/plugins/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script type="text/javascript" src="/styles/pages/scripts/custom.js"></script>
	<script type="text/javascript" src="/styles/pages/scripts/table-editable.js"></script>
	<script type="text/javascript" src="/styles/pages/scripts/form-validation.js"></script>
	<!-- END PAGE LEVEL SCRIPTS -->
	<!-- BEGIN PROJECT PAGE SCRIPTS -->
	<script type="text/javascript" src="/scripts/reportinfo.js"></script>
	<!-- END PROJECT PAGE SCRIPTS -->
	<script>
		ReportInfo.init();
	</script>
</asp:Content>
