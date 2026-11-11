using BugManagement.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BugManagement.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Bug> Bugs => Set<Bug>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Bug>(entity =>
        {
            entity.ToTable("Bugs");

            entity.HasKey(b => b.Id);

            entity.Property(b => b.Id)
                  .ValueGeneratedOnAdd();

            entity.Property(b => b.BugName)
                  .IsRequired()
                  .HasMaxLength(150);

            entity.Property(b => b.BugDescription)
                  .IsRequired()
                  .HasMaxLength(2000);

            entity.Property(b => b.ReportDate)
                  .IsRequired();

            // Store Enum as a human-readable string in the database
            entity.Property(b => b.Level)
                  .IsRequired()
                  .HasConversion<string>()
                  .HasMaxLength(20);

            // Index for faster ordering and filtering
            entity.HasIndex(b => b.ReportDate);
            entity.HasIndex(b => b.Level);

            // Seed initial realistic data for demonstration
            entity.HasData(
                new Bug
                {
                    Id = 1,
                    BugName = "Authentication token expiration causes 500 error",
                    BugDescription = "When JWT refresh token expires, the client receives HTTP 500 Internal Server Error instead of HTTP 401 Unauthorized, causing unexpected crash on user dashboard.",
                    ReportDate = new DateTime(2026, 11, 8, 9, 30, 0, DateTimeKind.Utc),
                    Level = SeverityLevel.Critical
                },
                new Bug
                {
                    Id = 2,
                    BugName = "Payment gateway timeout retry loop",
                    BugDescription = "Payment processing fails to back off when gateway response times out, leading to duplicate charge attempts within a short interval.",
                    ReportDate = new DateTime(2026, 11, 9, 14, 15, 0, DateTimeKind.Utc),
                    Level = SeverityLevel.High
                },
                new Bug
                {
                    Id = 3,
                    BugName = "Profile image avatar rendering distortion",
                    BugDescription = "Circular avatar cropper distorts non-square uploaded images on mobile responsive viewports below 480px width.",
                    ReportDate = new DateTime(2026, 11, 9, 18, 45, 0, DateTimeKind.Utc),
                    Level = SeverityLevel.Medium
                },
                new Bug
                {
                    Id = 4,
                    BugName = "Typo in user settings email verification tooltip",
                    BugDescription = "Tooltip displays 'Verfication' instead of 'Verification' on hover under Account Security tab.",
                    ReportDate = new DateTime(2026, 11, 10, 8, 10, 0, DateTimeKind.Utc),
                    Level = SeverityLevel.Low
                }
            );
        });
    }
}

