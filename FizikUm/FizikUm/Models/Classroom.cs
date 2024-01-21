using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FizikUm.Models
{

    public class Classroom
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public Subject Subject { get; set; }
        public string Teacher { get; set; }
        public ICollection<ApplicationUser> Students { get; set; } 
        public ICollection<Resource> Resources { get; set; }
    }
}
