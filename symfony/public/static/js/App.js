import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/react";
import Raven from "raven-js";

import PanelRoutes from 'routes/panel.routes';
import PublicRoutes from 'routes/public.routes';
import * as actions from 'actions/app.actions';

if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  Raven.config(process.env.REACT_APP_SENTRY_DSN).install();
}

function App({ history }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const loading = document.querySelector('.loading');
    const loader = document.querySelector('.loading-progress span');
    setTimeout(() => {
      loader.style.width = '100%';
      loading.classList.add('end');
    }, 300);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actions.userInfo());
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <PublicRoutes history={history} />;
  }

  return <PanelRoutes history={history} />;
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default App;
