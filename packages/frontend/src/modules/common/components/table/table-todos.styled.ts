/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { Box, Button, Paper, TableCell, Typography } from '@mui/material';

export const CustomPaper = styled(Paper)(({ theme }) => ({
  margin: `0 ${theme.spaces.l4}`
}));

export const CustomTableCellBig = styled(TableCell)(({ theme }) => ({
  wordBreak: 'break-all',
  width: theme.spaces.l30
}));

export const CustomTableCellMedium = styled(TableCell)(({ theme }) => ({
  wordBreak: 'break-all',
  width: theme.spaces.l10
}));

export const CustomTableCellSmall = styled(TableCell)(({ theme }) => ({
  width: theme.spaces.l5
}));

export const CustomDeleteButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    color: theme.colors.red
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

  minHeight: theme.spaces.l15,
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spaces.l
  }
}));

export const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',

  marginTop: theme.spaces.l,

  justifyContent: 'space-between'
}));

export const CustomBoxMobile = styled(Box)(({ theme }) => ({
  marginTop: theme.spaces.l
}));
