<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMaster.Master" AutoEventWireup="true" CodeBehind="ReportInfo.aspx.cs" Inherits="MediaInsights.Pages.ReportInfo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link rel="stylesheet" type="text/css" href="/global/plugins/select2/select2.css" />
    <link rel="stylesheet" type="text/css" href="/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="/global/plugins/bootstrap-select/bootstrap-select.min.css"/>
	<link rel="stylesheet" type="text/css" href="/global/plugins/jquery-multi-select/css/multi-select.css" />
	<!-- END PAGE LEVEL STYLES -->
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<input id="hiddenLayouts" hidden="hidden" />
    <div class="row">
        <div class="col-md-12">
            <!-- BEGIN EXAMPLE TABLE PORTLET-->
            <div class="portlet light">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="fa fa-bar-chart-o font-red-sunglo"></i>
						<span class="caption-subject font-red-sunglo bold uppercase">Report Contents</span>
						<span class="caption-helper">table of contents in the report...</span>
                    </div>
                </div>
                <div id="report_contents" class="portlet-body">
					<div class="form-horizontal form-row-sepe">
						<div class="form-body">
							<h4 class="form-section">Project brief</h4>
							<div class="form-group">
								<%--<label class="control-label col-md-3"></label>--%>
								<div class="col-md-9">
									<asp:DropDownList id="projectBrief" runat="server"
										class="form-control select2me" data-placeholder="Select..." 
										OnSelectedIndexChanged="projectBrief_SelectedIndexChanged" AutoPostBack="true">
<%--										<option value="AL">Alabama</option>
										<option value="WY">Wyoming</option>--%>
									</asp:DropDownList>
									<span class="help-block">...</span>
								</div>
							</div>
						</div>
					</div>
					<br />
                    <div class="table-toolbar">
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
                    <asp:Repeater ID="ProjectContents" runat="server" OnItemDataBound="ProjectContents_ItemDataBound">
                        <HeaderTemplate>
                            <table class="table table-striped table-hover table-bordered" id="sample_editable_1">
                                <thead>
                                    <tr>
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
									<a href='/Pages/ReportContent.aspx?id=<%# Eval("ID").ToString() %>'>
										<%# Eval("Description").ToString() %>
									</a>
								</td>
								<td><%# Eval("Sequence").ToString() %></td>
								<td><%# Eval("LayoutName").ToString() %></td>
								<td>
                                    <input hidden="hidden" value='<%# Eval("ID").ToString() %>' />
                                    <a class="edit btn btn-xs blue" href="javascript;">
                                        <i class="fa fa-edit"></i> edit
                                    </a>
                                    <a class="delete btn btn-xs red" href="javascript;">
                                        <i class="fa fa-trash-o"></i> delete
                                    </a>
<%--                                    <a class="btn btn-xs green" href="javascript;">
                                        <i class="fa fa-link"></i> open layout
                                    </a>--%>
                                </td>
                            </tr>
                        </ItemTemplate>
                        <FooterTemplate>
                            </tbody>
							</table>
                        </FooterTemplate>
                    </asp:Repeater>
                </div>
            </div>
            <!-- END EXAMPLE TABLE PORTLET-->
        </div>
    </div>

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