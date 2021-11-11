import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import omit from 'lodash-es/omit';

import RouteWithSubRoutes from '../components/RouteWithSubRoutes';
import { publicRouteConfig } from '../routes';
import r from '../constants/routes.constants';

function PublicRoutes({ history }) {
  return (
    <ConnectedRouter history={history}>
      <main className="app">
        <Switch>
          {publicRouteConfig.map(route => (
            <RouteWithSubRoutes key={route.id} {...omit(route, 'id')} />
          ))}

          <Redirect to={r.root} />
        </Switch>
      </main>
    </ConnectedRouter>
  );
}

PublicRoutes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PublicRoutes;
