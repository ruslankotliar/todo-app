/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { Box, Tab } from '@mui/material';

export const CustomBoxLayout = styled(Box)(({ theme }) => ({
  width: '100%',
  alignSelf: 'flex-start',

  margin: `${theme.spaces.l7} 0`,
  [theme.breakpoints.down('sm')]: {
    margin: `${theme.spaces.l5} 0`,
    paddingBottom: theme.spaces.l3
  }
}));

export const CustomBoxHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('sm')]: {
    margin: `0 ${theme.spaces.l4}`,
    justifyContent: 'space-between'
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: `0 ${theme.spaces.l}`
  }
}));

export const CustomTab = styled(Tab)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  minWidth: theme.spaces.l4,
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spaces.l} ${theme.spaces.xs}`
  },
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spaces.l} 0`
  }
}));
