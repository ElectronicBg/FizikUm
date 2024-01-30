using FizikUm.Data;
using FizikUm.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("[controller]")]
[ApiController]
public class ResourceController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ResourceController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Resource
    [HttpGet("api/GetResources")]
    public async Task<ActionResult<IEnumerable<Resource>>> GetResources()
    {
        return await _context.Resources.ToListAsync();
    }

    // GET: api/Resource/5
    [HttpGet("api/GetResource/{id}")]
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
    [HttpPost("api/PostResource")]
    public async Task<ActionResult<Resource>> PostResource(Resource resource)
    {
        _context.Resources.Add(resource);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetResource), new { id = resource.Id }, resource);
    }

    // PUT: api/Resource/5
    [HttpPut("api/PutResource/{id}")]
    public async Task<IActionResult> PutResource(int id, Resource resource)
    {
        if (id != resource.Id)
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
    [HttpDelete("api/DeleteResource/{id}")]
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
    
    //CLASSROOM: api/GetResourcesForClassroom/5
    [HttpGet("api/GetResourcesForClassroom/{id}")]
    public async Task<ActionResult<IEnumerable<Resource>>> GetResourcesForClassroom(int id)
    {
        var resources = await _context.Resources
            .Where(r => r.ClassroomId == id)
            .ToListAsync();

        if (resources == null || resources.Count == 0)
        {
            return NotFound();
        }

        return resources;
    }


    private bool ResourceExists(int id)
    {
        return _context.Resources.Any(e => e.Id == id);
    }
}
