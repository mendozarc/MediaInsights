using System;
using System.Web.Services;
using CommSights.Data;

namespace MediaInsights.Pages
{
    public partial class ReportInfo : System.Web.UI.Page
    {
        protected void Page_Init(object sender, EventArgs e)
        {
            SiteMaster m = Master as SiteMaster;
            m.Title = "Project Reports";
            m.SubTitle = "project briefs and reports";
        }

        protected void Page_Load(object sender, EventArgs e)
        {

		}

		#region WebMethods
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

		[WebMethod]
		public static string getProjects()
		{
			return helper_util.SerializeDataTableToJSON((new Report()).sp_ProjectBriefs_select());
		}

		[WebMethod]
		public static string getContents(int projectBrief)
		{
			Report r = new Report();
			return helper_util.SerializeDataTableToJSON(r.sp_ContentSummary_ProjectBriefID(projectBrief));
		}
		#endregion
	}
}