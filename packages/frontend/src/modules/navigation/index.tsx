import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePageContainer from '../home';
import TodoPageComponent from '../todo-single';
import NotFoundPageComponent from '../error404';
import ProfilePageComponent from '../user-profile';
import LoginUserPageComponent from '../user-login';
import RegisterUserPageComponent from '../user-register';
import UpdateUserPageComponent from '../user-update';
import TodoFormPageComponent from '../todo-form';

import { APP_KEYS } from '../common/consts';
import { ProtectedRoute } from '../common/components/route-protected';

export const MainRouter = () => (
  <Router>
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<TodoPageComponent />} path={APP_KEYS.ROUTER_KEYS.SINGLE_TODO} />
        <Route element={<TodoFormPageComponent />} path={APP_KEYS.ROUTER_KEYS.CREATE_TODO} />
        <Route element={<TodoFormPageComponent />} path={APP_KEYS.ROUTER_KEYS.UPDATE_TODO} />
        <Route element={<HomePageContainer />} path={APP_KEYS.ROUTER_KEYS.ROOT} />
        <Route element={<ProfilePageComponent />} path={APP_KEYS.ROUTER_KEYS.PROFILE} />
        <Route element={<UpdateUserPageComponent />} path={APP_KEYS.ROUTER_KEYS.UPDATE} />
      </Route>
      <Route element={<LoginUserPageComponent />} path={APP_KEYS.ROUTER_KEYS.LOGIN} />
      <Route element={<RegisterUserPageComponent />} path={APP_KEYS.ROUTER_KEYS.SIGNUP} />
      <Route element={<NotFoundPageComponent />} path={APP_KEYS.ROUTER_KEYS.NOT_FOUND} />
    </Routes>
  </Router>
);
