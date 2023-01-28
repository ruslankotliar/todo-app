import React, { useEffect, useState } from 'react';

import { Alert, Snackbar } from '@mui/material';
import { ISnackBar } from '../../../interfaces';

interface Props {
  snackBar: ISnackBar;
}

export const SnackBarComponent = ({ snackBar }: Props) => {
  const [open, setOpen] = useState<boolean>(snackBar.open);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    console.log('changed');
    setOpen(false);
    setOpen(snackBar.open);
  }, [snackBar]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={500}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={snackBar?.severity} sx={{ width: '100%' }}>
        {snackBar?.message}
      </Alert>
    </Snackbar>
  );
};
