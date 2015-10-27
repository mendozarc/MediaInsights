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
			if (!IsPostBack)
			{
				projectBrief.DataSource = (new Report()).sp_ProjectBriefs_select();
				projectBrief.DataTextField = "Name";
				projectBrief.DataValueField = "ID";
				projectBrief.DataBind();

				projectBrief_SelectedIndexChanged(null, null);
            }
		}

        protected void ProjectContents_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
			
        }

		protected void projectBrief_SelectedIndexChanged(object sender, EventArgs e)
		{
			Report r = new Report();
			ProjectContents.DataSource = r.sp_ContentSummary_ProjectBriefID(Convert.ToInt32(projectBrief.SelectedValue)); 
			ProjectContents.DataBind();
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
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int Sequence { get; set; } 
        public string Layout { get; set; }
		public int LayoutId { get; set; }

		public ContentSummary() { }
        public ContentSummary(string title, int sequence, string layout, int layoutId)
        {
            Id = Guid.NewGuid();
            Title = title;
            Sequence = sequence;
            Layout = layout;
			LayoutId = layoutId;
        }
    }
}