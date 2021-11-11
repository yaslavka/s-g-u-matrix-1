import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import classnames from 'classnames';
import { randomBetween } from 'utils';

import * as actions from 'actions/startrek.actions';

function MyPlanetsElement({ planet }) {
  const dispatch = useDispatch();
  const { level, comets, sum, dateCreate, refill, id } = planet;
  const selected = useSelector(state => state.startrek.selected);
  const isRefillLoading = useSelector(state => state.startrek.loadings.refill);
  const isSelected = !!selected.includes(id);

  const random = useMemo(() => randomBetween(1, 8), []);
  const planetImg = useMemo(
    () => require(`../../../static/images/home/planet-${random}.png`),
    [random],
  );

  const handleOnSetPlanetForUpdate = () =>
    dispatch(actions.setPlanetForUpdate(id));

  const handleOnChangeRefill = useCallback(() => {
    dispatch(actions.changeAutoRefillPlanets({ id, auto: !refill }));
  }, [dispatch, id, refill]);

  return (
    <div
      className={classnames('startrek__planet-card', {
        'startrek__planet-card--selected': isSelected,
      })}
    >
      <div
        onClick={handleOnSetPlanetForUpdate}
        className="startrek__planet-card-picture"
        style={{ backgroundImage: `url(${planetImg.default})` }}
      ></div>
      <div className="card">
        <div className="card__header">
          <div className="card__header-left">
            <h3 className="card__title text-center">Планета #{id}</h3>
          </div>
        </div>
        <div className="card__body">
          <div className="list-info list-info--horizontal">
            <div className="list-info__group">
              <div className="list-info__label">Время приобретения:</div>
              <div className="list-info__value">{dateCreate}</div>
            </div>
            <div className="list-info__group">
              <div className="list-info__label">Уровень:</div>
              <div className="list-info__value">{level}</div>
            </div>
            <div className="list-info__group">
              <div className="list-info__label">Бонусы с планеты (ST):</div>
              <div className="list-info__value">{sum}</div>
            </div>
            <div className="list-info__group">
              <div className="list-info__label">Осталось Комет:</div>
              <div className="list-info__value">{comets}</div>
            </div>
            <div className="list-info__group">
              <div className="list-info__label">Авто-продление:</div>
              <div className="list-info__value">
                <Button
                  onClick={handleOnChangeRefill}
                  disabled={isRefillLoading}
                  color="primary"
                  size="sm"
                >
                  {refill ? 'Выключить' : 'Включить'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MyPlanetsElement.propTypes = {
  planet: PropTypes.shape({
    id: PropTypes.number,
    level: PropTypes.number,
    sum: PropTypes.number,
    comets: PropTypes.number,
    dateCreate: PropTypes.string,
  }),
};

export default MyPlanetsElement;
