using CommSights.Data.Enums;
using System;

namespace CommSights.Data.Models
{
	public class ContentSummary
	{
		public Guid ID { get; set; }
		public int ProjectBrief { get; set; }
		public string Title { get; set; }
		public int Sequence { get; set; }
		public Layout Layout { get; set; }
		public string Summary { get; set; }
		public string Callout { get; set; }
	}
}