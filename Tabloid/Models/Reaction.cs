using System.ComponentModel.DataAnnotations;
namespace Tabloid.Models
{
    public class Reaction
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }
        [Required]
        public string ImageLocation { get; set; }
    }
}
