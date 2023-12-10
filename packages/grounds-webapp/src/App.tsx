import React, { Fragment } from 'react';
import './App.css';
import { Container, Box, Stack } from '@mui/material';
import { ReactComponent as GroundsDaoLogo } from './assets/imgs/logo.svg';
const App: React.FC = () => {
  return (
    <Fragment>
      <Stack
        sx={{
          background: '#e0d6d4',
          '& svg': {
            transition: 'transform 0.2s ease-in-out',
          },
          '& svg:hover': {
            transform: 'scale(0.9)',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ height: '70vh', paddingTop: 5 }}>
            <Stack direction="row" alignItems="center">
              <GroundsDaoLogo height="40" />
            </Stack>
          </Box>
        </Container>
      </Stack>
    </Fragment>
  );
};

export default App;
