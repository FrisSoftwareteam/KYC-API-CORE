using HrPortal.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HrPortal.Api.Controllers;

[ApiController]
[Route("announcements")]
[Authorize]
public class AnnouncementsController : ControllerBase
{
    private readonly HrDbContext _db;
    public AnnouncementsController(HrDbContext db) => _db = db;

    [HttpGet("active")]
    public async Task<IActionResult> Active()
    {
        var now = DateTime.UtcNow;
        var items = await _db.Announcements.AsNoTracking()
            .Where(a => a.StartAt <= now && a.EndAt >= now)
            .OrderByDescending(a => a.StartAt)
            .ToListAsync();
        return Ok(items);
    }

    [Authorize(Policy = "HRAdmin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Announcement dto)
    {
        _db.Announcements.Add(dto);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Active), new { id = dto.Id }, dto);
    }
}
