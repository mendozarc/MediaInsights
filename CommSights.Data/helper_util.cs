using System;
using System.Configuration;
using System.Data;
using System.Text;

namespace CommSights.Data
{

    public class helper_util
    {
        public static bool DTnotEmpty(DataTable dt)
        {
            bool ret = false;
            if (dt != null)
            {
                if (dt.Rows.Count > 0)
                {
                    ret= true;
                }
            }
            return ret;
        }

        public static string GetConfig(string key)
        {
            return ConfigurationManager.AppSettings[key];
        }

        public static string GenerateId()
        {
            long i = 1;
            foreach (byte b in Guid.NewGuid().ToByteArray())
            {
                i *= ((int)b + 1);
            }
            return string.Format("{0:x}", i - DateTime.Now.Ticks);
        }

		public static string SerializeDataTableToJSON(DataTable dt)
		{
			if (dt == null || dt.Rows.Count < 1) return null;

			StringBuilder jsonString = new StringBuilder("[");
			foreach (DataRow row in dt.Rows)
			{
				jsonString.Append("{");
				foreach (DataColumn column in dt.Columns)
				{
					jsonString.AppendFormat("\"{0}\":\"{1}\",", column.ColumnName, row[column]);
				}
				jsonString.Insert(jsonString.Length - 1, "}");
			}

			jsonString.Remove(jsonString.Length - 1, 1);
			jsonString.Append("]");
			return jsonString.ToString();
		}
    }
}