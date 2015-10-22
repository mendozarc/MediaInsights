using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Services;
using System.Web.UI.WebControls;

using System.Web.Script.Services;

using CommSights.Data;
using System.Web;

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
            List<ContentSummary> forDataBind = new List<ContentSummary>();
            ContentSummary t;
            var report = new Report();
            DataTable dt = report.sp_ContentSummary_ProjectBriefID(1);
            foreach(DataRow row in dt.Rows)
            {
                t = new ContentSummary();
                t.ID = new Guid(row["ID"].ToString());
                t.Title = row["Description"] as string;
                t.Sequence = Convert.ToInt32(row["Sequence"]);
                t.Layout = Convert.ToInt32(row["LayoutID"]);

                forDataBind.Add(t);
            }

            ProjectContents.DataSource = forDataBind;
            ProjectContents.DataBind();
        }

        protected void ProjectContents_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {

        }

        protected void ProjectContents_ItemCommand(object source, RepeaterCommandEventArgs e)
        {

        }

        [WebMethod]
        public static int delete(string id)
        {
            return (new Report()).sp_ContentSummary_delete(id);
        }

        [WebMethod]
        public static int save(string contentId, int projectBrief, string title, int sequence, int layout, bool isNew)
        {
            var report = new Report();
            if (isNew)
                return report.sp_ContentSummary_insert(contentId, projectBrief, title, sequence, layout);
            else
                return report.sp_ContentSummary_update(contentId, title, sequence, layout);
        }

		[WebMethod]	
		public static string getLayout()
		{
			var report = new Report();
			return helper_util.SerializeDataTableToJSON(report.sp_Layouts_select());
		}
    }

    public class ContentSummary
    {
        public Guid ID { get; set; }
        public string Title { get; set; }
        public int Sequence { get; set; } 
        public int Layout { get; set; }

        public ContentSummary() { }
        public ContentSummary(string t, int s, int l)
        {
            ID = Guid.NewGuid();
            Title = t;
            Sequence = s;
            Layout = l;
        }
    }
}