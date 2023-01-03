/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { Box, Tab } from '@mui/material';

export const CustomBoxLayout = styled(Box)(({ theme }) => ({
  width: '100%',
  alignSelf: 'flex-start',
  margin: '7.5rem 0',
  [theme.breakpoints.down('sm')]: {
    margin: '5rem 0',
    paddingBottom: '2.5rem'
  }
}));

export const CustomBoxHeader = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'space-between',
    width: '90%'
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1rem'
  }
}));

export const CustomTab = styled(Tab)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    padding: '1rem 0.25rem',
    minWidth: '4rem',
    margin: 'auto'
  },
  [theme.breakpoints.down('md')]: {
    padding: '1rem 0rem',
    minWidth: '4rem',
    margin: 'auto'
  }
}));
