using CommSights.Data;
using CommSights.Data.Models;
using System;
using System.IO;
using System.Web.Services;

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

		[WebMethod]
		public static string getCharts()
		{
			Report r = new Report();
			return helper_util.SerializeDataTableToJSON(r.sp_Charts_select());
		}

		[WebMethod]
		public static string getChartParameters(int chartId)
		{
			Report r = new Report();
			return helper_util.SerializeDataTableToJSON(r.sp_ChartParameters_Chart(chartId));
		}

		[WebMethod]
		public static int saveSummaryCallout(string contentId, string summary, string callout)
		{
			ContentSummary cs = new ContentSummary();
			cs.ID = new Guid(contentId);
			cs.Summary = summary.Replace('\"', '\'');
			cs.Callout = callout;

			return (new Report()).sp_ContentSummary_update(cs);
		}

		[WebMethod]
		public static int saveContentAnalysis(string id, string name, string contentId, int sequence,
			int chart, string chartTitle, string analysis, string callout, string imageData, bool isNew)
		{
			SaveImage(id, imageData);

			var cs = new Content();
			cs.ID = new Guid(id);
			cs.Name = name;
			cs.ContentSummary = new Guid(contentId);
			cs.Sequence = sequence;
			cs.Chart = chart;
			cs.ChartTitle = chartTitle;
			cs.Analysis = analysis.Replace('\"', '\'');
			cs.Callout = callout;

			if (isNew)
				return (new Report()).sp_Content_insert(cs);
			else
				return (new Report()).sp_Content_update(cs);
		}

		private static void SaveImage(string id, string imageData)
		{
			string filename = System.Web.HttpRuntime.AppDomainAppPath + "chart-images\\" + id + ".png";
			using (FileStream fs = new FileStream(filename, FileMode.Create))
			{
				using (BinaryWriter bw = new BinaryWriter(fs))
				{
					byte[] data = Convert.FromBase64String(imageData);
					bw.Write(data);
					bw.Close();
				}
			}
		}

		[WebMethod]
		public static string getContent(string contentId)
		{
			return helper_util.SerializeDataTableToJSON((new Report()).sp_ContentSummary_ID(contentId));
		}

		[WebMethod]
		public static string getContentAnalysis(string contentId)
		{
			return helper_util.SerializeDataTableToJSON((new Report()).sp_Content_ContentSummary(contentId));
        }

		[WebMethod]
		public static int deleteContentAnalysis(string id)
		{
			return (new Report()).sp_Contents_delete(id);
		}
	}
}