using HrPortal.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HrPortal.Api.Controllers;

[ApiController]
[Route("designations")]
public class DesignationsController : ControllerBase
{
    private readonly HrDbContext _db;
    public DesignationsController(HrDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _db.Designations.AsNoTracking()
            .OrderBy(d => d.Name)
            .ToListAsync();
        return Ok(list);
    }

    public record CreateDto(string Name);
    public record UpdateDto(string Name);

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name))
        {
            return BadRequest("Name is required.");
        }

        var exists = await _db.Designations.AnyAsync(d => d.Name == dto.Name);
        if (exists)
        {
            return Conflict("Designation already exists.");
        }

        var entity = new Designation
        {
            Name = dto.Name.Trim(),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        _db.Designations.Add(entity);
        await _db.SaveChangesAsync();
        return Ok(entity);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateDto dto)
    {
        var entity = await _db.Designations.FindAsync(id);
        if (entity is null)
        {
            return NotFound();
        }
        if (string.IsNullOrWhiteSpace(dto.Name))
        {
            return BadRequest("Name is required.");
        }

        var duplicate = await _db.Designations.AnyAsync(d => d.Name == dto.Name && d.Id != id);
        if (duplicate)
        {
            return Conflict("Designation already exists.");
        }

        entity.Name = dto.Name.Trim();
        entity.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(entity);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _db.Designations.FindAsync(id);
        if (entity is null)
        {
            return NotFound();
        }

        _db.Designations.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
