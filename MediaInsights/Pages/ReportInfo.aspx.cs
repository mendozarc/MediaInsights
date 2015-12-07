using System;
using System.Web.Services;
using CommSights.Data;
using MediaInsights.Reports;
using MRW = Microsoft.Reporting.WebForms;
using System.IO;

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
			ReportGenerator.GenerateReport();

			string fileName = "File_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".docx";
			string fullFilePath = Server.MapPath("~/download/") + fileName;
			string extension = string.Empty;
			string encoding = string.Empty;
			//string mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
			string mimeType = string.Empty;
            string[] streams;
			MRW.Warning[] warnings;

			MRW.LocalReport report = new MRW.LocalReport();
			report.ReportPath = Server.MapPath("~/CoverPage.rdlc");
			//report.ReportEmbeddedResource = "MediaInsights.Reports.CoverPage.rdlc";
			//ReportDataSource rds = new ReportDataSource();
			//rds.Name = "DataSet1";//This refers to the dataset name in the RDLC file  
			//rds.Value = dsData;
			//report.DataSources.Add(rds);
			//WORDOPENXML
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
	}
}