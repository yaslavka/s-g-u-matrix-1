import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import isEmpty from 'lodash-es/isEmpty';
import styles from './Team.module.scss';

import * as actions from 'actions/team.actions';
import arrowRight from 'static/icons/angle-right.svg';
import arrowLeft from 'static/icons/angle-left.svg';
import NavBar from 'components/layout/Navbar';
import UserInfo from 'components/UserInfo';
import Spinner from 'components/Spinner';
import TeamMember from './TeamMember';

function Team() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const list = useSelector(state => state.team.list);
  const { name, limit } = useSelector(state => state.team.query);
  const { total, page } = useSelector(state => state.team.meta);
  const isLoading = useSelector(state => state.team.isLoading);

  useEffect(() => {
    dispatch(actions.userStructure(userId));
  }, [dispatch, userId]);

  const handleOnChangeSearch = useCallback(
    event => {
      dispatch(actions.setUserStructureSearch(userId, event.target.value));
    },
    [dispatch, userId],
  );

  const handleOnChangePage = useCallback(
    page => {
      dispatch(actions.setUserStructurePage(userId, page));
    },
    [dispatch, userId],
  );

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <UserInfo />
          <NavBar />
        </Col>
        <Col>
          <h1 className="root-page-title">Команда</h1>
          <div className={styles.search}>
            <input
              type="text"
              autoComplete="off"
              defaultValue={name}
              onChange={handleOnChangeSearch}
              placeholder="Поиск партнера по логину"
            />
          </div>
          <Spinner isLoading={isLoading}>
            <Row>
              {!isEmpty(list) ? (
                list.map(member => (
                  <Col key={member.id} lg={6}>
                    <TeamMember member={member} />
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
}

export default Team;
