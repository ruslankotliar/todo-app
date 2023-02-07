import React from 'react';

import { QueryClientProvider, ReactQueryDevtools, ThemeProvider } from '../deps';

import { MainRouter } from '../navigation';
import { LayoutComponent } from '../common/components/layout';
import { queryClient } from '../common/utils/query-client.util';

import { theme } from '../theme';
import * as Styled from './app.styled';
import '../../style.css';

import 'swiper/css/bundle';

const AppContainer = () => (
  <ThemeProvider theme={theme}>
    <Styled.GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <LayoutComponent>
        <MainRouter />
      </LayoutComponent>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ThemeProvider>
);

export default AppContainer;
