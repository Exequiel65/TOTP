using System.ComponentModel.DataAnnotations;

namespace TOTP.Dtos
{
    public class TOTPValidateDto
    {
        [Required]
        public string Token { get; set; }
    }

}
