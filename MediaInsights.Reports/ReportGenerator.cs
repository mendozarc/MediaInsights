using System.IO;
using System.Reflection;
using System.Xml;

namespace MediaInsights.Reports
{
	public class ReportGenerator
    {
		//System.Web.HttpRuntime.AppDomainAppPath + "chart-images\\"
		public static string ChartImagePath;

		public static void GenerateReport()
		{
			Assembly asm = Assembly.GetExecutingAssembly();
			Stream streamCover = asm.GetManifestResourceStream("MediaInsights.Reports.Reports.CoverPage.rdlc");

			XmlDocument xDoc = new XmlDocument();
			xDoc.Load(streamCover);
			//xDoc.chi
        }

		private static void ReadChartImage()
		{
			//string chartPath = ChartImagePath + id + ".png";
		}

		private void ChartLineTop()
		{
			XmlDocument xDoc = new XmlDocument();
			//xDoc.
		}
    }
}
