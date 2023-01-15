import React from 'react';

import { Toolbar } from '@mui/material';

import { CustomButton, CustomBoxHome, CustomBoxLogIn } from '../layout.styled';

import { APP_KEYS } from '../../../consts';

const HeaderToolbar = ({ id }: any) => (
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
);

export const HeaderToolbarComponent = React.memo(HeaderToolbar);
