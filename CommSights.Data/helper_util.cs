using System;
using System.Configuration;
using System.Data;

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
    }
}