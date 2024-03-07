using Microsoft.Extensions.Configuration;
using OtpNet;
using System.Text;
using TOTP.Application.Interface;

namespace TOTP.Application.Application
{
    public class CodeTOTP : ICodeTOTP
    {
        private readonly IConfiguration _configuration;

        public CodeTOTP(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string CompartKey2FA(string email)
        {
            var secretServer = _configuration.GetSection("Config:Secret2FAApp").Value;
            return $"{secretServer}:{email}";
        }

        public string GenerateCode(string email)
        {
            var totp = GeneratorTotp(email);

            // Genera el código TOTP basado en la hora actual (puede personalizar esto según tus necesidades)
            var token = totp.ComputeTotp();

            return token;
        }

        public bool ValidateCode(string code, string email)
        {
            var totp = GeneratorTotp(email);


            // Validar que el token proporcionado por el usuario coincide con el generado por el servidor
            bool isValid = totp.VerifyTotp(code, out long timeStepMatched);
            var s = timeStepMatched;
            return isValid;
        }

        private Totp GeneratorTotp(string email)
        {
            // La clave secreta del servidor (clave privada)
            var secretServer = _configuration.GetSection("Config:Secret2FAApp").Value;

            // Convierte las claves secretas en bytes
            byte[] serverSecretKey = Encoding.UTF8.GetBytes($"{secretServer}:{email}");

            // Crea un generador de código TOTP utilizando las claves secretas
            var totpUser = new Totp(serverSecretKey, 30, OtpHashMode.Sha256, 6, new TimeCorrection(DateTime.UtcNow));

            return totpUser;
        }
    }
}
