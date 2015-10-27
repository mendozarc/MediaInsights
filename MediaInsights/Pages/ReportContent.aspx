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
<%--                    <div class="actions">
                        <a href="javascript:;" class="btn btn-circle btn-default btn-sm">
                            <i class="fa fa-pencil"></i>Edit </a>
                        <a href="javascript:;" class="btn btn-circle btn-default btn-sm">
                            <i class="fa fa-plus"></i>Add </a>
                        <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                            <i class="icon-wrench"></i>
                        </a>
                    </div>--%>
                </div>
                <div class="portlet-body form">
                    <div id="form-username" class="form-horizontal form-bordered">
                    <%--<form action="#" id="form-username" class="form-horizontal form-bordered">--%>
                        <div class="form-group">
                            <label class="col-md-3 control-label">Demo 1</label>
                            <div class="col-md-9">
                                <textarea class="form-control autosizeme" rows="4" placeholder="Autosizeme..."></textarea>
                                <p class="help-block">
                                    type more to see how this autosize feature works
                                </p>
                            </div>
                        </div>
                        <div class="form-group last">
                            <label class="col-md-3 control-label">Demo 2</label>
                            <div class="col-md-9">
                                <textarea class="form-control" rows="6" placeholder="Autosizeme..."></textarea>
                                <p class="help-block">
                                    apply <code>autosizeme</code> class to any textarea to activate this autosize feature
                                </p>
                            </div>
                        </div>
                        <div class="form-actions">
                            <div class="row">
                                <div class="col-md-offset-3 col-md-9">
                                    <button type="submit" class="btn red"><i class="fa fa-check"></i>Submit</button>
                                    <button type="button" class="btn default">Cancel</button>
                                </div>
                            </div>
                        </div>
                    <%--</form>--%></div>
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
        jQuery(document).ready(function() {       
           // initiate layout and plugins
           Metronic.init(); // init metronic core components
Layout.init(); // init current layout
           ComponentsFormTools2.init();
        });   
    </script>
<!-- END JAVASCRIPTS -->
</asp:Content>
