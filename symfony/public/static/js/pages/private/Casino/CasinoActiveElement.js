import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import confirm from 'reactstrap-confirm';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Row, Col } from 'reactstrap';

import avatar from 'static/images/placeholder.svg';

import r from 'constants/routes.constants';
import * as actions from 'actions/casino.actions';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { formatter } from 'utils';

function CasinoActiveElement({ draw }) {
  const dispatch = useDispatch();
  const {
    isPrivate,
    ownerId,
    ownerName,
    ownerAvatar,
    totalMembers,
    currentMembersCount,
    prizes,
    price,
    id,
  } = draw;
  const userId = useSelector(state => state.app.user?.id);
  const cancelLoading = useSelector(state => state.casino.loadings.cancel);

  const handleCancelDraw = async () => {
    let result = await confirm({
      title: 'Отменить розыгрыш',
      message: 'Вы действительно хотите отменить розыгрыш?',
      confirmText: 'Подтвердить',
      confirmColor: 'danger',
      cancelText: 'Отмена',
      cancelColor: 'link text-muted',
    });

    if (result) {
      dispatch(actions.casinoDrawCancel(id));
    }
  };

  const handleBuyDraw = () => {
    dispatch(actions.setCasinoActiveCurrentDraw(draw));
    dispatch(actions.toggleCasinoDrawBuyModal());
  };

  const copyCasinoLink = () => {
    const link = `${window.location.origin}${r.casino}/draw/${id}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.info('Ссылка успешно скопирована');
    });
  };

  return (
    <div className="casino-list__element">
      {isPrivate && (
        <div className="casino-list__element-lock">
          <Icon iconName="keys" />
        </div>
      )}

      <figure>
        <div className="casino-list__element-picture">
          <div className="casino-list__element-avatar">
            <img
              src={
                ownerAvatar
                  ? `${process.env.REACT_APP_BASE_URL}${ownerAvatar}`
                  : avatar
              }
              alt={ownerName}
            />
          </div>
          <div className="casino-list__element-name">{ownerName}</div>
        </div>
        <figcaption>
          <ul>
            <li>
              <strong>Приз:</strong>{' '}
              <span>{`Клоны  ${prizes[0]?.name.toUpperCase()}(x${
                prizes.length
              })`}</span>
            </li>
            <li>
              <strong>Сумма:</strong>{' '}
              <span>
                {formatter
                  .format(Math.ceil(price * totalMembers))
                  .replace('₽', 'ST')}
              </span>
            </li>
            <li>
              <strong>Участников:</strong>{' '}
              <span>{`${currentMembersCount} из ${totalMembers}`}</span>
            </li>
            <li>
              <strong>Цена:</strong>{' '}
              <span>{formatter.format(price).replace('₽', 'ST')}</span>
            </li>
          </ul>
        </figcaption>
      </figure>
      <div className="casino-list__element-actions">
        <Row>
          <Col xs={6} md={4}>
            <Row>
              <Col xs={6}>
                <Button
                  tag={Link}
                  color="primary"
                  to={`${r.casino}/draw/${id}`}
                  block
                >
                  <Icon iconName="eye" />
                </Button>
              </Col>
              <Col xs={6}>
                <Button color="primary" onClick={copyCasinoLink} block>
                  <Icon iconName="copy" />
                </Button>
              </Col>
            </Row>
          </Col>
          <Col xs={6} md={userId === ownerId ? 6 : 8}>
            <Button
              color="primary"
              disabled={currentMembersCount === totalMembers}
              onClick={handleBuyDraw}
              block
            >
              Присоединиться
            </Button>
          </Col>
          {userId === ownerId && (
            <Col xs={12} md={2}>
              <Button
                color="danger"
                loading={cancelLoading}
                disabled={cancelLoading}
                onClick={handleCancelDraw}
                block
              >
                <Icon iconName="cancel" />
              </Button>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}

export default CasinoActiveElement;
