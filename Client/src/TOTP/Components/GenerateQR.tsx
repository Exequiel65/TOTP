import { Box, Button } from '@mui/material'
import { useState } from 'react';
import { GenerateKey} from '../Services/Totp';
import QRCode from 'react-qr-code';



function GenerateQR() {
    const [Key, setKey] = useState();
    const [secret, setSecretKey] = useState();
    const handleClick = async () => {
        var response = await GenerateKey();
        if (response?.data != null) {
            setKey(response.data.url)
            setSecretKey(response.data.secret)
            console.log(response.data)
        }
    }

    // const handleClick_secret = async () => {
    //     var response = await GetKey();
    //     if (response?.data != null) {
    //         setSecret(response.data)
    //     }
    // }
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={2}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                <Box style={{lineHeight:'1'}}>
                    <p>El siguiente boton genera un codigo Qr para agregar la 2FA a tu aplicación Authenticator</p>
                    <p>Para este caso se recomienda usar Microsoft Authenticator o Google Authenticator</p>
                </Box>
                <Button onClick={handleClick}>Generar QR</Button>
                {/* <Button onClick={handleClick_secret}>Generar CODE</Button> */}
            </Box>
            <Box>
                {Key && (
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "250", width: "100%" }}
                        value={Key}
                        viewBox={`0 0 256 256`}
                    />
                )}
                {Key && (<p>{secret}</p>) }
            </Box>
        </Box>
    )
}

export default GenerateQR