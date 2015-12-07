using System;
using System.IO;
using System.Xml;

namespace MediaInsights.Reports
{
	internal class Utility
	{
		public void SetNameAndTopLocation(XmlNode root, string name, double startLocationTop, bool overrideLocation = false)
		{
			root.Attributes.Item(0).Value = root.Attributes.Item(0).Value + name;
			XmlNode nodeTop = root.SelectSingleNode("Top");
			if (nodeTop != null)
			{
				XmlNode node = nodeTop.FirstChild;

				double top = 0;
                if (!overrideLocation)
				{
					string nodeValue = node.Value;
					nodeValue = nodeValue.Replace("cm", "");
					top = Convert.ToDouble(nodeValue);
				}

				node.Value = (startLocationTop + top) + "cm";
			}
		}

		public string GetResourceFile(string filename)
		{
			string result = string.Empty;
			using (Stream stream = GetType().Assembly.
				GetManifestResourceStream("MediaInsights.Reports.Reports." + filename))
			{
				using (StreamReader sr = new StreamReader(stream)) { result = sr.ReadToEnd(); }
			}

			return result;
		}
	}
}
