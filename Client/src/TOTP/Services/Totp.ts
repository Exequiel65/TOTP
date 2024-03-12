import axios from '../Config/Axios';

async function GetCode() {
    try {
        var response = await axios.get(`/api/TOTP/GenerateToken`);
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

async function GenerateKey() {
    try {
        var response = await axios.get(`/api/TOTP/get-key-2FA`);
        // var response = await axios.get(`/api/TOTP/get-otp-auth-google?aditional=pr=${email}`);
        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
}

async function GetKey() {
    try {
        var response = await axios.get(`/api/TOTP/get-key`);
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
    GenerateKey,
    GetKey
}