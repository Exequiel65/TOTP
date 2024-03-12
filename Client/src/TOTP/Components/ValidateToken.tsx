import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ValidateCode } from '../Services/Totp'

function ValidateToken() {

    const [ValidateToken, setValidateToken] = useState({
        Token: ""
    })

    const [IsValid, setIsValid] = useState("")

    const handleChangeToken = (event: React.ChangeEvent<HTMLInputElement>) => {
        var data = ValidateToken;
        data.Token = event.target.value;
        setValidateToken(data);
    }

    const handleClick = async () => {
        var result = await ValidateCode(ValidateToken);
        setIsValid(result?.data === true ? "Es valido" : "No es valido");
    }

    useEffect(() => {

    }, [IsValid])
    return (
        <Box>
            <h5>Verificar Token</h5>
            <Box>
                <p>Ingrese el token a validar, puede haber unos segundos de diferencia al validar</p>
                <br />
                <TextField onChange={handleChangeToken} style={{ backgroundColor: 'white', borderRadius: 7 }} id="Token" label="Token" variant="filled" placeholder='example@example.com'></TextField>
                <p>Resutlado: {IsValid} </p>
                <Button onClick={handleClick}>Validar</Button>
            </Box>
        </Box>
    )
}

export default ValidateToken