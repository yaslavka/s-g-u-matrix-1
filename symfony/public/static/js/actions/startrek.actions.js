import * as ActionTypes from '../constants/startrek.constants';

/* Startrek Statistics */
export const startrekStatistics = () => ({
  type: ActionTypes.STARTREK_STATISTICS_REQUEST,
});
export const startrekStatisticsSuccess = statistics => ({
  type: ActionTypes.STARTREK_STATISTICS_SUCCESS,
  payload: statistics,
});
export const startrekStatisticsError = error => ({
  type: ActionTypes.STARTREK_STATISTICS_ERROR,
  payload: error,
});

/* Startrek Statistic */
export const startrekStatistic = () => ({
  type: ActionTypes.STARTREK_STATISTIC_REQUEST,
});
export const startrekStatisticError = error => ({
  type: ActionTypes.STARTREK_STATISTIC_ERROR,
  payload: error,
});

/* Startrek Buy */
export const startrekBuy = () => ({ type: ActionTypes.STARTREK_BUY_REQUEST });
export const startrekBuySuccess = timer => ({
  type: ActionTypes.STARTREK_BUY_SUCCESS,
  payload: timer,
});
export const startrekBuyError = error => ({
  type: ActionTypes.STARTREK_BUY_ERROR,
  payload: error,
});

export const startrekResetTimer = () => ({
  type: ActionTypes.STARTREK_RESET_TIMER,
});

/* Startrek Planets */
export const startrekPlanets = filters => ({
  type: ActionTypes.STARTREK_PLANETS_REQUEST,
  payload: filters,
});
export const startrekPlanetsSuccess = planets => ({
  type: ActionTypes.STARTREK_PLANETS_SUCCESS,
  payload: planets,
});
export const startrekPlanetsError = error => ({
  type: ActionTypes.STARTREK_PLANETS_ERROR,
  payload: error,
});

export const setStartrekPlanetsPage = page => ({
  type: ActionTypes.SET_STARTREK_PLANETS_PAGE,
  payload: page,
});

/* Startrek First Line Planets */
export const startrekFirstLinePlanets = filters => ({
  type: ActionTypes.STARTREK_FIRST_LINE_PLANETS_REQUEST,
  payload: filters,
});
export const startrekFirstLinePlanetsSuccess = planets => ({
  type: ActionTypes.STARTREK_FIRST_LINE_PLANETS_SUCCESS,
  payload: planets,
});
export const startrekFirstLinePlanetsError = error => ({
  type: ActionTypes.STARTREK_FIRST_LINE_PLANETS_ERROR,
  payload: error,
});

export const setStartrekFirstLinePlanetsPage = page => ({
  type: ActionTypes.SET_STARTREK_FIRST_LINE_PLANETS_PAGE,
  payload: page,
});
export const setStartrekFirstLinePlanetsSearch = name => ({
  type: ActionTypes.SET_STARTREK_FIRST_LINE_PLANETS_SEARCH,
  payload: name,
});

/* Startrek Update Planets */
export const startrekPlanetsUpdate = (myPlanets = false, amount) => ({
  type: ActionTypes.STARTREK_PLANETS_UPDATE_REQUEST,
  payload: { myPlanets, amount },
});
export const startrekPlanetsUpdateSuccess = () => ({
  type: ActionTypes.STARTREK_PLANETS_UPDATE_SUCCESS,
});
export const startrekPlanetsUpdateError = error => ({
  type: ActionTypes.STARTREK_PLANETS_UPDATE_ERROR,
  payload: error,
});

export const setPlanetForUpdate = planetId => ({
  type: ActionTypes.SET_PLANET_FOR_UPDATE,
  payload: planetId,
});

export const toggleRenewalPlanetsModal = visible => ({
  type: ActionTypes.TOGGLE_RENEWAL_PLANETS_MODAL,
  payload: visible,
});

export const toggleAllPlanetOnPage = () => ({
  type: ActionTypes.TOGGLE_ALL_PLANET_ON_PAGE,
});

/* Change Auto Refill Planets */
export const changeAutoRefillPlanets = values => ({
  type: ActionTypes.CHANGE_AUTO_REFILL_PLANET_REQUEST,
  payload: values,
});
export const changeAutoRefillPlanetsSuccess = newValue => ({
  type: ActionTypes.CHANGE_AUTO_REFILL_PLANET_SUCCESS,
  payload: newValue,
});
export const changeAutoRefillPlanetsError = error => ({
  type: ActionTypes.CHANGE_AUTO_REFILL_PLANET_ERROR,
  payload: error,
});

// Comet Launch
export const startrekCometLaunch = amount => ({
  type: ActionTypes.STARTREK_COMET_LAUNCH_REQUEST,
  payload: amount,
});
export const startrekCometLaunchSuccess = () => ({
  type: ActionTypes.STARTREK_COMET_LAUNCH_SUCCESS,
});
export const startrekCometLaunchError = error => ({
  type: ActionTypes.STARTREK_COMET_LAUNCH_ERROR,
  payload: error,
});

export const toggleCometLaunchModal = (visible, launchMy) => ({
  type: ActionTypes.TOGGLE_COMET_LAUNCH_MODAL,
  payload: { visible, launchMy }
});
