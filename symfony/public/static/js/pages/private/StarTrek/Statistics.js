import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatterNumber } from 'utils';
import { Link } from 'react-router-dom';

import r from 'constants/routes.constants';
import * as actions from 'actions/startrek.actions';
import Button from 'components/Button';

function Statistics() {
  const dispatch = useDispatch();
  const statistics = useSelector(state => state.startrek.statistics);

  // false launch comet to structure
  const handleCometLaunch = (launchMy = false) => {
    dispatch(actions.toggleCometLaunchModal(true, launchMy));
  };
  return (
    statistics && (
      <ul className="startrek__statistics">
        <li>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.allPlanet)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
          <div>Куплено планет</div>
        </li>
        <li>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.myPlanet)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
          <div>Мои планеты</div>
        </li>
        <li>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.allComet)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
          <div>Всего комет</div>
        </li>
        <li>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.myComet)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
          <div>Мои кометы</div>
        </li>
        <li>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.structurePlanet)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
          <div>Планет в структуре</div>
        </li>
        <li>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.firstLinePlanet)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
          <div>Планет в первой линии</div>
          <Button tag={Link} to={r.starTrekFirstLinePlanets} color="link">
            Перейти
          </Button>
        </li>
        <li>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.my)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
          <div>Комет в “Мои планеты”</div>
          <Button color="link" onClick={() => handleCometLaunch(true)}>
            Запустить
          </Button>
        </li>
        <li>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.structure)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
          <div>Комет в структуру</div>
          <Button color="link" onClick={() => handleCometLaunch()}>
            Запустить
          </Button>
        </li>
        <li className="--full">
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.myInviterIncome)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
          <div>Кураторские</div>
        </li>
      </ul>
    )
  );
}

export default Statistics;
