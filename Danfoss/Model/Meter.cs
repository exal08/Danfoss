using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Danfoss.Model
{
    public class Meter
    {
        public int Id { get; set; }
        [Required]
        public string SerialNumber { get; set; }       
        public DateTime DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public int HomeId { get; set; }
        public Home Home { get; set; }
        public List<MeterReading> MeterReading { get; set; } = new List<MeterReading>();
    }
}
