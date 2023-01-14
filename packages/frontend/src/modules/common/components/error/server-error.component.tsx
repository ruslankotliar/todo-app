import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

export const ErrorComponent = ({ error }: any) => (
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    {error?.message}. Reason: <strong>{error?.response?.data?.message || 'Unknown error'}</strong>
  </Alert>
);
