using Microsoft.EntityFrameworkCore;

namespace HrPortal.Domain;

public class HrDbContext : DbContext
{
    public HrDbContext(DbContextOptions<HrDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Announcement> Announcements => Set<Announcement>();
    public DbSet<LeaveBalance> LeaveBalances => Set<LeaveBalance>();
    public DbSet<LeaveRequest> LeaveRequests => Set<LeaveRequest>();
    public DbSet<AuditEvent> AuditEvents => Set<AuditEvent>();
    public DbSet<Designation> Designations => Set<Designation>();
    public DbSet<GradeLevel> GradeLevels => Set<GradeLevel>();
    public DbSet<ProfessionalBody> ProfessionalBodies => Set<ProfessionalBody>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<User>().HasIndex(u => u.EntraObjectId).IsUnique();
        b.Entity<User>().HasIndex(u => u.Email).IsUnique();
        b.Entity<Employee>().HasIndex(e => e.StaffNo).IsUnique();
        b.Entity<Announcement>().HasIndex(a => new { a.StartAt, a.EndAt });
        b.Entity<LeaveRequest>().Property(l => l.Status).HasConversion<string>();
        b.Entity<Designation>().HasIndex(d => d.Name).IsUnique();
        b.Entity<GradeLevel>().HasIndex(g => g.Name).IsUnique();
        b.Entity<ProfessionalBody>().HasIndex(p => p.InstitutionName).IsUnique();
    }
}
