using HrPortal.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HrPortal.Api.Controllers;

[ApiController]
[Route("grade-levels")]
public class GradeLevelsController : ControllerBase
{
    private readonly HrDbContext _db;
    public GradeLevelsController(HrDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _db.GradeLevels.AsNoTracking()
            .OrderBy(g => g.Ranking)
            .ToListAsync();
        return Ok(list);
    }

    public record CreateDto(string Name, decimal AnnualBasic, int Ranking);
    public record UpdateDto(string Name, decimal AnnualBasic, int Ranking);

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name))
        {
            return BadRequest("Name is required.");
        }

        var exists = await _db.GradeLevels.AnyAsync(g => g.Name == dto.Name);
        if (exists)
        {
            return Conflict("Grade level already exists.");
        }

        var entity = new GradeLevel
        {
            Name = dto.Name.Trim(),
            AnnualBasic = dto.AnnualBasic,
            Ranking = dto.Ranking,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        _db.GradeLevels.Add(entity);
        await _db.SaveChangesAsync();
        return Ok(entity);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateDto dto)
    {
        var entity = await _db.GradeLevels.FindAsync(id);
        if (entity is null)
        {
            return NotFound();
        }
        if (string.IsNullOrWhiteSpace(dto.Name))
        {
            return BadRequest("Name is required.");
        }

        var duplicate = await _db.GradeLevels.AnyAsync(g => g.Name == dto.Name && g.Id != id);
        if (duplicate)
        {
            return Conflict("Grade level already exists.");
        }

        entity.Name = dto.Name.Trim();
        entity.AnnualBasic = dto.AnnualBasic;
        entity.Ranking = dto.Ranking;
        entity.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(entity);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _db.GradeLevels.FindAsync(id);
        if (entity is null)
        {
            return NotFound();
        }

        _db.GradeLevels.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
