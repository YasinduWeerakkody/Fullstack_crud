using Microsoft.EntityFrameworkCore;

namespace sampleCrud.Models
{
    public class BrandContext : DbContext
    {
        public BrandContext(DbContextOptions<BrandContext> options) : base(options)
        {
        
        }

        public DbSet<Brandixs> brandixs { get; set; }
    }
}
