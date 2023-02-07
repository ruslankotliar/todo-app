import React from 'react';

import { Alert, AlertTitle, Button, CardMedia } from '@mui/material';

import { CustomContainer } from '../not-found/not-found.styled';

export const ErrorComponent = ({ error }: any) => (
  <CustomContainer>
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error?.message}. Reason: <strong>{error?.response?.data?.message || 'Unknown error'}</strong>
    </Alert>
    <CardMedia
      component="iframe"
      title="error 404"
      src="https://giphy.com/embed/H54feNXf6i4eAQubud"
      sx={{ my: '2rem', width: '20rem' }}
      allowFullScreen
    />
    <Button
      variant="contained"
      onClick={() => {
        window.location.reload();
      }}
    >
      Try again
    </Button>
  </CustomContainer>
);
