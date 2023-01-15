import { Container } from '@mui/material';
import styled from 'styled-components';

export const CustomContainer = styled(Container)((): any => ({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
