/* eslint-disable max-len */
import { Avatar, Container, Grid, Paper } from '@mui/material';
import styled from 'styled-components';

// export const CustomContainer = styled.div`
//     display: flex,
//     align-items: center,
//     justify-content: center,
//     max-width: 100vw,
//     height: 100vh,
//     background-image: url('https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80');
// `;

export const CustomContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'})`,
  position: 'relative',
  maxWidth: '100vw',
  height: '100vh',
  overflow: 'hidden',
  padding: 0,
  margin: 0,
  [theme.breakpoints.up('md')]: {},
  [theme.breakpoints.down('md')]: {},
  [theme.breakpoints.down('sm')]: {}
}));

export const CustomPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  display: 'flex',

  [theme.breakpoints.up('lg')]: {
    padding: `${theme.spaces.l3} ${theme.spaces.l5}`,
    width: '85%',
    height: '75%'
  },
  [theme.breakpoints.down('lg')]: {
    padding: `${theme.spaces.l2} ${theme.spaces.l4}`,
    width: '90%',
    height: '80%'
  },
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spaces.l} ${theme.spaces.l3}`,
    width: '95%',
    height: '80%',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export const CustomAvatar = styled(Avatar)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    height: 250,
    width: 250
  },
  [theme.breakpoints.down('lg')]: {
    height: 200,
    width: 200
  },
  [theme.breakpoints.down('md')]: {
    height: 150,
    width: 150
  }
}));

export const CustomGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    height: theme.spaces.l5,
    margin: `${theme.spaces.l5}`
  },
  [theme.breakpoints.down('lg')]: {
    height: theme.spaces.l3,
    margin: `${theme.spaces.l3}`
  }
}));
