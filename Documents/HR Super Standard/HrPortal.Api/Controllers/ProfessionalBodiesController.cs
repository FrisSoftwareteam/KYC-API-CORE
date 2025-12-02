using HrPortal.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HrPortal.Api.Controllers;

[ApiController]
[Route("professional-bodies")]
public class ProfessionalBodiesController : ControllerBase
{
    private readonly HrDbContext _db;
    public ProfessionalBodiesController(HrDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _db.ProfessionalBodies.AsNoTracking()
            .OrderBy(p => p.InstitutionName)
            .ToListAsync();
        return Ok(list);
    }

    public record CreateDto(string InstitutionName, string Acronym, string Award);
    public record UpdateDto(string InstitutionName, string Acronym, string Award);

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.InstitutionName))
        {
            return BadRequest("Institution name is required.");
        }
        var exists = await _db.ProfessionalBodies.AnyAsync(p => p.InstitutionName == dto.InstitutionName);
        if (exists)
        {
            return Conflict("Institution already exists.");
        }

        var entity = new ProfessionalBody
        {
            InstitutionName = dto.InstitutionName.Trim(),
            Acronym = dto.Acronym?.Trim() ?? string.Empty,
            Award = dto.Award?.Trim() ?? string.Empty,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.ProfessionalBodies.Add(entity);
        await _db.SaveChangesAsync();
        return Ok(entity);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateDto dto)
    {
        var entity = await _db.ProfessionalBodies.FindAsync(id);
        if (entity is null)
        {
            return NotFound();
        }
        if (string.IsNullOrWhiteSpace(dto.InstitutionName))
        {
            return BadRequest("Institution name is required.");
        }

        var duplicate = await _db.ProfessionalBodies.AnyAsync(p => p.InstitutionName == dto.InstitutionName && p.Id != id);
        if (duplicate)
        {
            return Conflict("Institution already exists.");
        }

        entity.InstitutionName = dto.InstitutionName.Trim();
        entity.Acronym = dto.Acronym?.Trim() ?? string.Empty;
        entity.Award = dto.Award?.Trim() ?? string.Empty;
        entity.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(entity);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _db.ProfessionalBodies.FindAsync(id);
        if (entity is null)
        {
            return NotFound();
        }

        _db.ProfessionalBodies.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
