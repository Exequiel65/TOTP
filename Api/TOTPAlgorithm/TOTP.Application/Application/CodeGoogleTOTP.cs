using Google.Authenticator;
using Microsoft.Extensions.Configuration;
using TOTP.Application.Interface;
using static System.Runtime.CompilerServices.RuntimeHelpers;

namespace TOTP.Application.Application
{
    public class CodeGoogleTOTP : ICodeGoogleTOTP
    {
        private readonly IConfiguration _configuration;

        public CodeGoogleTOTP(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string GenerateUrl()
        {
            string key = _configuration.GetSection("Config:Secret2FAApp").Value;

            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
            SetupCode setupInfo = tfa.GenerateSetupCode("Test Two Factor", "user@example.com", key, false, 3);
            var s = tfa.GeneratePINAtInterval(key, 30);
            var A = tfa.ToString();
            var D = tfa.GetCurrentPIN(key, true);
            
            string qrCodeImageUrl = setupInfo.QrCodeSetupImageUrl;
            string manualEntrySetupCode = setupInfo.ManualEntryKey;

            return qrCodeImageUrl;

        }

        public bool Validate(string code)
        {
            string key = _configuration.GetSection("Config:Secret2FAApp").Value;
            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
            return tfa.ValidateTwoFactorPIN(key, code, true);
        }
    }
}
