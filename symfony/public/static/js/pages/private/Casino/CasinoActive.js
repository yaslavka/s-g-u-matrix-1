import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash-es/isEmpty';

import r from 'constants/routes.constants';
import * as actions from 'actions/casino.actions';
import arrowRight from 'static/icons/angle-right.svg';
import arrowLeft from 'static/icons/angle-left.svg';
import CasinoActiveElement from './CasinoActiveElement';
import Spinner from 'components/Spinner';
import Button from 'components/Button';

function CasinoActive() {
  const dispatch = useDispatch();
  const list = useSelector(state => state.casino.active.list);
  const isLoading = useSelector(state => state.casino.loadings.active);
  const { total, page } = useSelector(state => state.casino.active.meta);
  const { myActive, limit } = useSelector(state => state.casino.active.query);

  useEffect(() => {
    dispatch(actions.casinoActiveList());
  }, [dispatch]);

  const handleOnChangePage = useCallback(
    page => {
      dispatch(actions.setCasinoActiveListPage(page));
    },
    [dispatch],
  );

  const handleChangeIsMy = useCallback(
    event => {
      dispatch(actions.setCasinoActiveIsMy(event.target.checked));
    },
    [dispatch],
  );

  // TODO: uncomment after use name params
  // const handleOnChangeSearch = useCallback(
  //   event => {
  //     dispatch(actions.setCasinoActiveListSearch(event.target.value));
  //   },
  //   [dispatch],
  // );

  const handleDrawCreate = () =>
    dispatch(actions.toggleCasinoDrawCreateModal());

  return (
    <div className="casino-list">
      <div className="casino-list__header">
        <div className="casino-list__search">&nbsp;</div>
        <div className="casino-list__actions">
          <FormGroup check inline>
            <Label>
              <Input
                type="checkbox"
                onChange={handleChangeIsMy}
                checked={myActive}
              />
              Только мой
            </Label>
          </FormGroup>
          <Button tag={Link} to={r.casinoEnded}>
            Завершенные
          </Button>
          <Button color="primary" onClick={handleDrawCreate}>
            Создать
          </Button>
        </div>
      </div>
      <Spinner isLoading={isLoading}>
        <div className="casino-list__body">
          <Row>
            {!isEmpty(list) ? (
              list.map(draw => (
                <Col key={draw.id} lg={6}>
                  <CasinoActiveElement draw={draw} />
                </Col>
              ))
            ) : (
              <Col>
                <div className="text-center">
                  <h4 className="mb-5 mt-4">
                    В данный момент розыгрыши отсутствуют
                  </h4>
                </div>
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
        </div>
      </Spinner>
    </div>
  );
}

export default CasinoActive;
