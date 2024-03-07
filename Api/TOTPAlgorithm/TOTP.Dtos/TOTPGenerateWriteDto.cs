using System.ComponentModel.DataAnnotations;

namespace TOTP.Dtos
{
    public class TOTPGenerateWriteDto
    {
        [Required]
        public string Email { get; set; }
    }
}
