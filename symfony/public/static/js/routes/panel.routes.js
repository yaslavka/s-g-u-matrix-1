import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import omit from 'lodash-es/omit';

import Header from '../components/layout/Header';
import WelcomeModal from '../components/Modals/Welcome';
import RouteWithSubRoutes from '../components/RouteWithSubRoutes';
import r from '../constants/routes.constants';
import { panelRouteConfig } from '../routes';

function PanelRoutes({ history }) {
  return (
    <ConnectedRouter history={history}>
      <div className="app private">
        <div className="star-container"></div>
        <div className="twinkle"></div>
        <Header variant="private" />
        <main>
          <Switch>
            {panelRouteConfig.map(route => (
              <RouteWithSubRoutes key={route.id} {...omit(route, 'id')} />
            ))}

            <Redirect to={r.leader} />
          </Switch>
        </main>
      </div>
      <WelcomeModal />
    </ConnectedRouter>
  );
}

PanelRoutes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PanelRoutes;
