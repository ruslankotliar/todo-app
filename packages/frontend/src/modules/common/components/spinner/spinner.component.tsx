import React from 'react';

import { CircularProgress } from '@mui/material';
import { CustomContainer } from './spinner.styled';

export const SpinnerComponent = () => (
  <CustomContainer>
    <CircularProgress />
  </CustomContainer>
);
