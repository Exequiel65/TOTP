import axios from '../Config/Axios';

async function GetTokena() {
    try {

        var response = await axios.get('/venues');
        return response.data;
    } catch (error) {
        console.log(error)
        return null;
    }

}


async function GetToken(email : string) {
    try {
        var response = await axios.post(`/api/TOTP/GenerateToken`, {email});
        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
}



export {
    GetToken
}