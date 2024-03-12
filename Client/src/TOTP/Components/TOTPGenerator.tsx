import { useState } from 'react';
import * as OTPAuth from 'otpauth';
import { Box, Button } from '@mui/material';

function TOTPGenerator() {
    const [token, setToken] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [secret, setSecret] = useState('');

    const handleClick = async () => {
        const secretFromServer = await fetchSecretFromServer();
        setSecret(secretFromServer);
        generateToken();
        updateTimeRemaining();
    };
    
    const fetchSecretFromServer = () => {
        return Promise.resolve('claveSecreta');
    };

    const generateToken = () => {
        const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromBase32(secret)
        });

        const newToken = totp.generate();
        setToken(newToken);
    };

    const updateTimeRemaining = () => {
        const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromBase32(secret),
            period: 30 
        });

        const currentTime = Math.floor(Date.now() / 1000);
        const remaining = totp.period - (currentTime % totp.period);
        setTimeRemaining(remaining);
    };

    return (
        <Box>
            <p>Esta vista genera el token con la clave secreta del servidor usando la libreria OtpAuth</p>
            <Button onClick={handleClick}>Generar Token</Button>
            {token && timeRemaining > 0 && (
                <div>
                    <p>Token: {token}</p>
                    <p>Tiempo restante: {timeRemaining} segundos</p>
                </div>
            )}
        </Box>
    );
}

export default TOTPGenerator;