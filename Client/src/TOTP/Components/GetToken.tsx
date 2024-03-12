import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { GetCode } from '../Services/Totp';

function GetToken() {
    const [Token, setToken] = useState<string>("")

    const handleClick = async () => {
        var result = await GetCode();
        if (result != null) {
            setToken(result.data)
        }
    }

    useEffect(() => {
    }, [Token])
    
    return (
        <Box sx={{ width: '100%' }}>
            <h5>Pantalla para obtener el token TOTP desde el servidor este generara <br></br>un codigo con la clave secreta del servidor</h5>
            <Box>
                <Box>
                    <Button onClick={handleClick}>Obtener Token</Button>
                </Box>
                <p>Token: {Token}</p>
            </Box>
        </Box>
    )
}

export default GetToken