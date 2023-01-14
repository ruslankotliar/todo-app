import styled from 'styled-components';
import { Box, Container } from '@mui/material';

export const CustomContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: theme.spaces.l40
  }
}));

export const CustomBox = styled(Box)(({ theme }) => ({
  borderBottom: 1,
  borderColor: 'divider',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: theme.spaces.l4,
  width: theme.spaces.l15
}));
