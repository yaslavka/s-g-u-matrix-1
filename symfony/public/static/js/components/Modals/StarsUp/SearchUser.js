import React, { useState, useEffect, useCallback } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash-es/isEmpty';

import * as actions from 'actions/starsup.actions';
import avatarFallback from 'static/images/placeholder.svg';
import Spinner from 'components/Spinner';

const SearchUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const isVisible = useSelector(state => state.starsupTable.modals.search);
  const isLoading = useSelector(state => state.starsupTable.loadings.search);
  const list = useSelector(state => state.starsupTable.search);
  const level = useSelector(state => state.starsupTable.level);

  const handleCloseModal = useCallback(() => {
    dispatch(actions.toggleStarsUpSearchUserModal(false));
  }, [dispatch]);

  const handleOnChangeSearch = useCallback(
    event => {
      const newName = event.target.value;
      if (newName) {
        dispatch(actions.starsupSearchUser(newName, level));
      }

      setName(newName);
    },
    [dispatch, level],
  );

  useEffect(() => {
    if (isVisible) {
      setName('');
    }
  }, [isVisible]);

  return (
    <Modal
      size="lg"
      keyboard={false}
      backdrop="static"
      isOpen={isVisible}
      toggle={handleCloseModal}
    >
      <ModalHeader toggle={handleCloseModal}>Поиск по логину</ModalHeader>
      <ModalBody>
        <div className="search">
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
              list.map(user => (
                <Col key={user.id} xs={6} sm={3}>
                  <Link
                    onClick={handleCloseModal}
                    to={`/starsup/table/${user.id}`}
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
                    <div className="starsup__user-card-name">
                      {user.username}
                    </div>
                  </Link>
                </Col>
              ))
            ) : name ? (
              <Col>
                <h4 className="text-center mb-4 mt-4">Ничего не найдено</h4>
              </Col>
            ) : null}
          </Row>
        </Spinner>
      </ModalBody>
    </Modal>
  );
};

export default SearchUser;
