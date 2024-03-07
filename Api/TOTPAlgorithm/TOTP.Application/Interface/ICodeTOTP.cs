namespace TOTP.Application.Interface
{
    public interface ICodeTOTP
    {
        string GenerateCode(string email);
        bool ValidateCode(string code, string email);
        string CompartKey2FA(string email);
    }
}
