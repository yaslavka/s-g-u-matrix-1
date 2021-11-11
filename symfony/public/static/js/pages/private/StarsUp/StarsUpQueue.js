import React, { useEffect, useCallback } from 'react';
import { Container, Button, Row, Col } from 'reactstrap';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import isEmpty from 'lodash-es/isEmpty';
import classnames from 'classnames';

import * as actions from 'actions/starsup.actions';
import avatarFallback from 'static/images/placeholder.svg';
import arrowRight from 'static/icons/angle-right.svg';
import arrowLeft from 'static/icons/angle-left.svg';
import Spinner from 'components/Spinner';
import Icon from 'components/Icon';

const StarsUpQueue = ({ location }) => {
  const history = useHistory();
  const { level } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.starsupTable.loadings.queue);
  const list = useSelector(state => state.starsupTable.queue.list);
  const { limit, line, name, offset } = useSelector(
    state => state.starsupTable.queue.query,
  );
  const { total, page } = useSelector(state => state.starsupTable.queue.meta);

  const handleChangeLine = useCallback(
    line => {
      dispatch(actions.setStarsupQueueLine(line, level));
    },
    [dispatch, level],
  );

  const handleOnChangePage = useCallback(
    page => {
      dispatch(actions.setStarsupQueuePage(page, level));
    },
    [dispatch, level],
  );

  const handleOnChangeSearch = useCallback(
    event => {
      dispatch(actions.setStarsupQueueSearch(event.target.value, level));
    },
    [dispatch, level],
  );

  useEffect(() => {
    if (level && location) {
      const state = location.state ? location.state : {};
      dispatch(actions.starsupQueue(level, state));
    }
  }, [dispatch, level, location]);

  return (
    <Container className="root-page">
      <div className="root-page-header">
        <div className="root-page-header__left">
          <Button
            className="root-page-header__back"
            onClick={() => history.push(`/starsup/person/${level}`)}
            color="link"
            size="lg"
          >
            <Icon iconName="back" />
          </Button>
        </div>
        <h1 className="root-page-title">Очередь LVL {level}</h1>
        <div className="root-page-header__right">&nbsp;</div>
      </div>
      <div className="starsup__queue">
        <div className="starsup__queue-left">
          <button
            className={classnames('starsup__queue-line', {
              'is-active': line === 0,
            })}
            onClick={() => handleChangeLine(0)}
          >
            Мои клоны {line === 0 && Boolean(total) && `(${total})`}
          </button>
          <div className="starsup__queue-lines">
            <span>Линии:</span>
            {[null, null, null, null, null].map((_, index) => (
              <button
                key={index.toString()}
                className={classnames('starsup__queue-line', {
                  'is-active': line === index + 1,
                })}
                onClick={() => handleChangeLine(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        {Boolean(line) && (
          <div className="starsup__queue-search">
            <input
              type="text"
              autoComplete="off"
              value={name}
              onChange={handleOnChangeSearch}
              placeholder="Поиск по логину"
            />
          </div>
        )}
      </div>
      <Spinner isLoading={isLoading}>
        <Row>
          {!isEmpty(list) ? (
            list.map(user => (
              <Col key={user.id} lg={4}>
                <Link
                  to={{
                    pathname: `/starsup/table/${user.id}`,
                    state: { query: { line, offset, name }, meta: { page } },
                  }}
                  className="starsup__user-card"
                >
                  <div
                    className="starsup__user-card-picture starsup__user-card-picture--absolute"
                    style={{
                      backgroundImage: `url(${
                        user.avatar
                          ? `${process.env.REACT_APP_BASE_URL}/getFile/avatar/${user.avatar}`
                          : avatarFallback
                      })`,
                    }}
                  />
                  <div className="card">
                    <div className="card__header">
                      <div className="card__header-left">
                        <h3 className="card__title text-center">
                          {user.username}
                        </h3>
                      </div>
                    </div>
                    <div className="card__body">
                      <div className="list-info list-info--horizontal">
                        <div className="list-info__group">
                          <div className="list-info__label">Мест в столе</div>
                          <div className="list-info__value">{user.count}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            ))
          ) : (
            <Col>
              <h4 className="text-center mb-4 mt-4">
                У вас нет{' '}
                {line ? `пользователей в ${line} линии` : 'клонов в очереди'}
              </h4>
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
              <img src={arrowRight} className="arrowRight" alt="Arrow right" />
            }
          />
        )}
      </Spinner>
    </Container>
  );
};

export default StarsUpQueue;
