import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import './App.css'
import GetToken from './TOTP/Components/GetToken';
import ValidateToken from './TOTP/Components/ValidateToken';
import React, { useState } from 'react';
import GenerateQR from './TOTP/Components/GenerateQR';
import TOTPGenerator from './TOTP/Components/TOTPGenerator';


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
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  return (
    <>
      <Container style={{ maxWidth: '100vw', padding: 0 }}>
        <h2>Token 2FA TOTP</h2>
        <Box
          sx={{ flexGrow: 1, bgcolor: '#7777771f', display: 'flex', height: '85vh' }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', bgcolor: '#0f0f0f1f' }}
          >
            <Tab label="Generar Token API" {...a11yProps(0)} sx={{ color: 'white' }} />
            <Tab label="Valdidar Token" {...a11yProps(1)} sx={{ color: 'white' }} />
            <Tab label="Agregar a App" {...a11yProps(2)} sx={{ color: 'white' }} />
            <Tab label="Generar Token App" {...a11yProps(2)} sx={{ color: 'white' }} />

          </Tabs>
          <Box sx={{width:'100%'}}>
            <TabPanel value={value} index={0}>
              <GetToken />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ValidateToken />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <GenerateQR />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <TOTPGenerator />
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default App


