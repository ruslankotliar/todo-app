import { Button, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { CustomContainer } from './not-found.styled';

export const NotFoundComponent = () => (
  <CustomContainer>
    <CardMedia
      component="iframe"
      title="error 404"
      src="https://giphy.com/embed/H54feNXf6i4eAQubud"
      width="100%"
      height="100%"
      allowFullScreen
    />
    <Typography variant="h1">Error 404</Typography>
    <Button variant="contained" href="/">
      Back Home
    </Button>
  </CustomContainer>
);
