using Microsoft.AspNetCore.Mvc;
using TOTP.Application.Interface;
using TOTP.Dtos;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TOTPController : ControllerBase
    {
        private readonly ICodeTOTP _codeTOTP;

        public TOTPController(ICodeTOTP codeTOTP)
        {
            _codeTOTP = codeTOTP;
        }

        [HttpPost("GenerateToken")]
        public IActionResult GenerateToken([FromBody] TOTPGenerateWriteDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = _codeTOTP.GenerateCode(model.Email);

            if (string.IsNullOrEmpty(result)) return BadRequest("Token Error");

            return Ok(result);
        }

        [HttpPost("ValidateToken")]
        public IActionResult GenerateToken([FromBody] TOTPValidateDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = _codeTOTP.ValidateCode(model.Token, model.Email);

            if (!result) return BadRequest("Token Error");

            return Ok(result);
        }

        [HttpGet("get-key-2FA")]
        public IActionResult GetKey([FromQuery] string email)
        {
            var result = _codeTOTP.CompartKey2FA(email);
            return Ok(result);
        }
    }
}
