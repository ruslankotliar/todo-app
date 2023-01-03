/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import styled from 'styled-components';

export const CustomPaper = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    margin: '5rem',
    padding: '2rem 5rem',
    width: '90vw'
  },
  [theme.breakpoints.down('md')]: {
    margin: '2rem',
    padding: '1rem 2.5rem',
    width: '90vw'
  },
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    padding: '0.5rem 1rem',
    width: '90vw'
  }
}));

export const CustomTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    fontSize: '5rem'
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem'
  }
}));

export const CustomTypographyBody = styled(Typography)(({ theme }) => ({
  minHeight: '10rem',
  border: '1px solid black',
  lineHeight: theme.spaces.l,
  wordBreak: 'break-all',
  padding: '0.5rem 1rem',
  marginBottom: '1rem'
}));

export const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

export const CustomGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end'
}));
