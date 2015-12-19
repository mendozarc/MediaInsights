using CommSights.Data.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace CommSights.Data
{
    public class Report
    {
		const string CS_MAIN = "CS_MAIN";

        private helper_db util = new helper_db();

		#region Charts
		public DataTable sp_ChartData_select()
		{
			return util.QuerytoDataTable("sp_ChartData_select");
		}

		public DataTable sp_ChartData_ID(int chartDataId)
		{
			return util.QuerytoDataTable("sp_ChartData_ID",
				new List<SqlParameter>() { new SqlParameter("@ID", chartDataId) });
		}
		
		public DataTable sp_ExecuteProcedure(string procedure, int brief, string startDate, string endDate, string[] filters)
		{
			var ci = new System.Globalization.CultureInfo("en-GB");

			ContentFilter cf = new ContentFilter(brief, filters);
			var parameterList = ConvertContentFilterToSqlParameterList(cf);
			if (!string.IsNullOrEmpty(startDate))
			{
				parameterList.Add(new SqlParameter("@hasStartDate", 1));
				DateTime dtStart = Convert.ToDateTime(startDate, ci);
				parameterList.Add(new SqlParameter("@startDate", dtStart));
			}
			if (!string.IsNullOrEmpty(endDate))
			{
				parameterList.Add(new SqlParameter("@hasEndDate", 1));
				DateTime dtEnd = Convert.ToDateTime(endDate, ci);
				parameterList.Add(new SqlParameter("@endDate", dtEnd));
			}

			return util.QuerytoDataTable(procedure, parameterList, CS_MAIN);
		}

		private List<SqlParameter> ConvertContentFilterToSqlParameterList(ContentFilter cf)
		{
			var paramList = new List<SqlParameter>();
			paramList.Add(new SqlParameter("@briefid", cf.Brief));

			if (cf.HasLanguage) paramList.Add(new SqlParameter("@languages", cf.Language));
			if (cf.HasMediaType) paramList.Add(new SqlParameter("@mediaTypes", cf.MediaType));
			if (cf.HasMediaTitle) paramList.Add(new SqlParameter("@mediaTitles", cf.MediaTitle));
			if (cf.HasCompany) paramList.Add(new SqlParameter("@companies", cf.Company));
			if (cf.HasBrand) paramList.Add(new SqlParameter("@brands", cf.Brand));
			if (cf.HasSubBrand) paramList.Add(new SqlParameter("@subbands", cf.SubBrand));

			return paramList;
		}
		#endregion

		#region Chart Filter
		public DataTable sp_chart_brief_startenddate_briefId(int briefId)
		{
			return util.QuerytoDataTable("sp_chart_brief_startenddate_briefId",
				new List<SqlParameter>() { new SqlParameter("@briefId", briefId) }, CS_MAIN);
		}

		public DataTable sp_ac_briefmediatype(int brief)
		{
			return util.QuerytoDataTable("sp_ac_briefmediatype",
				new List<SqlParameter>() { new SqlParameter("@briefId", brief) }, CS_MAIN);
		}

		public DataTable sp_ac_briefbrandget(int brief)
		{
			return util.QuerytoDataTable("sp_ac_briefbrandget",
				new List<SqlParameter>() { new SqlParameter("@briefId", brief) }, CS_MAIN);
		}

		public DataTable sp_ac_briefcliplanguage(int brief)
		{
			return util.QuerytoDataTable("sp_ac_briefcliplanguage",
				new List<SqlParameter>() { new SqlParameter("@briefId", brief) }, CS_MAIN);
		}

		public DataTable sp_ac_briefclipmediatitle(int brief)
		{
			return util.QuerytoDataTable("sp_ac_briefclipmediatitle",
				new List<SqlParameter>() { new SqlParameter("@briefId", brief) }, CS_MAIN);
		}
		#endregion

		public DataTable sp_ContentSummary_ProjectBriefID(int projectBriefId)
        {
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter("@projectBriefID", projectBriefId));
            return util.QuerytoDataTable("sp_ContentSummary_ProjectBriefID", paramList);
        }

		public DataTable sp_ContentSummary_ProjectBriefID_Report(int projectBriefId)
		{
			List<SqlParameter> paramList = new List<SqlParameter>();
			paramList.Add(new SqlParameter("@projectBriefID", projectBriefId));
			return util.QuerytoDataTable("sp_ContentSummary_ProjectBriefID_Report", paramList);
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

		public DataTable sp_ac_briefget(int briefId = 0)
		{
			List<SqlParameter> paramList = null;
			if (briefId > 0)
			{
				paramList = new List<SqlParameter>();
				paramList.Add(new SqlParameter("@briefid", briefId));
			}

			return util.QuerytoDataTable("sp_ac_briefget", paramList, CS_MAIN);
		}

		public DataTable sp_Content_ContentSummary(string id)
		{
			List<SqlParameter> paramList = new List<SqlParameter>();
			paramList.Add(new SqlParameter("@ContentSummaryID", new Guid(id)));

			return util.QuerytoDataTable("sp_Content_ContentSummary", paramList);
		}

		public DataTable sp_Content_ContentSummary_Report(string id)
		{
			List<SqlParameter> paramList = new List<SqlParameter>();
			paramList.Add(new SqlParameter("@ContentSummaryID", new Guid(id)));

			return util.QuerytoDataTable("sp_Content_ContentSummary_Report", paramList);
		}

		public DataTable sp_Charts_select()
		{
			return util.QuerytoDataTable("sp_Charts_select");
		}

		public DataTable sp_ContentSummary_ID(string contentId)
		{
			return util.QuerytoDataTable("sp_ContentSummary_ID",
				new List<SqlParameter>() { new SqlParameter("@ID", contentId) });
		}

		public int sp_Content_update(Content c)
		{
			return util.ExecuteNonQuery("sp_Content_update", ConvertContentToSqlParameterList(c, false));
		}

		public int sp_Content_insert(Content c)
		{
			return util.ExecuteNonQuery("sp_Content_insert", ConvertContentToSqlParameterList(c, true));
		}

		public int sp_Contents_delete(string contentId)
		{
			return util.ExecuteNonQuery("sp_Contents_delete",
				new List<SqlParameter>() { new SqlParameter("@ID", new Guid(contentId)) });
		}

		public DataTable sp_ContentSummaryContent_Brief(string briefId)
		{
			return util.QuerytoDataTable("sp_ContentSummaryContent_Brief",
				new List<SqlParameter>() { new SqlParameter("@brief", briefId) });
		}

		private List<SqlParameter> ConvertContentToSqlParameterList(Content c, bool isNew)
		{
			var paramList = new List<SqlParameter>();
			paramList.Add(new SqlParameter("@ID", c.ID));
			paramList.Add(new SqlParameter("@name", c.Name));
			if (isNew) paramList.Add(new SqlParameter("@contentSummary", c.ContentSummary));
			paramList.Add(new SqlParameter("@sequence", c.Sequence));
			paramList.Add(new SqlParameter("@chartData", c.ChartData));
			paramList.Add(new SqlParameter("@chart", c.Chart));
			paramList.Add(new SqlParameter("@chartTitle", c.ChartTitle));
			paramList.Add(new SqlParameter("@analysis", c.Analysis));
			paramList.Add(new SqlParameter("@callout", c.Callout));

			return paramList;
		}
	}
}
