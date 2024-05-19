using AmarivAPI.EmployeeAPI.Data.DTOs;
using AmarivAPI.EmployeeAPI.Services;
using FluentResults;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.employee_api.Controllers
{
    [Route("Emp/SignIn")]
    [ApiController]
    public class EmployeeSignInController : Controller
    {
        private UserService _userService;

        public EmployeeSignInController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Index(SignInDTO signInDTO)
        {
            try
            {
                Task<Result<object>> result = _userService.SignInAsync(signInDTO);
                if (result.Result.IsFailed)
                {
                    return Unauthorized(new
                    {
                        message = result.Result.Errors[0].Message
                    });
                }
                return Ok(result.Result.Value);
            }
            catch (Exception)
            {
                return Unauthorized(new
                {
                    message = "Falha em nossos servidores, tente novamente mais tarde!"
                });
            }
        }
    }
}
