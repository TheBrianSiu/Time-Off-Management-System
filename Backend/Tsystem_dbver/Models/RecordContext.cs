using Microsoft.EntityFrameworkCore;

namespace Tsystem_dbver.Models{

    public class RecordContext : DbContext
    {
        public RecordContext(DbContextOptions<RecordContext> options) 
            : base(options)
        {

        }
        public DbSet<Record> Records { get; set; } = null!;
    }
}
