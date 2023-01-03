/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import styled from 'styled-components';

export const CustomPaper = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    margin: theme.spaces.l5,
    padding: `${theme.spaces.l2} ${theme.spaces.l5}`,
    width: '90vw'
  },
  [theme.breakpoints.down('md')]: {
    margin: theme.spaces.l2,
    padding: `${theme.spaces.l} ${theme.spaces.l3}`,
    width: '90vw'
  },
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    padding: `${theme.spaces.s} ${theme.spaces.l}`,
    width: '90vw'
  }
}));

export const CustomTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    fontSize: theme.spaces.l5
  },
  [theme.breakpoints.down('md')]: {
    fontSize: theme.spaces.l3
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spaces.l2
  }
}));

export const CustomTypographyBody = styled(Typography)(({ theme }) => ({
  minHeight: theme.spaces.l10,
  border: '1px solid black',
  lineHeight: theme.spaces.l,
  wordBreak: 'break-all',
  padding: `${theme.spaces.s} ${theme.spaces.l}`,
  marginBottom: theme.spaces.l
}));

export const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

export const CustomGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end'
}));
