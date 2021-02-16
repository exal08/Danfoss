using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Danfoss.Model;
using Danfoss.DBContext;
using Microsoft.EntityFrameworkCore;

namespace Danfoss.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class MeterController : ControllerBase
    {
        private readonly MsSqlContext dbContext;

        public MeterController(MsSqlContext context)
        {
            dbContext = context;
        }
        [HttpGet]
        
        public async Task<List<Meter>> Get(int homeID)
        {
            return await dbContext.Meters.Where(x => x.HomeId == homeID).OrderByDescending(x => x.DateStart).ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Meter meter)
        {
            DateTime date = DateTime.Now;
            await dbContext.Meters.Where(x => x.DateEnd == null && x.HomeId == meter.HomeId).ForEachAsync(f => { f.DateEnd = date; dbContext.Meters.Update(f); });

            meter.MeterReading = new List<MeterReading> { new MeterReading { MeterId = meter.Id, Value = 0 } };
            dbContext.Meters.Add(meter);

            await dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
