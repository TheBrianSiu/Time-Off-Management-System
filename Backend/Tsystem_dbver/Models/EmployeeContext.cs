using Microsoft.EntityFrameworkCore;


namespace Tsystem_dbver.Models
{
    public class EmployeeContext: DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options)
            : base(options)
        {
           
        }

        public DbSet<Employee> Employees { get; set; } = null!;
    }
}