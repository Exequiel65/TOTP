import axios from '../Config/Axios';

async function GetCode(email: string) {
    try {
        var response = await axios.post(`/api/TOTP/GenerateToken`, { email });
        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
}

async function ValidateCode(data: any) {
    try {
        var response = await axios.post(`/api/TOTP/ValidateToken`, { Token: data.Token, Email: data.Email });
        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
}

async function GenerateKey(email: string) {
    try {
        var response = await axios.get(`/api/TOTP/get-key-2FA?email=${email}`);
        // var response = await axios.get(`/api/TOTP/get-otp-auth-google?aditional=pr=${email}`);
        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
}


export {
    GetCode,
    ValidateCode,
    GenerateKey
}