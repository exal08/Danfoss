using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Danfoss.Model
{
    [Index("Address", IsUnique = true)]
    public class Home
    {
        public int Id { get; set; }
        [Required]
        public string Address { get; set; }        
        public List<Meter> Meter { get; set; }
    }
}
