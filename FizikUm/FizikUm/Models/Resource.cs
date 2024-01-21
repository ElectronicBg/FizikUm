using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FizikUm.Models
{
    public class Resource
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public Classroom Classroom { get; set; }
        public ApplicationUser CreatedBy { get; set; }
    }
}
