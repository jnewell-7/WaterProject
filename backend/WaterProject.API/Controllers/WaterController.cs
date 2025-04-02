using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;
        
        public WaterController(WaterDbContext temp)
        {
            _waterContext = temp;
        }

        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? projectTypes = null)
        {
            var query = _waterContext.Projects.AsQueryable();

            if (projectTypes != null &&  projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }
            
            var totalNumProjects = query.Count();

            
            string? favProjType = Request.Cookies["FavoriteProjectType"];
            Console.WriteLine("~~~~~COOKIE~~~~~\n" + favProjType);
            
            HttpContext.Response.Cookies.Append("FavoriteProjectType", "Protected Spring", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddMinutes(1),
            });
            
            var something =  query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();
            

            var someObject = new
            {
                Projects = something,
                TotalNumProjects = totalNumProjects
            };
            return Ok(someObject);
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes()
        {
            var projectTypes = _waterContext.Projects
                .Select(p => p.ProjectType)
                .Distinct()
                .ToList();
            
            return Ok(projectTypes);
            
        }

        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var something = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
            return something;
        }

        [HttpPost("AddProject")]
        public IActionResult AddProject([FromBody] Project newProject) {
            _waterContext.Projects.Add(newProject); // Add the new project to the DbContext
            _waterContext.SaveChanges(); // Save the changes to the database
            return Ok(newProject); // Return the newly added project as a response
        }


        [HttpPut("UpdateProject/{projectId}")] // Use HttpPut for updating a resource
        public IActionResult UpdateProject(int projectId, [FromBody] Project updatedProject)
        {
            // Find the existing project in the database
            var existingProject = _waterContext.Projects.Find(projectId);
           
            // Update the properties of the existing project
            existingProject.ProjectName = updatedProject.ProjectName;
            existingProject.ProjectType = updatedProject.ProjectType;
            existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram; // Update the regional program
            existingProject.ProjectImpact = updatedProject.ProjectImpact; // Update the impact
            existingProject.ProjectPhase = updatedProject.ProjectPhase; // Update the phase
            existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;

            _waterContext.Projects.Update(existingProject); // Save the changes to the database
            _waterContext.SaveChanges(); // Persist the changes to the database

            return Ok(existingProject); // Return the updated project
        }


        [HttpDelete("DeleteProject/{projectId}")] // Use HttpDelete for deleting a resource
        public IActionResult DeleteProject(int projectId)
        {
            // Find the project to delete
            var project = _waterContext.Projects.Find(projectId);
            if (project == null)
            {
                return NotFound(new {message = "Project not found."}); // Return 404 if the project doesn't exist);
            }

            _waterContext.Projects.Remove(project); // Remove the project from the DbContext
            _waterContext.SaveChanges(); // Save the changes to the database

            return NoContent(); // Return 204 No Content to indicate successful deletion

        }
    }
}
