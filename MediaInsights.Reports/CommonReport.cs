using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace MediaInsights.Reports
{
	public class CommonReport
	{
		Utility _utility = new Utility();
		XmlDocument _xDoc = new XmlDocument();

		public const double PageBreakHeight = 2.2;

		public string EmbeddedImage(Dictionary<string, string> embeddedImages)
		{
			XmlDocument xDoc = new XmlDocument();
			xDoc.AppendChild(xDoc.CreateElement("EmbeddedImages"));
			List<XmlNode> nodeList = new List<XmlNode>();

			foreach (KeyValuePair<string, string> nvp in embeddedImages)
			{
				XmlElement mimeTypeElement = xDoc.CreateElement("MIMEType");
				mimeTypeElement.AppendChild(xDoc.CreateTextNode("image/png"));

				XmlElement imageDataElement = xDoc.CreateElement("ImageData");
				imageDataElement.AppendChild(xDoc.CreateTextNode(nvp.Value));

				XmlAttribute attr = xDoc.CreateAttribute("Name");
				attr.Value = nvp.Key;

				XmlElement embededImageElement = xDoc.CreateElement("EmbeddedImage");
				embededImageElement.Attributes.Append(attr);
				embededImageElement.AppendChild(mimeTypeElement);
				embededImageElement.AppendChild(imageDataElement);

				nodeList.Add(embededImageElement);
			}

			foreach (XmlNode n in nodeList) xDoc.FirstChild.AppendChild(n);
			return xDoc.FirstChild.InnerXml;
		}

		public string PageBreak(string name, double startLocation)
		{
			_xDoc.LoadXml(_utility.GetResourceFile("WithChart.PageBreak.xml"));
			_utility.SetNameAndTopLocation(_xDoc.LastChild, name, startLocation);
			return _xDoc.OuterXml;
		}

		public string GenerateParagraph(string text, bool isBold, bool isItalic)
		{
			string xmlParagraph = _utility.GetResourceFile("WithChart.Paragraph.xml");
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

		public string GenerateEmptyParagraph()
		{
			return _utility.GetResourceFile("WithChart.ParagraphEmpty.xml");
		}

		// Unused
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
	}
}
