using System;

namespace Tsystem_dbver.Models
{
    public class Record
    {
        public long id { get; set; }

        public long empid { get; set; }

        public String Firstname { get; set; }
        public String Lastname { get; set; }

        public DateTime begindate { get; set; }

        public DateTime enddate { get; set; }
        public Double hours { get; set; }
        public Boolean pto { get; set; }
        public Boolean sick { get; set; }
        public String message { get; set; }
    }
}