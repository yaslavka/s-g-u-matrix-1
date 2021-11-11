import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import avatar from 'static/images/placeholder.svg';

import r from 'constants/routes.constants';
import Button from 'components/Button';
import Icon from 'components/Icon';

function CasinoEndedElement({ draw }) {
  const { isPrivate, winnerPhoto, prizeName, winnersName, casinoId } = draw;

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
                winnerPhoto
                  ? `${process.env.REACT_APP_BASE_URL}${winnerPhoto}`
                  : avatar
              }
              alt={winnersName}
            />
          </div>
          <div className="casino-list__element-name">{winnersName}</div>
        </div>
        <figcaption>
          <ul>
            <li>
              <strong>Приз:</strong> <span>{`Клоны (${prizeName})`}</span>
            </li>
          </ul>
        </figcaption>
      </figure>
      <div className="casino-list__element-actions">
        <Row>
          <Col>
            <Button
              tag={Link}
              to={`${r.casino}/draw/${casinoId}`}
              color="primary"
              block
            >
              Перейти
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CasinoEndedElement;
