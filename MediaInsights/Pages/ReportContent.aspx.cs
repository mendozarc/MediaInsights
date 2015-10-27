using System;
using CommSights.Data;
using System.Data;

namespace MediaInsights.Pages
{
	public partial class ReportContent : System.Web.UI.Page
    {
		protected string ContentDescription;

        protected void Page_Load(object sender, EventArgs e)
        {
            SiteMaster m = Master as SiteMaster;
            m.Title = "Report Contents";
            m.SubTitle = "report sections and details";

			Report r = new Report();
			DataTable dt = r.sp_Content_select(Request["id"]);
			ContentDescription = Convert.ToString(dt.Rows[0][0]);
        }
    }
}