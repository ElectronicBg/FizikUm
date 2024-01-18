using FizikUm.Data;
using FizikUm.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class SubjectCategoryController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SubjectCategoryController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/SubjectCategory
    [HttpGet("api/GetSubjectCategory")]
    public async Task<ActionResult<IEnumerable<SubjectCategory>>> GetSubjectCategories()
    {
        return await _context.SubjectCategories.ToListAsync();
    }

    // GET: api/SubjectCategory/5
    [HttpGet("api/GetSubjectCategory/{id}")]
    public async Task<ActionResult<SubjectCategory>> GetSubjectCategory(int id)
    {
        var subjectCategory = await _context.SubjectCategories.FindAsync(id);

        if (subjectCategory == null)
        {
            return NotFound();
        }

        return subjectCategory;
    }

    // POST: api/SubjectCategory
    [HttpPost("api/PostSubjectCategory")]
    public async Task<ActionResult<SubjectCategory>> PostSubjectCategory(SubjectCategory subjectCategory)
    {
        _context.SubjectCategories.Add(subjectCategory);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSubjectCategory), new { id = subjectCategory.SubjectCategoryId }, subjectCategory);
    }

    // PUT: api/SubjectCategory/5
    [HttpPut("api/PutSubjectCategory/{id}")]
    public async Task<IActionResult> PutSubjectCategory(int id, SubjectCategory subjectCategory)
    {
        if (id != subjectCategory.SubjectCategoryId)
        {
            return BadRequest();
        }

        _context.Entry(subjectCategory).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SubjectCategoryExists(id))
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

    private bool SubjectCategoryExists(int id)
    {
        return _context.SubjectCategories.Any(e => e.SubjectCategoryId == id);
    }
}
