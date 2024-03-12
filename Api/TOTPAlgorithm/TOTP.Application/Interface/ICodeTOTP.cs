using TOTP.Dtos;

namespace TOTP.Application.Interface
{
    public interface ICodeTOTP
    {
        string GenerateCode();
        bool ValidateCode(string code);
        Compart2FAResponse CompartKey2FA();
        string GetKey();
    }
}
