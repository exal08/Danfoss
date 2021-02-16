using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Danfoss.RequestClass
{
    public class MeterValueByHomeReqyest
    {
        public int homeId { get; set; }
        public double value { get; set; }
    }
}
