using System;
using System.Collections.Generic;
using System.Xml;

namespace MediaInsights.Reports
{
	public class ChartReport : ReportBase
	{
		public const double PageBreakHeight = 2.2;

        public ChartReport(string name, double startLocationTop)
			: base(name, startLocationTop) { }

		public string Test(string report)
		{
			string xmlSummary = _utility.GetResourceFile("WithChart.Test.xml");
			_xDoc.LoadXml(xmlSummary);

			XmlNode node = _xDoc.LastChild.FirstChild.FirstChild;
			node.InnerXml = report;

			return _xDoc.OuterXml;
		}

		public string Summary(string summary)
		{
			string xmlSummary = _utility.GetResourceFile("WithChart.Summary.xml");
			_xDoc.LoadXml(xmlSummary);
			_utility.SetNameAndTopLocation(_xDoc.LastChild, Name, StartLocationTop);

			XmlNode node = _xDoc.LastChild;
			node = node.SelectSingleNode("Paragraphs/Paragraph/TextRuns/TextRun/Value");
			node.FirstChild.Value = summary;

			return _xDoc.OuterXml;
		}

		public string Title(string title)
		{
			string xmlTitle = _utility.GetResourceFile("WithChart.Title.xml");
			_xDoc.LoadXml(xmlTitle);
			_utility.SetNameAndTopLocation(_xDoc.LastChild, Name, StartLocationTop);

			XmlNode node = _xDoc.LastChild;
			node = node.SelectSingleNode("Paragraphs/Paragraph/TextRuns/TextRun/Value");
			if (node != null) node.FirstChild.Value = title;

			return _xDoc.OuterXml;
		}


		public string TitleLine()
		{
			string xmlTitleLine = _utility.GetResourceFile("WithChart.TitleLine.xml");
			_xDoc.LoadXml(xmlTitleLine);
			_utility.SetNameAndTopLocation(_xDoc.LastChild, Name, StartLocationTop);
			return _xDoc.OuterXml;
		}

		public string PageBreak(double startLocation)
		{
			string xmlResource = _utility.GetResourceFile("WithChart.PageBreak.xml");
			_xDoc.LoadXml(xmlResource);
			_utility.SetNameAndTopLocation(_xDoc.LastChild, Name, startLocation);
			return _xDoc.OuterXml;
		}

		public double GetElementHeight(string xmlString)
		{
			_xDoc.LoadXml(xmlString);
			XmlNode nodeHeight = _xDoc.LastChild.SelectSingleNode("Height");
			if (nodeHeight != null)
			{
				string nodeValue = nodeHeight.FirstChild.Value;
				nodeValue = nodeValue.Replace("cm", "");
				return Convert.ToDouble(nodeValue);
			}

			return 0;
		}

		public string EmbeddedImage(Dictionary<string, string> embeddedImages)
		{
			_xDoc.RemoveAll();
			_xDoc.AppendChild(_xDoc.CreateElement("EmbeddedImages"));
			List<XmlNode> nodeList = new List<XmlNode>();

			foreach (KeyValuePair<string, string> nvp in embeddedImages)
			{
				XmlElement mimeTypeElement = _xDoc.CreateElement("MIMEType");
				mimeTypeElement.AppendChild(_xDoc.CreateTextNode("image/png"));

				XmlElement imageDataElement = _xDoc.CreateElement("ImageData");
				imageDataElement.AppendChild(_xDoc.CreateTextNode(nvp.Value));

				XmlAttribute attr = _xDoc.CreateAttribute("Name");
				attr.Value = nvp.Key;

				XmlElement embededImageElement = _xDoc.CreateElement("EmbeddedImage");
				embededImageElement.Attributes.Append(attr);
				embededImageElement.AppendChild(mimeTypeElement);
				embededImageElement.AppendChild(imageDataElement);

				nodeList.Add(embededImageElement);
			}

			foreach (XmlNode n in nodeList) _xDoc.FirstChild.AppendChild(n);
			return _xDoc.FirstChild.InnerXml;
		}
	}
}
