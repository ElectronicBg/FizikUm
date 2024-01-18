using FizikUm.Data;
using FizikUm.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class ResourceController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ResourceController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Resource
    [HttpGet("аpi/GetResource")]
    public async Task<ActionResult<IEnumerable<Resource>>> GetResources()
    {
        return await _context.Resources.ToListAsync();
    }

    // GET: api/Resource/5
    [HttpGet("аpi/GetResource/{id}")]
    public async Task<ActionResult<Resource>> GetResource(int id)
    {
        var resource = await _context.Resources.FindAsync(id);

        if (resource == null)
        {
            return NotFound();
        }

        return resource;
    }

    // POST: api/Resource
    [HttpPost("аpi/PostResource")]
    public async Task<ActionResult<Resource>> PostResource(Resource resource)
    {
        _context.Resources.Add(resource);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetResource), new { id = resource.ResourceId }, resource);
    }

    // PUT: api/Resource/5
    [HttpPut("аpi/PutResource/{id}")]
    public async Task<IActionResult> PutResource(int id, Resource resource)
    {
        if (id != resource.ResourceId)
        {
            return BadRequest();
        }

        _context.Entry(resource).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ResourceExists(id))
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

    // DELETE: api/Resource/5
    [HttpDelete("аpi/DeleteResource{id}")]
    public async Task<IActionResult> DeleteResource(int id)
    {
        var resource = await _context.Resources.FindAsync(id);
        if (resource == null)
        {
            return NotFound();
        }

        _context.Resources.Remove(resource);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ResourceExists(int id)
    {
        return _context.Resources.Any(e => e.ResourceId == id);
    }
}
