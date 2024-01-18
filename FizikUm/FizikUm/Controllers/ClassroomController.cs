using FizikUm.Data;
using FizikUm.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("[controller]")]
[ApiController]
public class ClassroomController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ClassroomController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Classrooms
    [HttpGet("api/GetClassroom")]
    public async Task<ActionResult<IEnumerable<Classroom>>> GetClassrooms()
    {
        return await _context.Classrooms
            .Include(c => c.SubjectCategory) // Include related SubjectCategory
            .ToListAsync();
    }

    // GET: api/Classrooms/5
    [HttpGet("api/GetClassroom/{id}")]
    public async Task<ActionResult<Classroom>> GetClassroom(int id)
    {
        var classroom = await _context.Classrooms
            .Include(c => c.SubjectCategory)
            .FirstOrDefaultAsync(c => c.ClassroomId == id);

        if (classroom == null)
        {
            return NotFound();
        }

        return classroom;
    }

    // POST: api/Classrooms
    [HttpPost("api/PostClassroom")]
    public async Task<ActionResult<Classroom>> PostClassroom(Classroom classroom)
    {
        _context.Classrooms.Add(classroom);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetClassroom), new { id = classroom.ClassroomId }, classroom);
    }

    // PUT: api/Classrooms/5
    [HttpPut("api/PutClassroom/{id}")]
    public async Task<IActionResult> PutClassroom(int id, Classroom classroom)
    {
        if (id != classroom.ClassroomId)
        {
            return BadRequest();
        }

        _context.Entry(classroom).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ClassroomExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Classrooms/5
    [HttpDelete("api/DeleteClassroom/{id}")]
    public async Task<IActionResult> DeleteClassroom(int id)
    {
        var classroom = await _context.Classrooms.FindAsync(id);

        if (classroom == null)
        {
            return NotFound();
        }

        _context.Classrooms.Remove(classroom);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ClassroomExists(int id)
    {
        return _context.Classrooms.Any(e => e.ClassroomId == id);
    }
}
