import { takeEvery, call, put, all, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

import * as ActionTypes from '../constants/startrek.constants';
import * as actions from '../actions/startrek.actions';
import * as api from '../api/startrek.api';

export function* startrekStatistics() {
  try {
    const response = yield all([
      call(api.startrekStatistics),
      call(api.getInstallMatrix),
    ]);
    if (response) {
      yield put(actions.startrekStatisticsSuccess(response));
    }
  } catch (error) {
    yield put(actions.startrekStatisticsError(error));

    toast.error(error.message);
  }
}

export function* startrekStatistic() {
  try {
    const response = yield call(api.startrekStatistic);
    if (response) {
      yield put(actions.startrekStatisticsSuccess(response));
    }
  } catch (error) {
    yield put(actions.startrekStatisticError(error));

    toast.error(error.message);
  }
}

export function* startrekBuy() {
  try {
    const response = yield call(api.startrekBuy);
    if (response) {
      const timer = dayjs().add(15, 's').format();
      localStorage.setItem('s', timer);
      yield put(actions.startrekBuySuccess(timer));
      yield put(actions.startrekStatistics());
    }
  } catch (error) {
    yield put(actions.startrekBuyError(error));

    toast.error(error.message);
  }
}

export function* startrekPlanets() {
  const { startrek } = yield select();
  try {
    const response = yield call(api.startrekPlanets, startrek.query);
    if (response) {
      yield put(actions.startrekPlanetsSuccess(response));
    }
  } catch (error) {
    yield put(actions.startrekPlanetsError(error));

    toast.error(error.message);
  }
}

export function* startrekFirstLinePlanets() {
  const { startrek } = yield select();
  try {
    const response = yield call(api.startrekFirstLinePlanets, startrek.query);
    if (response) {
      yield put(actions.startrekFirstLinePlanetsSuccess(response));
    }
  } catch (error) {
    yield put(actions.startrekFirstLinePlanetsError(error));

    toast.error(error.message);
  }
}

export function* startrekPlanetsUpdate({ payload }) {
  const { startrek } = yield select();
  try {
    const response = yield call(api.startrekPlanetsUpdate, {
      planets: startrek.selected,
      amount: payload.amount,
    });
    if (response) {
      yield put(actions.startrekPlanetsUpdateSuccess());
      yield put(actions.toggleRenewalPlanetsModal());
      if (payload.myPlanets) {
        yield put(
          actions.startrekPlanets({
            meta: startrek.meta,
            query: startrek.query,
          }),
        );
      } else {
        yield put(
          actions.startrekFirstLinePlanets({
            meta: startrek.meta,
            query: startrek.query,
          }),
        );
      }

      toast.success('Спасибо, ваши планеты получили заряд комет!');
    }
  } catch (error) {
    yield put(actions.startrekPlanetsUpdateError(error));

    toast.error(error.message);
  }
}

export function* changeAutoRefillPlanets({ payload }) {
  try {
    const response = yield call(api.changeAutoRefillPlanets, payload);
    if (response) {
      yield put(actions.changeAutoRefillPlanetsSuccess(payload));

      toast.success(
        `Автоматическое продление планеты ${
          payload.auto ? 'включено' : 'выключено'
        }`,
      );
    }
  } catch (error) {
    yield put(actions.changeAutoRefillPlanetsError(error));

    toast.error(error.message);
  }
}

export function* startrekCometLaunch({ payload }) {
  try {
    const response = yield call(api.startrekCometLaunch, payload);
    if (response) {
      yield put(actions.startrekCometLaunchSuccess());
      yield put(actions.toggleCometLaunchModal(false));
      yield put(actions.startrekStatistics());
      toast.success('Поздравляем, Ваши кометы полетели!');
    }
  } catch (error) {
    yield put(actions.startrekCometLaunchError(error));

    toast.error(error.message);
  }
}

export default function* mainSaga() {
  yield all([
    takeEvery(
      ActionTypes.STARTREK_PLANETS_UPDATE_REQUEST,
      startrekPlanetsUpdate,
    ),
    takeEvery(ActionTypes.STARTREK_PLANETS_REQUEST, startrekPlanets),
    takeEvery(ActionTypes.STARTREK_STATISTIC_REQUEST, startrekStatistic),
    takeEvery(ActionTypes.STARTREK_STATISTICS_REQUEST, startrekStatistics),
    takeEvery(ActionTypes.SET_STARTREK_PLANETS_PAGE, startrekPlanets),
    takeEvery(
      ActionTypes.STARTREK_FIRST_LINE_PLANETS_REQUEST,
      startrekFirstLinePlanets,
    ),
    takeEvery(
      ActionTypes.SET_STARTREK_FIRST_LINE_PLANETS_PAGE,
      startrekFirstLinePlanets,
    ),
    takeEvery(
      ActionTypes.SET_STARTREK_FIRST_LINE_PLANETS_SEARCH,
      startrekFirstLinePlanets,
    ),
    takeEvery(ActionTypes.STARTREK_BUY_REQUEST, startrekBuy),
    takeEvery(
      ActionTypes.CHANGE_AUTO_REFILL_PLANET_REQUEST,
      changeAutoRefillPlanets,
    ),
    takeEvery(ActionTypes.STARTREK_COMET_LAUNCH_REQUEST, startrekCometLaunch),
  ]);
}
