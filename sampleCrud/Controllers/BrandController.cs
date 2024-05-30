using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sampleCrud.Models;

namespace sampleCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly BrandContext _brandContext;

        public BrandController(BrandContext brandContext)
        {
            _brandContext = brandContext;
        }


        [HttpGet]

        public async Task<ActionResult<IEnumerable<Brandixs>>> GetBrandix()
        {
            if(_brandContext.brandixs == null)
            {
                return NotFound();
            }
            
            return await _brandContext.brandixs.ToListAsync();

        }
        
        
        
        
        [HttpGet("{ID}")]

        public async Task<ActionResult<Brandixs>> GetBrand (int ID)
        {
            if(_brandContext.brandixs == null)
            {
                return NotFound();
            }

            var brandi = await _brandContext.brandixs.FindAsync(ID);

            if(brandi == null)
            {
                return NotFound();
            }

            return brandi;
        }

        [HttpPost]

        public async Task<ActionResult<Brandixs>> PostBrand(Brandixs brandis)
        {
            _brandContext.brandixs.Add(brandis);
            await _brandContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBrand), new { id = brandis.ID }, brandis );


        }

        [HttpPut("{ID}")]
        public async Task<ActionResult> PutBrand (int ID,Brandixs brandis)
        {
            if(ID != brandis.ID)
            {
                return BadRequest();
            }

            _brandContext.Entry(brandis).State = EntityState.Modified;
            
            try
            {
                await _brandContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok("Updated");
        }

        [HttpDelete("{ID}")]

        public async Task<ActionResult> deleteBrand(int ID)
        {
            if(_brandContext.brandixs == null)
            {
                return NotFound();
            }

            var brandi = await _brandContext.brandixs.FindAsync(ID);
            if(brandi == null)
            {
                return NotFound();
            }

            _brandContext.brandixs.Remove(brandi);
            await _brandContext.SaveChangesAsync();

            return Ok();

        }
    }
}
