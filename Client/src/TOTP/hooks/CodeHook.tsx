import { useState, useEffect } from 'react';
import OTPAuth from 'otpauth';

export const useCodeHook = () => {
    const [code, setCode] = useState("");
    const [secret, setSecret] = useState("");

    useEffect(() => {
        if (secret !== "") {
            generateToken();
        }
    }, [secret]);

    useEffect(() => {
        const interval = setInterval(() => {
            generateToken();
        }, 30000);

        return () => clearInterval(interval);
    }, [secret]);

    const generateToken = () => {
        if (secret !== "") {
            let totp = new OTPAuth.TOTP({
                issuer: "Test",
                label: "TestTOP",
                algorithm: "SHA1",
                digits: 6,
                period: 30,
                secret: OTPAuth.Secret.fromBase32(secret)
            });

            let token = totp.generate();
            setCode(token);
        }
    }
    return {
        code,
        setSecret
    }
}

