using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
﻿using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Category
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
