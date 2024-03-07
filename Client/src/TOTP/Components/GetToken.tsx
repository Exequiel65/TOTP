import { Box, TextField } from '@mui/material'
import { useEffect, useState } from 'react';
import { GetCode } from '../Services/Totp';

function GetToken() {
    const [email, setemail] = useState<string>("")
    const [Token, setToken] = useState<string>("")
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setemail(event.target.value);
    }

    const handleClick = async () => {
        var result = await GetCode(email);
        if (result != null) {
            setToken(result.data)
        }
    }

    useEffect(() => {
    }, [Token])
    
    return (
        <Box sx={{ width: '70%' }}>
            <h5>Obtener Token desde el servidor</h5>
            <Box>
                <TextField onChange={handleChange} style={{ backgroundColor: 'white', borderRadius: 7 }} id="email" label="Email" variant="filled" placeholder='example@example.com'></TextField>
                <Box>
                    <button onClick={handleClick}>Obtener</button>
                </Box>
                <p>Token: {Token}</p>
            </Box>
        </Box>
    )
}

export default GetToken