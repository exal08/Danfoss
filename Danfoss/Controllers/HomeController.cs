using Danfoss.DBContext;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Danfoss.Model;
using Microsoft.EntityFrameworkCore;

namespace Danfoss.Controllers
{
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly MsSqlContext dbContext;

        public HomeController(MsSqlContext context)
        {
            dbContext = context;
        }

        [HttpGet]
        [Route("api/[controller]/getAllHome")]
        public async Task<List<Home>> Get()
        {
            return await dbContext.Homes.OrderBy(x => x.Address).ToListAsync();
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        public async Task<Home> Get(int id)
        {
            return await dbContext.Homes.FirstOrDefaultAsync(x => x.Id == id);
        }

        [HttpDelete("{id}")]
        [Route("api/[controller]/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Home home = await dbContext.Homes.FirstOrDefaultAsync(x => x.Id == id);
            if (home is null)
                return NotFound();
            dbContext.Homes.Remove(home);
            await dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("api/[controller]")]
        public async Task<IActionResult> Post(Home home)
        {
            dbContext.Homes.Add(home);
            await dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        [Route("api/[controller]")]
        public async Task<IActionResult> Put(Home home)
        {
            dbContext.Homes.Update(home);
            await dbContext.SaveChangesAsync();
            return Ok();
        }
        private class MeterValue
        {
            public int HomeId { get; set; }
            public double SumValue { get; set; }
        }
        private async Task<IEnumerable<MeterValue>> GetMetersReadingsData()
        {
            return (await dbContext.Meters.Include(i => i.MeterReading).ToListAsync())
                .GroupBy(r => r.HomeId)
                .Select(s => new MeterValue
                {
                    HomeId = s.Key,
                    SumValue = s.SelectMany(x => x.MeterReading)
                    .GroupBy(r => r.MeterId)
                    .Select(s => new { s.Key, Value = s.Max(x => x.Value) })
                    .Sum(sum => sum.Value)
                });
        }

        [HttpGet]
        [Route("api/[controller]/GetMaxValueHome")]
        public async Task<Home> GetMaxValueHome()
        {
            var homeId = (await GetMetersReadingsData()).OrderByDescending(x => x.SumValue).FirstOrDefault().HomeId;
            Home home = await dbContext.Homes.FirstOrDefaultAsync(x => x.Id == homeId);

            return new Home { Id = home.Id, Address = home.Address };
        }

        [HttpGet]
        [Route("api/[controller]/GetMinValueHome")]
        public async Task<Home> GetMinValueHome()
        {
            var homeId = (await GetMetersReadingsData()).OrderBy(x => x.SumValue).FirstOrDefault().HomeId;
            Home home = await dbContext.Homes.FirstOrDefaultAsync(x => x.Id == homeId);

            return new Home { Id = home.Id, Address = home.Address };
        }

    }
}
