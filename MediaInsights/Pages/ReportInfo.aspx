<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMaster.Master" AutoEventWireup="true" CodeBehind="ReportInfo.aspx.cs" Inherits="MediaInsights.Pages.ReportInfo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link rel="stylesheet" type="text/css" href="/global/plugins/select2/select2.css" />
	<link rel="stylesheet" type="text/css" href="/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="/global/plugins/bootstrap-select/bootstrap-select.min.css" />
	<link rel="stylesheet" type="text/css" href="/global/plugins/jquery-multi-select/css/multi-select.css" />
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
					<span class="caption-subject font-green-sharp bold uppercase">PROJECTS </span>
					<span class="caption-helper visible-sm-inline-block visible-xs-inline-block">click to view project list</span>
				</div>
				<div class="actions">
					<div class="btn-group">
						<a class="btn green-haze btn-circle btn-sm todo-projects-config" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
							<i class="icon-settings"></i>&nbsp; <i class="fa fa-angle-down"></i>
						</a>
						<ul class="dropdown-menu pull-right">
							<li>
								<a href="javascript:;">
									<i class="i"></i>New Project </a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="javascript:;">Pending <span class="badge badge-danger">4 </span>
								</a>
							</li>
							<li>
								<a href="javascript:;">Completed <span class="badge badge-success">12 </span>
								</a>
							</li>
							<li>
								<a href="javascript:;">Overdue <span class="badge badge-warning">9 </span>
								</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="javascript:;">
									<i class="i"></i>Archived Projects </a>
							</li>
						</ul>
					</div>
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
			</div>
			<div id="report_contents" class="portlet-body">
				<div class="table-toolbar">
					<!--
				<div class="row">
					<div class="col-md-6">
						<div class="btn-group">
							<button id="sample_editable_1_new" class="btn green">
								Add New <i class="fa fa-plus"></i>
							</button>
						</div>
					</div>
					<!--<div class="col-md-6">
                                <div class="btn-group pull-right">
                                    <button class="btn dropdown-toggle" data-toggle="dropdown">
                                        Tools <i class="fa fa-angle-down"></i>
                                    </button>
                                    <ul class="dropdown-menu pull-right">
                                        <li>
                                            <a href="javascript:;">Print </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">Save as PDF </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">Export to Excel </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>-->
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
			<%--<asp:Repeater ID="ProjectContents" runat="server">
				<HeaderTemplate>
					<table class="table table-striped table-hover table-bordered" id="sample_editable_1">
						<thead>
							<tr>
								<th></th>
								<th>Title
								</th>
								<th>Sequence
								</th>
								<th>Layout
								</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
				</HeaderTemplate>
				<ItemTemplate>
					<tr>
						<td>
							<a href='/Pages/ReportContent.aspx?id=<%# Eval("ID").ToString() %>'>a
							</a>
						</td>
						<td><%# Eval("Title").ToString() %></td>
						<td><%# Eval("Sequence").ToString() %></td>
						<td><%# Eval("LayoutName").ToString() %></td>
						<td>
							<input hidden="hidden" value='<%# Eval("ID").ToString() %>' />
							<a class="edit btn btn-xs blue" href="javascript;">
								<i class="fa fa-edit"></i>edit
							</a>
							<a class="delete btn btn-xs red" href="javascript;">
								<i class="fa fa-trash-o"></i>delete
							</a>
						</td>
					</tr>
				</ItemTemplate>
				<FooterTemplate>
					</tbody>
				</table>
				<table style="width: 100%">
					<thead>
						<tr>
							<th>
								<div class="btn-group">
									<button id="sample_editable_1_new" class="btn green">
										Add New <i class="fa fa-plus"></i>
									</button>
								</div>
							</th>
							<th>Search</th>
							<th>Search</th>
						</tr>
					</thead>
				</table>
				</FooterTemplate>
			</asp:Repeater>--%>
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
