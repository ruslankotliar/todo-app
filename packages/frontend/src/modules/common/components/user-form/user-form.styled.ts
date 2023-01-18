import styled from 'styled-components';
import { Container } from '@mui/material';

export const CustomContainer = styled(Container)(({ theme }) => ({
  height: theme.spaces.l20,
  [theme.breakpoints.up('md')]: {
    width: theme.spaces.l40
  }
}));
