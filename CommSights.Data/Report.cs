using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace CommSights.Data
{
    public class Report
    {
        private helper_db util = new helper_db();
        public DataTable sp_ContentSummary_ProjectBriefID(int projectBriefId)
        {
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter("@projectBriefID", projectBriefId));
            return util.QuerytoDataTable("sp_ContentSummary_ProjectBriefID", paramList);
        }

        public int sp_ContentSummary_insert(string id, int projectBriefId, string title, int sequence, int layoutId)
        {
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter("@ID", id));
            paramList.Add(new SqlParameter("@projectBriefID", projectBriefId));
            paramList.Add(new SqlParameter("@title", title));
            paramList.Add(new SqlParameter("@sequence", sequence));
            paramList.Add(new SqlParameter("@layoutID", layoutId));

            return util.ExecuteNonQuery("sp_ContentSummary_insert", paramList);
        }

        public int sp_ContentSummary_update(string id, string title, int sequence, int layoutId)
        {
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter("@ID", id));
            paramList.Add(new SqlParameter("@description", title));
            paramList.Add(new SqlParameter("@sequence", sequence));
            paramList.Add(new SqlParameter("@layout", layoutId));

            return util.ExecuteNonQuery("sp_ContentSummary_update", paramList);
        }

        public int sp_ContentSummary_delete(string Id)
        {
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter("@ID", new Guid(Id)));

            return util.ExecuteNonQuery("sp_ContentSummary_delete", paramList);
        }
    }
}
