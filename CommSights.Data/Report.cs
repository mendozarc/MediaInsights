using CommSights.Data.Models;
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
            paramList.Add(new SqlParameter("@title", title));
            paramList.Add(new SqlParameter("@sequence", sequence));
            paramList.Add(new SqlParameter("@layout", layoutId));

            return util.ExecuteNonQuery("sp_ContentSummary_update", paramList);
        }

		public int sp_ContentSummary_update(ContentSummary cs)
		{
			List<SqlParameter> paramList = new List<SqlParameter>();
			paramList.Add(new SqlParameter("@ID", cs.ID));
			paramList.Add(new SqlParameter("@title", cs.Title));
			paramList.Add(new SqlParameter("@sequence", cs.Sequence));
			paramList.Add(new SqlParameter("@layout", cs.Layout));
			paramList.Add(new SqlParameter("@summary", cs.Summary));
			paramList.Add(new SqlParameter("@callout", cs.Callout));

			return util.ExecuteNonQuery("sp_ContentSummary_update", paramList);
		}

		public int sp_ContentSummary_delete(string Id)
        {
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter("@ID", new Guid(Id)));

            return util.ExecuteNonQuery("sp_ContentSummary_delete", paramList);
        }

		public DataTable sp_Layouts_select()
		{
			return util.QuerytoDataTable("sp_Layouts_select");
		}

		public DataTable sp_ProjectBriefs_select()
		{
			return util.QuerytoDataTable("sp_ProjectBriefs_select");
		}

		public DataTable sp_Content_select(string id)
		{
			List<SqlParameter> paramList = new List<SqlParameter>();
			paramList.Add(new SqlParameter("@ContentSummaryID", new Guid(id)));

			return util.QuerytoDataTable("sp_Content_select", paramList);
		}

		public DataTable sp_Charts_select()
		{
			return util.QuerytoDataTable("sp_Charts_select");
		}

		public DataTable sp_ChartParameters_Chart(int chartId)
		{
			return util.QuerytoDataTable("sp_ChartParameters_Chart", 
				new List<SqlParameter>(){ new SqlParameter("@chart", chartId) });
		}
	}
}
