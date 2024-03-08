import { AppBar, Box, Container, Tab, Tabs, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views'
import './App.css'
import GetToken from './TOTP/Components/GetToken';
import ValidateToken from './TOTP/Components/ValidateToken';
import React, { useState } from 'react';
import GenerateQR from './TOTP/Components/GenerateQR';


interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function App() {

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <>
      <Container style={{ maxWidth: '100vw', padding: 0 }}>
        <h2>Token 2FA TOTP</h2>
        <Box sx={{ bgcolor: '#50505046', width: '100%' }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              sx={{ backgroundColor: 'gray' }}
            >
              <Tab label="Generar y Validar" {...a11yProps(0)} />
              <Tab label="Agregar a App Authenticator" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Box sx={{ width: '100%' }} alignItems={'center'} justifyContent={'center'} display={'flex'} flexDirection={'column'}>
                <GetToken />
                <ValidateToken />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <GenerateQR />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Container>
    </>
  )
}

export default App


