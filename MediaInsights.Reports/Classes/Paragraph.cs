using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace MediaInsights.Reports.Classes
{
	internal class Paragraph
	{
		public string Value { get; set; }
		public bool IsBold { get; set; }
		public bool IsItalic { get; set; }

		public static List<Paragraph> ParseXmlToParagraphs(string stringToParse)
		{
			List<Paragraph> paragraphList = new List<Paragraph>();
			if (stringToParse.Length > 0)
			{
				Paragraph p;
				if (stringToParse[0] != '<')
				{
					p = new Paragraph();
					p.Value = stringToParse;

					paragraphList.Add(p);
				}
				else
				{
					XmlDocument xDoc = new XmlDocument();
					XmlNode rootNode = xDoc.CreateElement("root");
					rootNode.InnerXml = stringToParse.Replace("<br>", "<br/>");
					xDoc.AppendChild(rootNode);
					foreach (XmlNode n in xDoc.FirstChild.ChildNodes)
					{
						if (n.Name == "p")
						{
							p = new Paragraph();
							p.Value = n.InnerText;
							p.IsBold = IsBoldParagraph(n);
							p.IsItalic = IsItalicParagraph(n);
							paragraphList.Add(p);
						}
					}

					// it's just a span
					if (paragraphList.Count < 1)
					{
						p = new Paragraph();
						p.Value = xDoc.FirstChild.FirstChild.InnerText;
						p.IsBold = IsBoldParagraph(xDoc.FirstChild);
						p.IsItalic = IsItalicParagraph(xDoc.FirstChild);
						paragraphList.Add(p);
					}
				}
			}

			return paragraphList;
		}

		private static bool IsBoldParagraph(XmlNode node)
		{
			return IsBoldItalic(node, "font-weight: bold");
		}

		private static bool IsItalicParagraph(XmlNode node)
		{
			return IsBoldItalic(node, "font-style: italic");
		}

		private static bool IsBoldItalic(XmlNode node, string keyToCheck)
		{
			foreach (XmlNode n in node.ChildNodes)
			{
				if (n.Name == "span")
				{
					foreach (XmlAttribute attr in n.Attributes)
					{
						if (attr.Name == "style" && attr.Value.Contains(keyToCheck))
						{
							return true;
						}
					}
				}
			}

			return false;
		}

	}
}
