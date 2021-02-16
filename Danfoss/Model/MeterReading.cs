using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Danfoss.Model
{
    public class MeterReading
    {
        public int Id { get; set; }
        public DateTime ReadingDate {get;set;}
        public double Value { get; set; }      
        public int MeterId { get; set; }
        [JsonIgnore]
        public Meter Meter { get; set; }
    }
}
