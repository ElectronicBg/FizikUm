using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FizikUm.Models
{
    public class Resource
    {
        [Key]
        public int ResourceId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public SubjectCategory SubjectCategory { get; set; }

        [ForeignKey("Classroom")]
        public int ClassroomId { get; set; }
        public Classroom Classroom { get; set; }

        public string Code { get; set; }
    }
}
