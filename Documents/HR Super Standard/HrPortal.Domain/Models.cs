using System;

namespace HrPortal.Domain;

public enum LeaveStatus
{
    Pending,
    Approved,
    Rejected
}

public class User
{
    public int Id { get; set; }
    public string EntraObjectId { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string DisplayName { get; set; } = null!;
    public string Role { get; set; } = "Employee"; // Employee | Manager | HRAdmin
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Employee
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string StaffNo { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public DateTime? Dob { get; set; }
    public string Dept { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public int? ManagerId { get; set; }
    public DateTime HireDate { get; set; } = DateTime.UtcNow;
    public string Phone { get; set; } = string.Empty;
    public string WorkEmail { get; set; } = string.Empty;
    public string Status { get; set; } = "Active";
    public User? User { get; set; }
}

public class Announcement
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Body { get; set; } = null!;
    public string Category { get; set; } = "General";
    public DateTime StartAt { get; set; }
    public DateTime EndAt { get; set; }
    public int CreatedByUserId { get; set; }
    public User? CreatedByUser { get; set; }
}

public class LeaveBalance
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public int AnnualEntitlement { get; set; }
    public int SickEntitlement { get; set; }
    public int AnnualUsed { get; set; }
    public int SickUsed { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class LeaveRequest
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public string Type { get; set; } = "Annual";
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Days { get; set; }
    public LeaveStatus Status { get; set; } = LeaveStatus.Pending;
    public int? ApproverId { get; set; }
    public string Notes { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class AuditEvent
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Action { get; set; } = string.Empty;
    public string Entity { get; set; } = string.Empty;
    public string EntityId { get; set; } = string.Empty;
    public string Metadata { get; set; } = "{}";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Designation
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class GradeLevel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal AnnualBasic { get; set; }
    public int Ranking { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class ProfessionalBody
{
    public int Id { get; set; }
    public string InstitutionName { get; set; } = string.Empty;
    public string Acronym { get; set; } = string.Empty;
    public string Award { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
