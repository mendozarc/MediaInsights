using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommSights.Data.Models
{
	public class ContentFilter
	{
		public int Brief { get; set; }
		public bool HasLanguage { get { return !string.IsNullOrEmpty(Language); } }
		public bool HasMediaType { get { return !string.IsNullOrEmpty(MediaType); } }
		public bool HasMediaTitle { get { return !string.IsNullOrEmpty(MediaTitle); } }
		public bool HasCompany { get { return !string.IsNullOrEmpty(Company); } }
		public bool HasBrand { get { return !string.IsNullOrEmpty(Brand); } }
		public bool HasSubBrand { get { return !string.IsNullOrEmpty(SubBrand); } }

		public string Language { get; set; }
		public string MediaType { get; set; }
		public string MediaTitle { get; set; }
		public string Company { get; set; }
		public string Brand { get; set; }
		public string SubBrand { get; set; }

		public ContentFilter(int brief, string[] filterString)
		{
			Brief = brief;
			Language = string.Empty;
			MediaType = string.Empty;
			MediaTitle = string.Empty;
			Company = string.Empty;
			Brand = string.Empty;
			SubBrand = string.Empty;

			if (filterString == null || filterString.Length < 1) return;

			//if (string.IsNullOrEmpty(filterString)) return;

			//string[] splitString = filterString.Split(new char[] { ',' });
			foreach (string s in filterString)
			{
				switch (s[0])
				{
					case 'l':
						Language += s.Remove(0, 1) + ",";
						break;
					case 'm':
						MediaType += s.Remove(0, 1) + ",";
						break;
					case 'n':
						MediaTitle += s.Remove(0, 1) + ",";
						break;
					case 'c':
						Company += s.Remove(0, 1) + ",";
						break;
					case 'b':
						Brand += s.Remove(0, 1) + ",";
						break;
					case 's':
						SubBrand += s.Remove(0, 1) + ",";
						break;
				}
			}

			if (HasLanguage) Language = Language.Remove(Language.Length - 1);
			if (HasMediaType) MediaType = MediaType.Remove(MediaType.Length - 1);
			if (HasMediaTitle) MediaTitle = MediaTitle.Remove(MediaTitle.Length - 1);
			if (HasCompany) Company = Company.Remove(Company.Length - 1);
			if (HasBrand) Brand = Brand.Remove(Brand.Length - 1);
			if (HasSubBrand) SubBrand = SubBrand.Remove(SubBrand.Length - 1);
		}
	}
}
