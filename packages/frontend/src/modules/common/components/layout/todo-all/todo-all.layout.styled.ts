/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { Box, Button, Container, FormControl, Tab } from '@mui/material';

export const CustomBoxLayout = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 'none',

  margin: `${theme.spaces.l7} 0`,
  [theme.breakpoints.down('md')]: {
    maxWidth: 'none',
    margin: `${theme.spaces.l5} 0`,
    paddingBottom: theme.spaces.l3
  }
}));

export const CustomBoxHeader = styled(Box)(({ theme }) => ({
  maxWidth: 'none',
  display: 'flex',
  [theme.breakpoints.up('sm')]: {
    maxWidth: 'none',
    margin: `0 ${theme.spaces.l4}`,
    justifyContent: 'space-between'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 'none',
    flexDirection: 'column',
    padding: `0 ${theme.spaces.l}`
  }
}));

export const CustomTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spaces.l} ${theme.spaces.xs}`
  },
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spaces.l} 0`
  }
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  marginLeft: `${theme.spaces.l}`
}));

export const CustomContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  padding: 0
}));

export const CustomFormControl = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}));

export const CustomForm = styled('form')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
