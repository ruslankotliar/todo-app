import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useLocalStorage } from '../../hooks/local-storage.hook';
import { IStorageUser } from '../../interfaces';

import { CustomAvatar, CustomContainer, CustomGrid, CustomPaper } from './user-profile.styled';

export const ProfileComponent = () => {
  const [storageUser] = useLocalStorage<IStorageUser>('todo-app-user', {
    email: undefined,
    id: undefined,
    avatar: undefined
  });

  const logOutUser = () => {
    localStorage.removeItem('todo-app-user');
    localStorage.removeItem('todo-app-token');
    // change this
    window.location.href = '/';
  };

  return (
    <CustomContainer>
      <CustomPaper>
        <CustomAvatar alt="User avatar" src={storageUser.avatar} />
        <CustomGrid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h6">Email:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{storageUser.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">ID:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{storageUser.id}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" onClick={logOutUser}>
              Log out
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" href={`/user/update/${storageUser.id}`}>
              Edit
            </Button>
          </Grid>
        </CustomGrid>
      </CustomPaper>
    </CustomContainer>
  );
};
