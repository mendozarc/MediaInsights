using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MediaInsights.Controls
{
    public partial class PageTitle : System.Web.UI.UserControl
    {
        public string Title { get; set; }
        public string SubTitle { get; set; }

        protected void Page_Load(object sender, EventArgs e)
        {
            
        }
    }
}