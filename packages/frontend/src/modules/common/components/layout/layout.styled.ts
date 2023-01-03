/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppBar, Button, Toolbar } from '@mui/material';
import styled from 'styled-components';

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.colors.white
}));

export const CustomMain = styled('main')((): any => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh'
}));

export const CustomToolbar = styled(Toolbar)(({ theme }): any => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  width: theme.spaces.l7,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spaces.s} ${theme.spaces.xs}`
  }
}));
