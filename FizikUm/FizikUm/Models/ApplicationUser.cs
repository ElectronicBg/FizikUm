using Microsoft.AspNetCore.Identity;

namespace FizikUm.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Classroom> Classrooms { get; set; } 
    }
}