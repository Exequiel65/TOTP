namespace TOTP.Application.Interface
{
    public interface ICodeGoogleTOTP
    {
        string GenerateUrl();
        bool Validate(string code);
    }
}
