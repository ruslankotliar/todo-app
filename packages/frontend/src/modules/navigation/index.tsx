import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageContainer from '../home';
import TodoPageComponent from '../todo';
import CreateTodoPageComponent from '../create-todo';
import { APP_KEYS } from '../common/consts';
import NotFoundPageComponent from '../error404';
import UpdateTodoPageComponent from '../update-todo';
import ProfilePageComponent from '../profile';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route component={UpdateTodoPageComponent} exact path={APP_KEYS.ROUTER_KEYS.UPDATE_TODO} />
      <Route component={CreateTodoPageComponent} exact path={APP_KEYS.ROUTER_KEYS.CREATE_TODO} />
      <Route component={TodoPageComponent} exact path={APP_KEYS.ROUTER_KEYS.TODO} />
      <Route component={HomePageContainer} exact path={APP_KEYS.ROUTER_KEYS.ROOT} />
      <Route component={ProfilePageComponent} exact path={APP_KEYS.ROUTER_KEYS.PROFILE} />
      <Route component={NotFoundPageComponent} path={APP_KEYS.ROUTER_KEYS.NOT_FOUND} />
    </Switch>
  </Router>
);
