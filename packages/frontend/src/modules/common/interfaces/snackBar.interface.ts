import { AlertColor } from '@mui/material';

export interface ISnackBar {
  message: string;
  severity: AlertColor;
  open: boolean;
}

export interface IAxiosResponse {
  message: string;
}
