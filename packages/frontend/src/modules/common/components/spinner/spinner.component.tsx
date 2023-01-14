import { CircularProgress } from '@mui/material';
import React from 'react';
import { CustomContainer } from './spinner.styled';

export const SpinnerComponent = () => (
  <CustomContainer>
    <CircularProgress />
  </CustomContainer>
);
