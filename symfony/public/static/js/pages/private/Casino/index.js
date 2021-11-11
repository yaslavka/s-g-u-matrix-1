import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Switch, Redirect } from 'react-router-dom';

import r from 'constants/routes.constants';
import logo from '../../../static/images/logo-ls.svg';
import CasinoDrawCreateModal from 'components/Modals/Casino/DrawCreate';
import CasinoDrawBuyModal from 'components/Modals/Casino/DrawBuy';
import RouteWithSubRoutes from 'components/RouteWithSubRoutes';
import NavBar from 'components/layout/Navbar';
import UserInfo from 'components/UserInfo';

function Casino({ routes }) {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <UserInfo />
          <NavBar />
        </Col>
        <Col xl={9}>
          <div className="casino__logo">
            <img src={logo} alt="Lucky Star" />
          </div>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
            <Redirect to={r.casinoActive} />
          </Switch>
          <CasinoDrawCreateModal />
          <CasinoDrawBuyModal />
        </Col>
      </Row>
    </Container>
  );
}

export default Casino;
