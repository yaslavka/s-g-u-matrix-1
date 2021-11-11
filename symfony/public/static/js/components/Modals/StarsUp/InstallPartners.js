import React, { useCallback, useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import confirm from 'reactstrap-confirm';
import classnames from 'classnames';

import * as actions from 'actions/starsup.actions';
import UserLeaderList from './UserLeaderList';
import UserList from './UserList';

const InstallPartners = ({ structureObj }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState('users');
  const isVisible = useSelector(state => state.starsupTable.modals.users);
  const install = useSelector(state => state.starsupTable.install);

  const handleCloseModal = useCallback(() => {
    dispatch(actions.toggleStarsUpUsersForInstallModal(false, null));
  }, [dispatch]);

  const handleInstallUser = useCallback(
    async ({ id, username }) => {
      let result = await confirm({
        title: `Установка пользователя ${username}`,
        message: `Вы действительно хотите установить ${username} в эту ячейку?`,
        confirmText: 'Подтвердить',
        confirmColor: 'primary',
        cancelText: 'Отмена',
        cancelColor: 'link text-muted',
      });
      if (id && result && install) {
        dispatch(
          actions.starsupInstallMatrix({ ...install, child: id }, structureObj),
        );
      }
    },
    [dispatch, install, structureObj],
  );

  return (
    <Modal
      size="lg"
      keyboard={false}
      backdrop="static"
      isOpen={isVisible}
      toggle={handleCloseModal}
    >
      <ModalHeader toggle={handleCloseModal}>Выбор партнера</ModalHeader>
      <ModalBody>
        <div className="starsup__queue-lines">
          <button
            type="button"
            disabled={type === 'users'}
            className={classnames('starsup__queue-line', {
              'is-active': type === 'users',
            })}
            onClick={() => setType('users')}
          >
            1 линия
          </button>
          <button
            type="button"
            disabled={type === 'leaders'}
            className={classnames('starsup__queue-line', {
              'is-active': type === 'leaders',
            })}
            onClick={() => setType('leaders')}
          >
            Глубина
          </button>
        </div>
        <br />
        {type === 'users' && <UserList handleInstallUser={handleInstallUser} />}
        {type === 'leaders' && (
          <UserLeaderList handleInstallUser={handleInstallUser} />
        )}
      </ModalBody>
    </Modal>
  );
};

export default InstallPartners;
