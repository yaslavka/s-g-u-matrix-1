import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import isEmpty from 'lodash-es/isEmpty';

import * as actions from 'actions/startrek.actions';
import RenewalPlanetsModal from 'components/Modals/StarTrek/RenewalPlanets';
import arrowRight from 'static/icons/angle-right.svg';
import arrowLeft from 'static/icons/angle-left.svg';
import MyPlanetsElement from './MyPlanetsElement';
import NavBar from 'components/layout/Navbar';
import UserInfo from 'components/UserInfo';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import Icon from 'components/Icon';

function MyPlanets() {
  const history = useHistory();
  const dispatch = useDispatch();
  const list = useSelector(state => state.startrek.list);
  const selected = useSelector(state => state.startrek.selected);
  const isLoading = useSelector(state => state.startrek.loadings.list);
  const isUpdateLoading = useSelector(state => state.startrek.loadings.update);
  const { total, page } = useSelector(state => state.startrek.meta);
  const { limit } = useSelector(state => state.startrek.query);

  useEffect(() => {
    dispatch(actions.startrekPlanets());
  }, [dispatch]);

  const handleOnChangePage = useCallback(
    page => {
      dispatch(actions.setStartrekPlanetsPage(page));
    },
    [dispatch],
  );

  const handleOnPlanetsUpdate = useCallback(() => {
    dispatch(actions.toggleRenewalPlanetsModal());
  }, [dispatch]);

  const handleSelectAllOnPage = () => {
    dispatch(actions.toggleAllPlanetOnPage());
  };

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <UserInfo />
          <NavBar />
        </Col>
        <Col xl={9}>
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
            <h1 className="root-page-title">Мои планеты</h1>
            <div className="root-page-header__right">&nbsp;</div>
          </div>
          <Spinner isLoading={isLoading}>
            <Row>
              {!isEmpty(list) ? (
                list.map(planet => (
                  <Col key={planet.id} lg={6}>
                    <MyPlanetsElement planet={planet} />
                  </Col>
                ))
              ) : (
                <Col>
                  <h4 className="text-center mb-4 mt-4">У вас нет планет</h4>
                </Col>
              )}
            </Row>
            {!isEmpty(list) && !isLoading && (
              <ReactPaginate
                forcePage={page}
                marginPagesDisplayed={1}
                activeClassName="active"
                pageCount={Math.ceil(total / limit)}
                onPageChange={props => handleOnChangePage(props.selected)}
                containerClassName="pagination"
                previousLabel={
                  <img src={arrowLeft} className="arrowLeft" alt="Arrow left" />
                }
                nextLabel={
                  <img
                    src={arrowRight}
                    className="arrowRight"
                    alt="Arrow right"
                  />
                }
              />
            )}
          </Spinner>
          <div className="text-center mt-5 mb-5">
            {!isEmpty(selected) && (
              <Button
                color="primary"
                onClick={handleOnPlanetsUpdate}
                disabled={isUpdateLoading}
                loading={isUpdateLoading}
              >
                Продлить выбранные
              </Button>
            )}
            {!isLoading && list.length && (
              <div className="mt-3">
                <Button color="primary" onClick={handleSelectAllOnPage}>
                  {selected.length !== list.length ? 'Выбрать' : 'Убрать'} все
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <RenewalPlanetsModal myPlanets />
    </Container>
  );
}

export default MyPlanets;
