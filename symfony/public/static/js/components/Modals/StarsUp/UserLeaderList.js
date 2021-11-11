import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import isEmpty from 'lodash-es/isEmpty';
import { Row, Col } from 'reactstrap';

import * as actions from 'actions/starsup.actions';
import avatarFallback from 'static/images/placeholder.svg';
import arrowRight from 'static/icons/angle-right.svg';
import arrowLeft from 'static/icons/angle-left.svg';
import Spinner from 'components/Spinner';

const UserLeaderList = ({ handleInstallUser }) => {
  const dispatch = useDispatch();
  const { limit } = useSelector(state => state.starsupTable.leaders.query);
  const { total, page } = useSelector(state => state.starsupTable.leaders.meta);
  const isLoading = useSelector(state => state.starsupTable.loadings.leaders);
  const list = useSelector(state => state.starsupTable.leaders.list);
  const level = useSelector(state => state.starsupTable.level);

  const handleOnChangePage = useCallback(
    page => {
      dispatch(actions.setStarsupUsersForLeaderInstallPage(page, level));
    },
    [dispatch, level],
  );

  useEffect(() => {
    if (level) {
      dispatch(actions.starsupUsersForLeaderInstall(level));
    }
  }, [dispatch, level]);

  return (
    <Spinner isLoading={isLoading}>
      <Row>
        {!isEmpty(list) ? (
          list.map(user => (
            <Col key={user.id} xs={6} sm={3}>
              <div
                onClick={() => handleInstallUser(user)}
                className="starsup__user-card starsup__user-card--install"
              >
                <div className="starsup__user-card-count">{user.count}</div>
                <div
                  className="starsup__user-card-picture"
                  style={{
                    backgroundImage: `url(${
                      user.avatar
                        ? `${process.env.REACT_APP_BASE_URL}/getFile/avatar/${user.avatar}`
                        : avatarFallback
                    })`,
                  }}
                />
                <div className="starsup__user-card-name">{user.username}</div>
              </div>
            </Col>
          ))
        ) : (
          <Col>
            <h4 className="text-center mb-4 mt-4">
              У этого пользователя нет людей в команде
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
  );
};

export default UserLeaderList;
