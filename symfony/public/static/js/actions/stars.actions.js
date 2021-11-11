import * as ActionTypes from '../constants/stars.constants';

/* Stars Matrix Queue */
export let matrixQueue;
matrixQueue = (matrixType, filter) => ({
  type: ActionTypes.MATRIX_QUEUE_REQUEST,
  payload: {matrixType, filter},
});
export let matrixQueueSuccess;
matrixQueueSuccess = planets => ({
  type: ActionTypes.MATRIX_QUEUE_SUCCESS,
  payload: planets,
});
export let matrixQueueError;
matrixQueueError = error => ({
  type: ActionTypes.MATRIX_QUEUE_ERROR,
  payload: error,
});

export let setMatrixQueuePage;
setMatrixQueuePage = (page, matrixType) => ({
  type: ActionTypes.SET_MATRIX_QUEUE_PAGE,
  payload: {page, matrixType},
});
export let setMatrixQueueLine;
setMatrixQueueLine = (line, matrixType) => ({
  type: ActionTypes.SET_MATRIX_QUEUE_LINE,
  payload: {line, matrixType},
});
export let setMatrixQueueSearch;
setMatrixQueueSearch = (name, matrixType) => ({
  type: ActionTypes.SET_MATRIX_QUEUE_SEARCH,
  payload: {name, matrixType},
});
