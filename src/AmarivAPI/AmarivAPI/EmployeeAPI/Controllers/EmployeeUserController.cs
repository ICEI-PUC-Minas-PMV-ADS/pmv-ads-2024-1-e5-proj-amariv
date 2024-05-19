using AmarivAPI.EmployeeAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.EmployeeAPI.Controllers
{
    [ApiController]
    public class EmployeeUserController : Controller
    {
        private UserService _userService;

        public EmployeeUserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("Emp/UserInfo")]
        [Authorize(Roles = "funcionario")]
        public async Task<IActionResult> Index()
        {
            var userInfo = await _userService.GetUserInfo(User);
            if (userInfo == null)
            {
                return NotFound("User information not found!");
            }
            return new JsonResult(new {
                Name = userInfo.Nome,
            });
        }
    }
}
