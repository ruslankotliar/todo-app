import React from 'react';

import { CustomAppBar, CustomMain } from './layout.styled';
import { HeaderToolbarComponent } from './header-toolbar';
import { useLocalStorage } from '../../hooks/local-storage.hook';
import { IStorageUser } from '../../interfaces';

interface Props {
  children: React.ReactNode;
}

export const LayoutComponent: React.FunctionComponent<Props> = ({ children }: Props) => {
  const [{ id }] = useLocalStorage<IStorageUser>('todo-app-user', {
    email: undefined,
    id: undefined
  });
  return (
    <>
      <header>
        <CustomAppBar>
          <HeaderToolbarComponent id={id} />
        </CustomAppBar>
      </header>
      <CustomMain>{children}</CustomMain>
    </>
  );
};
