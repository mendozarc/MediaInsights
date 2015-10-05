using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MediaInsights.Pages
{
    public partial class ReportContent : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SiteMaster m = Master as SiteMaster;
            m.Title = "Report Contents";
            m.SubTitle = "report sections and details";
        }
    }
}