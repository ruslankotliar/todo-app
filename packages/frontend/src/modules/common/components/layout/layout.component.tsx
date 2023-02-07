import React from 'react';

import { Toolbar } from '@mui/material';

import { APP_KEYS } from '../../consts';

import {
  CustomAppBar,
  CustomMain,
  CustomButton,
  CustomBoxHome,
  CustomBoxLogIn
} from './layout.styled';

import { useLocalStorage } from '../../hooks/local-storage.hook';
import { IStorageUser } from '../../interfaces';

interface Props {
  children: React.ReactNode;
}

export const LayoutComponent: React.FunctionComponent<Props> = ({ children }: Props) => {
  const [{ id }] = useLocalStorage<IStorageUser>('todo-app-user', {
    email: undefined,
    id: undefined,
    avatar: undefined
  });
  return (
    <>
      <header>
        <CustomAppBar>
          <Toolbar>
            {id ? (
              <CustomBoxHome>
                <CustomButton href={APP_KEYS.ROUTER_KEYS.ROOT}>Home</CustomButton>
                <CustomButton variant="outlined" href={APP_KEYS.ROUTER_KEYS.CREATE_TODO}>
                  Add todo
                </CustomButton>
                <CustomButton href={`/user/profile/${id}`}>My profile</CustomButton>
              </CustomBoxHome>
            ) : (
              <CustomBoxLogIn>
                <CustomButton href="/user/register">Register</CustomButton>
                <CustomButton href="/user/login">Login</CustomButton>
              </CustomBoxLogIn>
            )}
          </Toolbar>
        </CustomAppBar>
      </header>
      <CustomMain>{children}</CustomMain>
    </>
  );
};
