using HrPortal.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HrPortal.Api.Controllers;

[ApiController]
[Route("leave")]
[Authorize]
public class LeaveController : ControllerBase
{
    private readonly HrDbContext _db;
    public LeaveController(HrDbContext db) => _db = db;

    [HttpGet("balance/{employeeId:int}")]
    public async Task<IActionResult> Balance(int employeeId)
    {
        var bal = await _db.LeaveBalances.AsNoTracking().FirstOrDefaultAsync(b => b.EmployeeId == employeeId);
        return bal is null ? NotFound() : Ok(bal);
    }

    [HttpPost("request")]
    public async Task<IActionResult> Request([FromBody] LeaveRequest req)
    {
        _db.LeaveRequests.Add(req);
        await _db.SaveChangesAsync();
        return Ok(req);
    }

    [Authorize(Policy = "Manager")]
    [HttpPost("approve/{id:int}")]
    public async Task<IActionResult> Approve(int id)
    {
        var r = await _db.LeaveRequests.FindAsync(id);
        if (r is null)
        {
            return NotFound();
        }

        r.Status = LeaveStatus.Approved;
        r.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(r);
    }

    [Authorize(Policy = "Manager")]
    [HttpPost("reject/{id:int}")]
    public async Task<IActionResult> Reject(int id, [FromBody] string notes = "")
    {
        var r = await _db.LeaveRequests.FindAsync(id);
        if (r is null)
        {
            return NotFound();
        }

        r.Status = LeaveStatus.Rejected;
        r.Notes = notes;
        r.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(r);
    }
}
