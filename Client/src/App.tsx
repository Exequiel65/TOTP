import { Box, Container, TextField } from '@mui/material';
import './App.css'
import { useEffect, useState } from 'react';
import { GetToken } from './TOTP/Services/Totp';

function App() {

  const [email, setemail] = useState<string>("")
  const [Token, setToken] = useState<string>("")
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setemail(event.target.value);
  }

  const handleClick = async ()=>{
    var result = await GetToken(email);
    if (result != null) {
      setToken(result.data)
    }
  }


  useEffect(() => {
  }, [Token])
  
  return (
    <>
      <Container style={{ maxWidth: '100vw', padding: 0 }}>
        <h2>Token 2FA TOTP</h2>
        <Box sx={{width : '100%'}} alignItems={'center'} justifyContent={'center'} display={'flex'} flexDirection={'column'}>
          <Box sx={{width : '70%'}}>
            <h5>Obtener Token desde el servidor</h5>
            <Box>
              <TextField onChange={handleChange} style={{backgroundColor: 'white', borderRadius: 7}} id="email" label="Email" variant="filled" placeholder='example@example.com'></TextField>
              <Box>
                <button onClick={handleClick}>Obtener</button>
              </Box>
              <p>Token: </p>
            </Box>
          </Box>
          <Box>
            <h6>Verificar Token</h6>
            <Box>
              <TextField style={{backgroundColor: 'white', borderRadius: 7}} id="email" label="Email" variant="filled" placeholder='example@example.com'></TextField>
              <br />
              <TextField style={{backgroundColor: 'white', borderRadius: 7}} id="email" label="Token" variant="filled" placeholder='example@example.com'></TextField>
              <p>Resutlado: </p>
              <button>Validar</button>
            </Box>
          </Box>
          {/* <Box>
            <h6>Agregar Token a tu app Authenticator</h6>
          </Box>
          <Box>
            <h6>Agregar token a la app</h6>
          </Box> */}
        </Box>
      </Container>
    </>
  )
}

export default App
