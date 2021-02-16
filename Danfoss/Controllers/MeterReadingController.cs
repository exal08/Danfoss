using Danfoss.DBContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Danfoss.Model;
using Microsoft.EntityFrameworkCore;
using Danfoss.RequestClass;

namespace Danfoss.Controllers
{
    [ApiController]       
    public class MeterReadingController : ControllerBase
    {
        private readonly MsSqlContext dbContext;

        public MeterReadingController(MsSqlContext context)
        {
            dbContext = context;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public async Task<List<MeterReading>> Get(int homeId)
        {
            Home home = await dbContext.Homes.Where(w => w.Id == homeId).Include(i => i.Meter.Where(w => w.DateEnd == null)).ThenInclude(Meter => Meter.MeterReading).FirstOrDefaultAsync();           
            return home?.Meter?.FirstOrDefault()?.MeterReading?.OrderByDescending(x => x.ReadingDate).ToList();
        }

        [HttpPost]
        [Route("api/[controller]/ByHome")]
        public async Task<IActionResult> Post(MeterValueByHomeReqyest request)
        {
            if (request.value < 0)
                return BadRequest();

            Home home = await dbContext.Homes.Where(x => x.Id == request.homeId).Include(i => i.Meter.Where(w => w.DateEnd == null)).FirstOrDefaultAsync();
            if (home is null)
                return NotFound();

            home.Meter.First().MeterReading.Add(new MeterReading { Value = request.value });
            await dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("api/[controller]/BySerialNumber")]
        public async Task<IActionResult> Post(MeterValueBySerialNumber request)
        {
            if (request.value < 0)
                return BadRequest();

            Meter meter = await dbContext.Meters.FirstOrDefaultAsync(x => x.SerialNumber == request.serialNumber);

            if (meter is null)            
                return NotFound();

            meter.MeterReading.Add(new MeterReading { Value = request.value });

            await dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
