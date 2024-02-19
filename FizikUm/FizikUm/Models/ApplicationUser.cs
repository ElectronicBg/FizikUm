using Microsoft.AspNetCore.Identity;

namespace FizikUm.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public ICollection<Classroom> Classrooms { get; set; } 
    }
}