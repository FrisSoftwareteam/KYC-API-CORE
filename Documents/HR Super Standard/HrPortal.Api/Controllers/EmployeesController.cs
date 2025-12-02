using HrPortal.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HrPortal.Api.Controllers;

[ApiController]
[Route("employees")]
[Authorize]
public class EmployeesController : ControllerBase
{
    private readonly HrDbContext _db;
    public EmployeesController(HrDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? dept, [FromQuery] string? q)
    {
        var query = _db.Employees.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(dept))
        {
            query = query.Where(e => e.Dept == dept);
        }
        if (!string.IsNullOrWhiteSpace(q))
        {
            query = query.Where(e => (e.FirstName + " " + e.LastName).Contains(q));
        }

        var list = await query.Take(200).ToListAsync();
        return Ok(list);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var emp = await _db.Employees.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
        return emp is null ? NotFound() : Ok(emp);
    }

    [HttpGet("birthdays")]
    public async Task<IActionResult> Birthdays([FromQuery] int? month)
    {
        var m = month ?? DateTime.UtcNow.Month;
        var list = await _db.Employees.AsNoTracking()
            .Where(e => e.Dob.HasValue && e.Dob.Value.Month == m)
            .Select(e => new
            {
                e.Id,
                Name = e.FirstName + " " + e.LastName,
                Day = e.Dob!.Value.Day,
                Month = e.Dob.Value.Month
            })
            .OrderBy(e => e.Day)
            .ToListAsync();
        return Ok(list);
    }
}
