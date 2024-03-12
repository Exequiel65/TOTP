import { useState, useEffect } from 'react';
import * as OTPAuth from "otpauth";

function useTOTP() {
    const [token, setToken] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [secret, setSecret] = useState("")
    useEffect(() => {
        if (secret !== "") {
            const interval = setInterval(() => {
                if (token === '') {
                    generateToken();
                    return () => clearInterval(interval);
                }
                // Calcula el tiempo restante para el nuevo token
                const remaining = calculateTimeRemaining();
                setTimeRemaining(remaining);
    
                // Si el tiempo restante es menor o igual a 0, genera un nuevo token
                if (remaining <= 0) {
                    generateToken();
                }
            }, 1000); // Actualiza cada segundo
            // Limpia el intervalo cuando el componente se desmonta 
            return () => clearInterval(interval);
        } 
    }, [secret, timeRemaining]);

    // Función para calcular el tiempo restante antes de que cambie el token
    function calculateTimeRemaining() {
        // debugger
        const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromBase32(secret),
            period: 30 // Período de 30 segundos para el token TOTP
        });

        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        const timeRemaining = totp.period - (currentTime % totp.period);

        return timeRemaining;
    }

    // Función para generar un nuevo token
    function generateToken() {
        const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromBase32(secret)
        });

        const newToken = totp.generate();
        setToken(newToken);
    }

    return { token, timeRemaining, setSecret };
}

export default useTOTP;

