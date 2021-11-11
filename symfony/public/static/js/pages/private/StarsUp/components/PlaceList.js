import React, { useEffect, useCallback } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import isEmpty from 'lodash-es/isEmpty';

import * as actions from 'actions/starsup.actions';
import avatarFallback from 'static/images/placeholder.svg';
import arrowRight from 'static/icons/angle-right.svg';
import arrowLeft from 'static/icons/angle-left.svg';
import NavBar from 'components/layout/Navbar';
import UserInfo from 'components/UserInfo';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import Icon from 'components/Icon';

const PlaceList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { usersLine } = useParams();
  const isLoading = useSelector(state => state.starsup.loadings.users);
  const list = useSelector(state => state.starsup.users);
  const { total, page } = useSelector(state => state.starsup.meta);
  const { limit } = useSelector(state => state.starsup.query);

  useEffect(() => {
    if (usersLine) {
      dispatch(actions.starsupUsers(usersLine));
    }
  }, [dispatch, usersLine]);

  const handleOnChangePage = useCallback(
    page => {
      dispatch(actions.setStarsupUsersPage(page, usersLine));
    },
    [dispatch, usersLine],
  );

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
            <h1 className="root-page-title">
              Пользователи в {usersLine} линии
            </h1>
            <div className="root-page-header__right">&nbsp;</div>
          </div>
          <Spinner isLoading={isLoading}>
            <Row>
              {!isEmpty(list) ? (
                list.map(user => (
                  <Col key={user.id} lg={6}>
                    <div className="starsup__user-card">
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
                              <div className="list-info__label">Телефон</div>
                              <div className="list-info__value">
                                {user.phone ? (
                                  <a
                                    href={`tel:${user.phone}`}
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    {user.phone}
                                  </a>
                                ) : (
                                  '-'
                                )}
                              </div>
                            </div>
                            <div className="list-info__group">
                              <div className="list-info__label">Telegram</div>
                              <div className="list-info__value">
                                {user.tg ? (
                                  <a
                                    href={`https://t.me/${user.tg}`}
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    @{user.tg}
                                  </a>
                                ) : (
                                  '-'
                                )}
                              </div>
                            </div>
                            <div className="list-info__group">
                              <div className="list-info__label">Мест</div>
                              <div className="list-info__value">
                                <strong>{user.total}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))
              ) : (
                <Col>
                  <h4 className="text-center mb-4 mt-4">
                    У вас нет пользователей в {usersLine} линии
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
                  <img
                    src={arrowRight}
                    className="arrowRight"
                    alt="Arrow right"
                  />
                }
              />
            )}
          </Spinner>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceList;
