import React from 'react';

import { Router, Route, Routes } from '../deps';

import { APP_KEYS } from '../common/consts';

import routes from '../routes';
import { ProtectedRoute } from '../common/components/route-protected';

interface Component {
  element: () => JSX.Element;
  path: string;
  protectedRoute: boolean;
  key: string;
}

export const MainRouter = () => (
  <Router>
    <Routes>
      {routes.map((route: Component) => {
        const { element: Component, path, protectedRoute, key } = route;
        if (protectedRoute) {
          return (
            <Route key={key} element={<ProtectedRoute />}>
              <Route
                element={<Component />}
                path={APP_KEYS.ROUTER_KEYS[path as keyof typeof APP_KEYS.ROUTER_KEYS]}
              />
            </Route>
          );
        }
        return (
          <Route
            key={key}
            element={<Component />}
            path={APP_KEYS.ROUTER_KEYS[path as keyof typeof APP_KEYS.ROUTER_KEYS]}
          />
        );
      })}
    </Routes>
  </Router>
);
