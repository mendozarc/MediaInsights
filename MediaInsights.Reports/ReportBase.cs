using System.Xml;

namespace MediaInsights.Reports
{
	public abstract class ReportBase
	{
		public double StartLocationTop { get; set; }
		public string Name { get; set; }
		protected XmlDocument _xDoc;
		internal Utility _utility;

		public ReportBase(string name, double startLocationTop)
		{
			Name = name;
			StartLocationTop = startLocationTop;
			_utility = new Utility();
			_xDoc = new XmlDocument();
		}
	}
}
