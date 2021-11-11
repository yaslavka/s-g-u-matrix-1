import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash-es/isEmpty';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

import r from 'constants/routes.constants';
import * as actions from 'actions/casino.actions';
import arrowRight from 'static/icons/angle-right.svg';
import arrowLeft from 'static/icons/angle-left.svg';
import CasinoEndedElement from './CasinoEndedElement';
import Spinner from 'components/Spinner';
import Button from 'components/Button';

function CasinoEnded() {
  const dispatch = useDispatch();
  const list = useSelector(state => state.casino.ended.list);
  const isLoading = useSelector(state => state.casino.loadings.ended);
  const { total, page } = useSelector(state => state.casino.ended.meta);
  const { isMy, limit } = useSelector(state => state.casino.ended.query);

  useEffect(() => {
    dispatch(actions.casinoEndedList());
  }, [dispatch]);

  const handleOnChangePage = useCallback(
    page => {
      dispatch(actions.setCasinoEndedListPage(page));
    },
    [dispatch],
  );

  const handleChangeIsMy = useCallback(
    event => {
      dispatch(actions.setCasinoEndedIsMy(event.target.checked));
    },
    [dispatch],
  );

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
                checked={isMy}
              />
              Только мои
            </Label>
          </FormGroup>
          <Button tag={Link} to={r.casinoActive}>
            Активные
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
                <Col key={draw.id} lg={4}>
                  <CasinoEndedElement draw={draw} />
                </Col>
              ))
            ) : (
              <Col>
                <div className="text-center">
                  <h4 className="mb-5 mt-4">
                    В данный момент завершенные розыгрыши отсутствуют
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

export default CasinoEnded;
