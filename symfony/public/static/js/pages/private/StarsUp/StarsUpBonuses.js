import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
import isEmpty from 'lodash-es/isEmpty';

import * as actions from 'actions/starsup.actions';
import NavBar from 'components/layout/Navbar';

import SuperBonusModal from 'components/Modals/StarsUp/SuperBonus';
import UserInfo from 'components/UserInfo';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import Icon from 'components/Icon';

import StarsUpBonus from './StarsUpBonus';

const StarsUpBonuses = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.starsup.loadings.bonuses);
  const bonuses = useSelector(state => state.starsup.bonuses);

  useEffect(() => {
    dispatch(actions.starsupSuperBonusList());
  }, [dispatch]);

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <UserInfo />
          <NavBar />
        </Col>
        <Col xl={9}>
          <Spinner isLoading={isLoading}>
            <div className="root-page-header">
              <div className="root-page-header__left">
                <Button
                  className="root-page-header__back"
                  onClick={() => history.goBack()}
                  color="link"
                  size="lg"
                >
                  <Icon iconName="back" />
                </Button>
              </div>
              <h1 className="root-page-title">Super Bonus</h1>
              <div className="root-page-header__right">&nbsp;</div>
            </div>
            {!isEmpty(bonuses) ? (
              bonuses.map(bonus => (
                <StarsUpBonus key={bonus.id} bonus={bonus} />
              ))
            ) : (
              <Col>
                <h4 className="text-center mb-4 mt-4">У вас нету бонусов</h4>
              </Col>
            )}
          </Spinner>
          <SuperBonusModal />
        </Col>
      </Row>
    </Container>
  );
};

export default StarsUpBonuses;
