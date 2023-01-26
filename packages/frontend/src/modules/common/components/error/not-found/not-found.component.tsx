import { Button, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { CustomContainer } from './not-found.styled';

export const NotFoundComponent = () => (
  <CustomContainer>
    <Typography variant="h1">Error 404</Typography>
    <CardMedia
      component="iframe"
      title="error 404"
      src="https://giphy.com/embed/H54feNXf6i4eAQubud"
      sx={{ my: '2rem', width: '20rem' }}
      allowFullScreen
    />
    <Button variant="contained" href="/">
      Back Home
    </Button>
  </CustomContainer>
);
