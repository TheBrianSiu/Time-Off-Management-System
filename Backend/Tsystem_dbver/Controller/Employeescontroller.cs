using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Tsystem_dbver.Models;

namespace Tsystem_dbver.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeContext _dbContext;

        public EmployeesController(EmployeeContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("api/EmployeeContext/get")]
        public async Task<ActionResult<IEnumerable<Employee>>> Getallemployee()
        {
            if (_dbContext.Employees == null)
            {
                return NotFound();
            }
            return _dbContext.Employees.ToArray();
        }

        [HttpPost]
        [Route("api/EmployeeContext/add")]
        [Consumes("application/json")]
        public async Task<ActionResult<Employee>> postemployee(Employee employee)
        {
            _dbContext.Employees.Add(employee);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Getallemployee), new { id = employee.id }, employee);
        }
    }
}

