using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FizikUm.Models
{
    public class Classroom
    {
        [Key]
        public int ClassroomId { get; set; }
        public string Name { get; set; }

        [ForeignKey("SubjectCategory")]
        public int SubjectCategoryId { get; set; }
        public SubjectCategory SubjectCategory { get; set; }

        public ICollection<Resource> Resources { get; set; }
    }
}
