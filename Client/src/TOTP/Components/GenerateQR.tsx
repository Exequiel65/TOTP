import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react';
import React from 'react';
import { GenerateKey } from '../Services/Totp';
import QRCode from 'react-qr-code';

function GenerateQR() {
    const [Email, setEmail] = useState("")
    const [Key, setKey] = useState()
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleClick = async ()=>{
        var response = await GenerateKey(Email);
        if (response?.data != null) {
            setKey(response.data)
            console.log(response.data)
        }   
    }
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={2}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                <p>Agrega un email al cual se le va a asociar el Token</p>
                <TextField onChange={handleChange} style={{ backgroundColor: 'white', borderRadius: 7 }} id="email" label="Email" variant="filled" placeholder='example@example.com' />
                <Button onClick={handleClick}>Generar QR</Button>
            </Box>
            <Box>
                { Key && (
                    <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "250", width: "100%" }}
                    value={Key}
                    viewBox={`0 0 256 256`}
                />
                )}

                {/* {Key && <img style={{ height: "auto", maxWidth: "250", width: "100%" }} src={Key} />} */}
                
            </Box>
        </Box>
    )
}

export default GenerateQR