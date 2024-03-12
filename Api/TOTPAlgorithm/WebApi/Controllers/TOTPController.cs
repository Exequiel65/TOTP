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
        private readonly ICodeGoogleTOTP _codeGoogleTOTP;

        public TOTPController(ICodeGoogleTOTP codeGoogleTOTP, ICodeTOTP codeTOTP)
        {
            _codeTOTP = codeTOTP;
            _codeGoogleTOTP = codeGoogleTOTP;
        }

        [HttpGet("GenerateToken")]
        public IActionResult GenerateToken()
        {
            var result = _codeTOTP.GenerateCode();

            if (string.IsNullOrEmpty(result)) return BadRequest("Token Error");

            return Ok(result);
        }

        [HttpPost("ValidateToken")]
        public IActionResult ValidateToken([FromBody] TOTPValidateDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = _codeTOTP.ValidateCode(model.Token);

            if (!result) return BadRequest("Token Error");

            return Ok(result);
        }

        [HttpGet("get-key-2FA")]
        public IActionResult GetKey2FA()
        {
            var result = _codeTOTP.CompartKey2FA();
            return Ok(result);
        }
        [HttpGet("get-key")]
        public IActionResult GetKey()
        {
            var result = _codeTOTP.GetKey();
            return Ok(result);
        }

        [HttpGet("get-otp-auth-google")]
        public IActionResult GenerateUrl([FromQuery] string aditional)
        {
            var result = _codeGoogleTOTP.GenerateUrl();
            return Ok(result);
        }
        
        [HttpGet("validate-code-google")]
        public IActionResult ValidateCodeGoogle([FromQuery] string code)
        {
            var result = _codeGoogleTOTP.Validate(code);
            return Ok(result);
        }
    }
}
