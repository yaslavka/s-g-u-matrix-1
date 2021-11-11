import React, { useCallback, useMemo } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../actions/app.actions';
import wishesArray from 'json/wishes.json';
import { randomBetween } from 'utils';

function WelcomeModal() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.app.user);
  const isVisible = useSelector(state => state.app.modals.welcome);

  const handleCloseModal = useCallback(() => {
    dispatch(actions.toggleWelcomeModal(false));
  }, [dispatch]);

  const firstEnter = useMemo(() => !!userInfo?.firstEnter, [userInfo]);

  const titleRender = useMemo(() => {
    let render = 'Добро пожаловать';

    if (isVisible && !userInfo?.firstEnter) {
      let random = randomBetween(0, 100);
      const randomWishes = wishesArray[random];

      if (randomWishes) {
        render = randomWishes;
      } else {
        render = wishesArray[0];
      }
    }

    return <ModalHeader toggle={handleCloseModal}>{render}</ModalHeader>;
  }, [handleCloseModal, isVisible, userInfo]);

  return (
    <Modal
      centered
      keyboard={false}
      backdrop="static"
      isOpen={isVisible}
      toggle={handleCloseModal}
    >
      {titleRender}
      {firstEnter && (
        <ModalBody>
          <h4 className="text-center">Спасибо Вам, что выбрали STARS!</h4>
        </ModalBody>
      )}
    </Modal>
  );
}

export default WelcomeModal;
