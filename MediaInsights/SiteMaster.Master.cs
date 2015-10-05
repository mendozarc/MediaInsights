using System;

namespace MediaInsights
{
    public partial class SiteMaster : System.Web.UI.MasterPage
    {
        public string Title { get; set; }
        public string SubTitle { get; set; }

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            PageTitle1.Title = Title;
            PageTitle1.SubTitle = SubTitle;
        }
    }
}