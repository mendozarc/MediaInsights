using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace CommSights.Data
{
    public class helper_db
    {

        #region "main"
        public SqlConnection SQLConn = new SqlConnection();

        protected string DB(string databaseName)
        {
            return helper_util.GetConfig(databaseName);
        }

        public DataTable QuerytoDataTable(string storedproc, List<SqlParameter> paramlist = null, string dbname = "CS_MAIN",
                                           int timeout = 120)
        {
            SQLConn.ConnectionString = DB(dbname);
            SQLConn.Open();

            SqlCommand cmd = SQLConn.CreateCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = storedproc;
            cmd.CommandTimeout = timeout;

            if ((paramlist != null) && paramlist.Count > 0) { cmd.Parameters.AddRange(paramlist.ToArray()); }

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = cmd;

            DataTable dt = new DataTable();
            da.Fill(dt);

            SQLConn.Close();
            return dt;
        }

        protected int ExecuteNonQuery(string storedproc, List<SqlParameter> paramlist = null, string dbname = "CS_MAIN",
                                           int timeout = 120)
        {
            SQLConn.ConnectionString = DB(dbname);
            SQLConn.Open();

            SqlCommand cmd = SQLConn.CreateCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = storedproc;
            cmd.CommandTimeout = timeout;

            if ((paramlist != null) && paramlist.Count > 0) { cmd.Parameters.AddRange(paramlist.ToArray()); }

            object ret = cmd.ExecuteNonQuery();
            int retvalue = 0;
            if (ret == null)
            {
                retvalue = 0;
            }
            else { retvalue = (int)ret; }

            SQLConn.Close();
            return retvalue;
        }
        #endregion

        #region "accounts"
        public DataTable uf_account_get(int accountid)
        {
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter("@accountid", accountid));
            return QuerytoDataTable("sp_ac_accountget", paramList);
        }
        public DataTable uf_servicing_get()
        {
            return QuerytoDataTable("sp_gl_servicingget");
        }
        public DataTable uf_consultant_get()
        {
            return QuerytoDataTable("sp_gl_consultantget");
        }

        public int uf_account_addedit(int _accountid, string _accountname, string _description, DateTime _contractfrom, DateTime _contractto,
                                   int _servicing, int _consultant, int _status, string _logofile, int _userid)
        {

            List<SqlParameter> paramList = new List<SqlParameter>();


            paramList.Add(new SqlParameter("@accountname", _accountname));
            paramList.Add(new SqlParameter("@description", _description));
            paramList.Add(new SqlParameter("@startdate", _contractfrom));
            paramList.Add(new SqlParameter("@enddate", _contractto));
            paramList.Add(new SqlParameter("@servicinginchargeid", _servicing));
            paramList.Add(new SqlParameter("@consultantinchargeid", _consultant));
            paramList.Add(new SqlParameter("@status", _status));
            paramList.Add(new SqlParameter("@logofile", _logofile));
            if (_accountid == 0)
            {
                paramList.Add(new SqlParameter("@createdbyid", _userid));
            }
            else
            {
                paramList.Add(new SqlParameter("@modifiedbyid", _userid));
                paramList.Add(new SqlParameter("@accountid", _accountid));
            }

            return ExecuteNonQuery("sp_ac_insertupdate", paramList);

        }
        #endregion

        #region "Report"

        #endregion

    }
}