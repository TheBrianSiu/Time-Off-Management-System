using System;

namespace Tsystem_dbver.Models
{
    public class Employee
    {
        public long id { get; set; }
        public String Firstname { get; set; }
        public String Lastname { get; set; }
        public Double pto_hours { get; set; }
        public Double sick_hours { get; set; }

    }
}