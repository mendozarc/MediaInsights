using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommSights.Data.Models
{
	public class Content
	{
		public Guid ID { get; set; }
		public string Name { get; set; }
		public Guid ContentSummary { get; set; }
		public int Sequence { get; set; }
		public int Chart { get; set; }
		public string ChartTitle { get; set; }
		public string Analysis { get; set; }
		public string Callout { get; set; }
	}
}
