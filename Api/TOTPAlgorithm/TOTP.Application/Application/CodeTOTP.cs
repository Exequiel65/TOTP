using Microsoft.Extensions.Configuration;
using OtpNet;
using TOTP.Application.Interface;
using TOTP.Dtos;

namespace TOTP.Application.Application
{
    public class CodeTOTP : ICodeTOTP
    {
        private readonly IConfiguration _configuration;

        public CodeTOTP(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Compart2FAResponse CompartKey2FA()
        {
            var secretServer = _configuration.GetSection("Config:Secret2FAApp").Value;

            var uri = new OtpUri(OtpType.Totp, secretServer, "test2@gmail.com", "Test to2",digits:6, period: 30);
            
            return new Compart2FAResponse{
                Url = uri.ToString(),
                secret = secretServer
            };
        }

        public string GetKey()
        {
            var secretServer = _configuration.GetSection("Config:Secret2FAApp").Value;
            return secretServer;
        }

        public string GenerateCode()
        {
            var totp = GeneratorTotp();

            // Genera el código TOTP basado en la hora actual (puede personalizar esto según tus necesidades)
            var token = totp.ComputeTotp();

            return token;
        }

        public bool ValidateCode(string code)
        {
            var totp = GeneratorTotp();


            // Validar que el token proporcionado por el usuario coincide con el generado por el servidor
            bool isValid = totp.VerifyTotp(code, out long timeStepMatched);
            var s = timeStepMatched;
            return isValid;
        }

        private Totp GeneratorTotp()
        {
            // La clave secreta del servidor (clave privada)
            var secretServer = _configuration.GetSection("Config:Secret2FAApp").Value;

            // Convierte las claves secretas en bytes
            //byte[] serverSecretKey = Base32Encoding.ToBytes($"{secretServer}{email}");
            byte[] serverSecretKey = Base32Encoding.ToBytes(secretServer);

            // Crea un generador de código TOTP utilizando las claves secretas
            //var totpUser = new Totp(serverSecretKey, 30, OtpHashMode.Sha256, 6, new TimeCorrection(DateUser("Argentina Standard Time")));
            // Se da una correccion de 10s 
            var totpUser = new Totp(serverSecretKey, 30,totpSize:6, timeCorrection: new TimeCorrection(DateTime.UtcNow.AddSeconds(10)));

            return totpUser;
        }

        private DateTime DateUser(string zoneTime)
        {
            TimeZoneInfo TimeZone = TimeZoneInfo.FindSystemTimeZoneById(zoneTime);

            DateTime horaUTC = DateTime.UtcNow;
            DateTime Date = TimeZoneInfo.ConvertTimeFromUtc(horaUTC, TimeZone);

            return Date;
        }
    }
}
