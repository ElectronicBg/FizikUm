namespace FizikUm.Models.Roles
{
    public class Teacher : ApplicationUser
    {
        public string Title { get; set; } 
        public string Department { get; set; }
        public List<Subject> Subjects { get; set; } = new List<Subject>();

        public Teacher()
        {
            Subjects = new List<Subject>();
        }
    }
}
