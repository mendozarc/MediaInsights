using System;
using System.Collections.Generic;
using System.Web.UI.WebControls;

namespace MediaInsights.Pages
{
    public partial class ReportInfo : System.Web.UI.Page
    {
        protected void Page_Init(object sender, EventArgs e)
        {
            SiteMaster m = Master as SiteMaster;
            m.Title = "Projects";
            m.SubTitle = "project briefs and reports";
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            List<Test> forDataBind = new List<Test>()
            { new Test("Title1", 1, "Layout1"), new Test("Title2", 4, "Layout3")};

            ProjectContents.DataSource = forDataBind;
            ProjectContents.DataBind();
        }

        protected void ProjectContents_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {

        }

        protected void ProjectContents_ItemCommand(object source, RepeaterCommandEventArgs e)
        {

        }
    }

    public class Test
    {
        public string Title { get; set; }
        public int Sequence { get; set; } 
        public string Layout { get; set; }

        public Test(string t, int s, string l)
        {
            Title = t;
            Sequence = s;
            Layout = l;
        }
    }
}