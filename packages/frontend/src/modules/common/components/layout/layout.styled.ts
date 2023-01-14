/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppBar, Box, Button } from '@mui/material';
import styled from 'styled-components';

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.colors.white
}));

export const CustomMain = styled('main')((): any => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100vw'
}));

export const CustomButton = styled(Button)(({ theme }): any => ({
  width: theme.spaces.l7,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spaces.s} ${theme.spaces.xs}`
  }
}));

export const CustomBoxLogIn = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100vw'
}));

export const CustomBoxHome = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
}));
