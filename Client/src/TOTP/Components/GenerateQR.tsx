import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import QRCode from "react-qr-code";

function GenerateQR() {
    const handleChange = () => {

    }
    var secret = 'ClaveSecreta:marcos97britos@gmail.com';
    var label = 'Test'
    return (
        <Box>
            <Box>
                <p>Agrega un email al cual se le va a asociar el Token</p>
                <TextField onChange={handleChange} style={{ backgroundColor: 'white', borderRadius: 7 }} id="email" label="Email" variant="filled" placeholder='example@example.com' />
                <Button>Generar QR</Button>
            </Box>
            <Box>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "250", width: "100%" }}
                    value={`otpauth://totp/${label}?secret=${secret}&algorithm=SHA256&digits=6&period=30`}
                    viewBox={`0 0 256 256`}
                />
            </Box>
        </Box>
    )
}

export default GenerateQR