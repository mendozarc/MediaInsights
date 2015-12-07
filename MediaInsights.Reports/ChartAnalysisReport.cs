﻿using System.Xml;

namespace MediaInsights.Reports
{
	public class ChartAnalysisReport : ReportBase 
	{
		// for more than 1 chart, the second chart will have StartLocation = last item height - 4.8

		public const double ReportHeight = 6.6;
		public const double ChartExplanationTop = 8.1;

		public ChartAnalysisReport(string name, double startLocationTop) 
			: base(name, startLocationTop) { }

		public string ChartLineTop()
		{
			string xmlChartLineTop = _utility.GetResourceFile("WithChart.ChartLineTop.xml");
			_xDoc.LoadXml(xmlChartLineTop);
			_utility.SetNameAndTopLocation(_xDoc.LastChild, Name, StartLocationTop);
			return _xDoc.OuterXml;
		}

		public string ChartLineBottom()
		{
			string xmlChartLineBottom = _utility.GetResourceFile("WithChart.ChartLineBottom.xml");
			_xDoc.LoadXml(xmlChartLineBottom);
			_utility.SetNameAndTopLocation(_xDoc.LastChild, Name, StartLocationTop);
			return _xDoc.OuterXml;
		}

		public string GenerateCallout(string callout)
		{
			string xmlChartCallout = _utility.GetResourceFile("WithChart.Callout.xml");
			_xDoc.LoadXml(xmlChartCallout);
			_utility.SetNameAndTopLocation(_xDoc.LastChild, Name, StartLocationTop);

			XmlNodeList nodeList = _xDoc.LastChild.SelectNodes("Paragraphs");
			if (nodeList != null && nodeList.Count > 0)
			{
				XmlNode node = nodeList[0].FirstChild;
				while (node.Name != "Value" && node.HasChildNodes) node = node.FirstChild;
				node.FirstChild.Value = callout;
			}

			return _xDoc.OuterXml;
		}

		public string GenerateChartExplanation(string paragraphs)
		{
			string xmlChartExplanation = _utility.GetResourceFile("WithChart.ChartExplanation.xml");
			_xDoc.LoadXml(xmlChartExplanation);
			_utility.SetNameAndTopLocation(_xDoc.LastChild, Name, StartLocationTop);

			XmlNode node = _xDoc.LastChild.SelectSingleNode("Paragraphs");
			if (node != null ) node.InnerXml = paragraphs;

			return _xDoc.OuterXml;
		}

		public string GenerateChartExplanationParagraph(string text, bool isBold, bool isItalic)
		{
			string xmlParagraph = _utility.GetResourceFile("WithChart.ChartExplanationParagraph.xml");
			_xDoc.LoadXml(xmlParagraph);

			// Value node
			XmlNode node = _xDoc.LastChild.FirstChild;
			while (node.Name != "Value" && node.HasChildNodes) node = node.FirstChild;
			if (text != null) node.InnerXml = text;

			// Style node
			if (isItalic)
			{
				XmlNode nodeFontStyle = node.SelectSingleNode("../Style/FontStyle");
				if (nodeFontStyle != null) nodeFontStyle.FirstChild.Value = "Italic";
			}

			// Weight node
			if (isBold)
			{
				XmlNode nodeFontWeight = node.SelectSingleNode("../Style/FontWeight");
				if (nodeFontWeight != null) nodeFontWeight.FirstChild.Value = "Bold";
			}

			return _xDoc.OuterXml;
		}

		// think of the naming
		public string Image()
		{
			string xmlTitleLine = _utility.GetResourceFile("WithChart.Image.xml");
			_xDoc.LoadXml(xmlTitleLine);
			_utility.SetNameAndTopLocation(_xDoc.LastChild, Name, StartLocationTop);

			XmlNode node = _xDoc.LastChild;
			node = node.SelectSingleNode("Value");
			if (node != null) node.FirstChild.Value = "Image" + Name;

			return _xDoc.OuterXml;
		}
	}
}
