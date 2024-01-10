using System.ComponentModel.DataAnnotations;

namespace FizikUm.Models
{
    public class SubjectCategory
    {
        [Key]
        public int SubjectCategoryId { get; set; }

        public string Name { get; set; }

    }
}