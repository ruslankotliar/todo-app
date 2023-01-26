import { Container } from '@mui/material';
import styled from 'styled-components';

export const CustomContainer = styled(Container)((): any => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100vw',
  margin: 0,
  padding: 0
}));
