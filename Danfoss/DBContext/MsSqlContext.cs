using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Danfoss.Model;

namespace Danfoss.DBContext
{
    public class MsSqlContext: DbContext
    {
        public DbSet<Home> Homes { get; set; }
        public DbSet<Meter> Meters { get; set; }
        public DbSet<MeterReading> MeterReadings { get; set; }

        public MsSqlContext(DbContextOptions<MsSqlContext> options) : base(options) 
        {            
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Meter>()
                .Property(b => b.DateStart)
                .HasDefaultValueSql("getdate()");
            modelBuilder.Entity<MeterReading>()
                .Property(b => b.ReadingDate)
                .HasDefaultValueSql("getdate()");
        }
    }
}
