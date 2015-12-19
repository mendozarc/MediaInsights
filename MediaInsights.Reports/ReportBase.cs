using System.Xml;

namespace MediaInsights.Reports
{
	public abstract class ReportBase
	{
		public double StartLocationTop { get; set; }
		public string Name { get; set; }
		protected XmlDocument _xDoc;
		internal Utility _utility;

		private static double ReportHeight { get { return 1.1; } }

		public ReportBase(string name, double startLocationTop)
		{
			Name = name;
			StartLocationTop = startLocationTop;
			_utility = new Utility();
			_xDoc = new XmlDocument();
		}

		public virtual string GenerateTitle(string title)
		{
			string xmlTitle = _utility.GetResourceFile("WithChart.Title.xml");
			_xDoc.LoadXml(xmlTitle);
			_utility.SetNameAndTopLocation(_xDoc.LastChild, Name, StartLocationTop);

			XmlNode node = _xDoc.LastChild;
			node = node.SelectSingleNode("Paragraphs/Paragraph/TextRuns/TextRun/Value");
			if (node != null) node.FirstChild.Value = title;

			return _xDoc.OuterXml + GenerateTitleLine();
		}

		private string GenerateTitleLine()
		{
			string xmlTitleLine = _utility.GetResourceFile("WithChart.TitleLine.xml");
			_xDoc.LoadXml(xmlTitleLine);
			_utility.SetNameAndTopLocation(_xDoc.LastChild, Name, StartLocationTop);
			return _xDoc.OuterXml;
		}
	}
}
