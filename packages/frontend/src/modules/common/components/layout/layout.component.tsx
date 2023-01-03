import React from 'react';
import { CustomAppBar, CustomButton, CustomMain, CustomToolbar } from './layout.styled';

interface Props {
  children: React.ReactNode;
}

export const LayoutComponent: React.FunctionComponent<Props> = ({ children }: Props) => (
  <>
    <header>
      <CustomAppBar>
        <CustomToolbar>
          <CustomButton href="/">Home</CustomButton>
          <CustomButton variant="outlined" href="/todo/create-todo">
            Add todo
          </CustomButton>
          <CustomButton href="/profile/profileID">My profile</CustomButton>
        </CustomToolbar>
      </CustomAppBar>
    </header>
    <CustomMain>{children}</CustomMain>
  </>
);
