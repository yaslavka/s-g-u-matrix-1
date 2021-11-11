import * as ActionTypes from '../constants/casino.constants';

/* Casino Draw Prizes */
export const casinoDrawPrizes = () => ({
  type: ActionTypes.CASINO_DRAW_PRIZES_REQUEST,
});
export const casinoDrawPrizesSuccess = prizes => ({
  type: ActionTypes.CASINO_DRAW_PRIZES_SUCCESS,
  payload: prizes,
});
export const casinoDrawPrizesError = error => ({
  type: ActionTypes.CASINO_DRAW_PRIZES_ERROR,
  payload: error,
});

/* Casino Draw Create */
export const casinoDrawCreate = draw => ({
  type: ActionTypes.CASINO_DRAW_CREATE_REQUEST,
  payload: draw,
});
export let casinoDrawCreateSuccess;
casinoDrawCreateSuccess = draw => ({
  type: ActionTypes.CASINO_DRAW_CREATE_SUCCESS,
  payload: draw,
});
export let casinoDrawCreateError;
casinoDrawCreateError = error => ({
  type: ActionTypes.CASINO_DRAW_CREATE_ERROR,
  payload: error,
});

/* Casino Draw Buy */
export const casinoDrawBuy = draw => ({
  type: ActionTypes.CASINO_DRAW_BUY_REQUEST,
  payload: draw,
});
export let casinoDrawBuySuccess;
casinoDrawBuySuccess = draw => ({
  type: ActionTypes.CASINO_DRAW_BUY_SUCCESS,
  payload: draw,
});
export let casinoDrawBuyError;
casinoDrawBuyError = error => ({
  type: ActionTypes.CASINO_DRAW_BUY_ERROR,
  payload: error,
});

/* Casino Draw Cancel */
export let casinoDrawCancel;
casinoDrawCancel = drawId => ({
  type: ActionTypes.CASINO_DRAW_CANCEL_REQUEST,
  payload: {id: drawId},
});
export let casinoDrawCancelSuccess;
casinoDrawCancelSuccess = () => ({
  type: ActionTypes.CASINO_DRAW_CANCEL_SUCCESS,
});
export let casinoDrawCancelError;
casinoDrawCancelError = error => ({
  type: ActionTypes.CASINO_DRAW_CANCEL_ERROR,
  payload: error,
});

/* Casino Draw */
export const casinoDraw = drawId => ({
  type: ActionTypes.CASINO_DRAW_REQUEST,
  payload: drawId,
});
export let casinoDrawSuccess;
casinoDrawSuccess = draw => ({
  type: ActionTypes.CASINO_DRAW_SUCCESS,
  payload: draw,
});
export const casinoDrawError = error => ({
  type: ActionTypes.CASINO_DRAW_ERROR,
  payload: error,
});

/* Casino Draw My */
export let casinoDrawMy;
casinoDrawMy = drawId => ({
  type: ActionTypes.CASINO_DRAW_MY_REQUEST,
  payload: drawId,
});
export let casinoDrawMySuccess;
casinoDrawMySuccess = draw => ({
  type: ActionTypes.CASINO_DRAW_MY_SUCCESS,
  payload: draw,
});
export let casinoDrawMyError;
casinoDrawMyError = error => ({
  type: ActionTypes.CASINO_DRAW_MY_ERROR,
  payload: error,
});

/* Casino Active List */
export const casinoActiveList = () => ({
  type: ActionTypes.CASINO_ACTIVE_LIST_REQUEST,
});
export const casinoActiveListSuccess = draws => ({
  type: ActionTypes.CASINO_ACTIVE_LIST_SUCCESS,
  payload: draws,
});
export const casinoActiveListError = error => ({
  type: ActionTypes.CASINO_ACTIVE_LIST_ERROR,
  payload: error,
});

/* Casino List Changes */
export const setCasinoActiveListPage = page => ({
  type: ActionTypes.SET_CASINO_ACTIVE_LIST_PAGE,
  payload: { page },
});
export const setCasinoActiveListSearch = search => ({
  type: ActionTypes.SET_CASINO_ACTIVE_LIST_SEARCH,
  payload: { search },
});
export const setCasinoActiveCurrentDraw = draw => ({
  type: ActionTypes.SET_CASINO_ACTIVE_CURRENT_DRAW,
  payload: draw,
});

/* Casino Ended List */
export const casinoEndedList = () => ({
  type: ActionTypes.CASINO_ENDED_LIST_REQUEST,
});
export const casinoEndedListSuccess = draws => ({
  type: ActionTypes.CASINO_ENDED_LIST_SUCCESS,
  payload: draws,
});
export const casinoEndedListError = error => ({
  type: ActionTypes.CASINO_ENDED_LIST_ERROR,
  payload: error,
});

/* Casino List Changes */
export const setCasinoEndedListPage = page => ({
  type: ActionTypes.SET_CASINO_ENDED_LIST_PAGE,
  payload: { page },
});
export const setCasinoEndedIsMy = value => ({
  type: ActionTypes.SET_CASINO_ENDED_IS_MY,
  payload: value,
});
export let setCasinoActiveIsMy;
setCasinoActiveIsMy = value => ({
  type: ActionTypes.SET_CASINO_ACTIVE_IS_MY,
  payload: value,
});

export const toggleCasinoDrawCreateModal = visible => ({
  type: ActionTypes.TOGGLE_CASINO_DRAW_CREATE_MODAL,
  payload: visible,
});

export const toggleCasinoDrawBuyModal = visible => ({
  type: ActionTypes.TOGGLE_CASINO_DRAW_BUY_MODAL,
  payload: visible,
});
