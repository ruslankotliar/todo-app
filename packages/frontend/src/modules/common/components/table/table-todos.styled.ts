/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { Box, Button, Paper, TableCell, Typography } from '@mui/material';

export const CustomPaper = styled(Paper)(({ theme }) => ({
  margin: 'auto',
  width: '90vw'
}));

export const CustomTableCell = styled(TableCell)(({ theme }) => ({
  wordBreak: 'break-all',
  maxWidth: '40rem'
}));

export const CustomDeleteButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    color: 'red'
  }
}));

export const CustomEditButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    color: 'secondary'
  }
}));

export const CustomViewButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    color: 'info'
  }
}));

export const CustomTableHeaderCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    fontWeight: theme.fonts.weights.bold
  }
}));

export const CustomTypography = styled(Typography)(({ theme }) => ({
  wordBreak: 'break-all',
  minHeight: '15rem',
  [theme.breakpoints.down('md')]: {
    minHeight: '1rem'
  }
}));

export const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: '1rem',
  width: '60%',
  justifyContent: 'space-between'
}));

export const CustomBoxMobile = styled(Box)(({ theme }) => ({
  marginTop: '1rem'
}));
