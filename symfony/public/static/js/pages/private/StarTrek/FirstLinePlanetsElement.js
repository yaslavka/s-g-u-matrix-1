import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

import * as actions from 'actions/startrek.actions';
import avatarFallback from 'static/images/placeholder.svg';

function FirstLinePlanetsElement({ planet }) {
  const dispatch = useDispatch();
  const { comets, username, bonus, id } = planet;
  const selected = useSelector(state => state.startrek.selected);
  const isSelected = !!selected.includes(id);

  const handleOnSetPlanetForUpdate = () =>
    dispatch(actions.setPlanetForUpdate(id));

  return (
    <div
      onClick={handleOnSetPlanetForUpdate}
      className={classnames('starsup__user-card cursor-pointer', {
        'starsup__user-card--selected': isSelected,
      })}
    >
      <div
        className="starsup__user-card-picture starsup__user-card-picture--absolute"
        style={{
          backgroundImage: `url(${
            planet.avatar
              ? `${process.env.REACT_APP_BASE_URL}/getFile/avatar/${planet.avatar}`
              : avatarFallback
          })`,
        }}
      />
      <div className="card">
        <div className="card__header">
          <div className="card__header-left">
            <h3 className="card__title text-center">Планета #{id}</h3>
          </div>
        </div>
        <div className="card__body">
          <div className="list-info list-info--horizontal">
            <div className="list-info__group">
              <div className="list-info__label">Логин:</div>
              <div className="list-info__value">{username}</div>
            </div>
            <div className="list-info__group">
              <div className="list-info__label">Бонусы с планеты (ST):</div>
              <div className="list-info__value">{bonus}</div>
            </div>
            <div className="list-info__group">
              <div className="list-info__label">Осталось Комет:</div>
              <div className="list-info__value">{comets}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

FirstLinePlanetsElement.propTypes = {
  planet: PropTypes.shape({
    id: PropTypes.number,
    level: PropTypes.number,
    sum: PropTypes.number,
    comets: PropTypes.number,
    dateCreate: PropTypes.string,
  }),
};

export default FirstLinePlanetsElement;
