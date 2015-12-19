using System;
using System.Web.Services;
using CommSights.Data;
using MediaInsights.Reports;
using MRW = Microsoft.Reporting.WebForms;
using System.IO;
using System.Data;

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
		public static string getBriefs()
		{
			return helper_util.SerializeDataTableToJSON((new Report()).sp_ac_briefget());
		}

		[WebMethod]
		public static string getContents(int projectBrief)
		{
			Report r = new Report();
			return helper_util.SerializeDataTableToJSON(r.sp_ContentSummary_ProjectBriefID(projectBrief));
		}
		#endregion

		protected void generate_report_ServerClick(object sender, EventArgs e)
		{
			int briefId = 1;

			ReportGenerator rg = new ReportGenerator(Server.MapPath("~/download/") + Session.SessionID + ".rdlc");
			rg.ChartImagePath = Server.MapPath("~/chart-images/");
            string reportPath = rg.Generate(briefId);

			string fileName = "File_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".docx";
			string fullFilePath = Server.MapPath("~/download/") + fileName;
			string extension = string.Empty;
			string encoding = string.Empty;
			string mimeType = string.Empty;
            string[] streams;
			MRW.Warning[] warnings;

			MRW.LocalReport report = new MRW.LocalReport();
			report.ReportPath = reportPath;
			report.SetParameters(GetReportParameters(briefId));
			Byte[] mybytes = report.Render("WORDOPENXML", null,
							out mimeType, out encoding,
							out extension, out streams, out warnings); 
			using (FileStream fs = File.Create(fullFilePath))
			{
				fs.Write(mybytes, 0, mybytes.Length);
			}

			Response.ClearHeaders();
			Response.ClearContent();
			Response.Buffer = true;
			Response.Clear();
			Response.ContentType = mimeType;
			Response.AddHeader("Content-Disposition", "attachment; filename=" + fileName);
			Response.WriteFile(fullFilePath);
			Response.Flush();
			Response.Close();
			Response.End();
		}

		private MRW.ReportParameter[] GetReportParameters(int briefId)
		{
			Report r = new Report();
			DataTable dt = r.sp_ac_briefget(briefId);
			DataRow row = dt.Rows[0];

			DateTime dtStart = Convert.ToDateTime(row["projectstart"]);
			DateTime dtEnd = Convert.ToDateTime(row["projectend"]);

			string briefPeriod = string.Empty;
			if (dtStart.Year == dtEnd.Year) briefPeriod = dtStart.ToString("MMMM");
			else briefPeriod = dtStart.ToString("MMMM yyyy");
			briefPeriod += " - " + dtEnd.ToString("MMMM yyyy");

			return new MRW.ReportParameter[] {
				new MRW.ReportParameter("brief", dt.Rows[0]["briefname"].ToString()),
				new MRW.ReportParameter("briefPeriod", briefPeriod),
					};
		}
	}
}