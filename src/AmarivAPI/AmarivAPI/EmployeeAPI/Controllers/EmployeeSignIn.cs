using AmarivAPI.EmployeeAPI.Data.DTOs;
using AmarivAPI.EmployeeAPI.Services;
using FluentResults;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.employee_api.Controllers
{
    [Route("Emp/SignIn")]
    [ApiController]
    public class EmployeeSignIn : Controller
    {
        private UserService _userService;

        public EmployeeSignIn(UserService userService)
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
            catch (Exception ex)
            {
                return Unauthorized(new
                {
                    message = "Falha em nossos servidores, tente novamente mais tarde!"
                });
            }
        }
    }
}
