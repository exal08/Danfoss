using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Danfoss.RequestClass
{
    public class MeterValueBySerialNumber
    {
        public string serialNumber { get; set; }
        public double value { get; set; }
    }
}
