using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Post
    {
        public int Id { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(255)]
        public string Title { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(2000)]
        public string Content { get; set; }
        [MaxLength(255)]
        public string ImageLocation { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime? PublishDateTime { get; set; }
        [Required]
        public bool IsApproved { get; set; }
        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public List<Tag> Tags { get; set; }
        public bool IsCurrentUserAuthor { get; set; }
    }
}
