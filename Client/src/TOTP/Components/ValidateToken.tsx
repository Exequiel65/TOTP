import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ValidateCode } from '../Services/Totp'

function ValidateToken() {

    const [ValidateToken, setValidateToken] = useState({
        Token: "",
        Email: ""
    })

    const [IsValid, setIsValid] = useState("")
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        var data = ValidateToken;
        data.Email = event.target.value;
        setValidateToken(data);
    }

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
            <h6>Verificar Token</h6>
            <Box>
                <TextField onChange={handleChangeEmail} style={{ backgroundColor: 'white', borderRadius: 7 }} id="email" label="Email" variant="filled" placeholder='example@example.com'></TextField>
                <br />
                <TextField onChange={handleChangeToken} style={{ backgroundColor: 'white', borderRadius: 7 }} id="email" label="Token" variant="filled" placeholder='example@example.com'></TextField>
                <p>Resutlado: {IsValid} </p>
                <Button onClick={handleClick}>Validar</Button>
            </Box>
        </Box>
    )
}

export default ValidateToken