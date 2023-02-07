import React from 'react';

import { Navigate, Outlet } from '../../../deps';
import { useLocalStorage } from '../../hooks/local-storage.hook';
import { IStorageUser } from '../../interfaces';

export const ProtectedRoute = ({ children }: any) => {
  const [storageUser] = useLocalStorage<IStorageUser>('todo-app-user', {
    email: undefined,
    id: undefined,
    avatar: undefined
  });
  if (!storageUser.email) {
    return <Navigate to="/user/login" replace />;
  }

  return children || <Outlet />;
};
