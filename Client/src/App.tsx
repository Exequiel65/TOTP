import { Box, Container } from '@mui/material';
import './App.css'
import GetToken from './TOTP/Components/GetToken';
import ValidateToken from './TOTP/Components/ValidateToken';

function App() {

  
  
  return (
    <>
      <Container style={{ maxWidth: '100vw', padding: 0 }}>
        <h2>Token 2FA TOTP</h2>
        <Box sx={{width : '100%'}} alignItems={'center'} justifyContent={'center'} display={'flex'} flexDirection={'column'}>
          <GetToken />
         <ValidateToken />
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


