import uniq from 'lodash-es/uniq';
import isEmpty from 'lodash-es/isEmpty';
import omit from 'lodash-es/omit';

import * as ActionTypes from '../constants/startrek.constants';
import { getStartrekTimer } from 'utils';

const initialState = {
  list: [],
  query: {
    limit: 8,
    offset: 0,
    name: '',
  },
  meta: {
    total: 0,
    page: 0,
  },
  table: [],
  statistic: {
    active: 0,
    negative: 0,
  },
  selected: [],
  statistics: null,
  launchMy: null,
  timer: getStartrekTimer(),
  loadings: {
    list: false,
    table: false,
    statistics: false,
    update: false,
    refill: false,
    launch: false,
    buy: false,
  },
  errors: {
    list: null,
    table: null,
    statistics: null,
    update: null,
    refill: null,
    launch: null,
    buy: null,
  },
  modals: {
    renewal: false,
    launch: false,
  },
};

const startrekReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STARTREK_STATISTICS_REQUEST: {
      return {
        ...state,
        loadings: { ...state.loadings, statistics: true },
        errors: { ...state.errors, statistics: null },
      };
    }
    case ActionTypes.STARTREK_STATISTICS_SUCCESS: {
      return {
        ...state,
        statistics: Object.assign({}, ...action.payload),
        loadings: { ...state.loadings, statistics: false },
        errors: { ...state.errors, statistics: null },
      };
    }
    case ActionTypes.STARTREK_STATISTICS_ERROR: {
      return {
        ...state,
        loadings: { ...state.loadings, statistics: false },
        errors: { ...state.errors, statistics: action.payload },
      };
    }

    case ActionTypes.STARTREK_STATISTIC_REQUEST: {
      return {
        ...state,
        loadings: { ...state.loadings, table: true },
        errors: { ...state.errors, table: null },
      };
    }
    case ActionTypes.STARTREK_STATISTIC_SUCCESS: {
      const active = Number(action.payload.active);
      const all = Number(action.payload.all);
      return {
        ...state,
        table: action.payload.items,
        statistic: { active, inactive: all - active },
        loadings: { ...state.loadings, table: false },
        errors: { ...state.errors, table: null },
      };
    }
    case ActionTypes.STARTREK_STATISTIC_ERROR: {
      return {
        ...state,
        loadings: { ...state.loadings, table: false },
        errors: { ...state.errors, table: action.payload },
      };
    }

    case ActionTypes.STARTREK_BUY_REQUEST: {
      return {
        ...state,
        loadings: { ...state.loadings, buy: true },
        errors: { ...state.errors, buy: null },
      };
    }
    case ActionTypes.STARTREK_BUY_SUCCESS: {
      return {
        ...state,
        timer: action.payload,
        loadings: { ...state.loadings, buy: false },
        errors: { ...state.errors, buy: null },
      };
    }
    case ActionTypes.STARTREK_BUY_ERROR: {
      return {
        ...state,
        loadings: { ...state.loadings, buy: false },
        errors: { ...state.errors, buy: action.payload },
      };
    }

    case ActionTypes.STARTREK_RESET_TIMER: {
      return { ...state, timer: getStartrekTimer() };
    }

    case ActionTypes.STARTREK_PLANETS_REQUEST:
    case ActionTypes.STARTREK_FIRST_LINE_PLANETS_REQUEST: {
      const query = action.payload?.query;
      const meta = omit(action.payload?.meta, 'total');
      return {
        ...state,
        meta: { ...state.meta, page: 0, ...meta },
        query: { ...state.query, offset: 0, name: '', ...query },
        loadings: { ...state.loadings, list: true },
        errors: { ...state.errors, list: null },
        selected: [],
      };
    }
    case ActionTypes.STARTREK_PLANETS_SUCCESS:
    case ActionTypes.STARTREK_FIRST_LINE_PLANETS_SUCCESS: {
      const { total, items } = action.payload;

      return {
        ...state,
        list: items,
        meta: { ...state.meta, total: Number(total) },
        loadings: { ...state.loadings, list: false },
        errors: { ...state.errors, list: null },
      };
    }
    case ActionTypes.STARTREK_PLANETS_ERROR:
    case ActionTypes.STARTREK_FIRST_LINE_PLANETS_ERROR: {
      return {
        ...state,
        loadings: { ...state.loadings, list: false },
        errors: { ...state.errors, list: action.payload },
      };
    }

    case ActionTypes.SET_STARTREK_PLANETS_PAGE:
    case ActionTypes.SET_STARTREK_FIRST_LINE_PLANETS_PAGE: {
      const page = action.payload;
      return {
        ...state,
        selected: [],
        meta: { ...state.meta, page },
        query: { ...state.query, offset: state.query.limit * page },
        loadings: { ...state.loadings, list: true },
        errors: { ...state.errors, list: null },
      };
    }

    case ActionTypes.SET_STARTREK_FIRST_LINE_PLANETS_SEARCH: {
      const name = action.payload;
      return {
        ...state,
        meta: { ...state.meta, page: 0 },
        query: { ...state.query, offset: 0, name },
        loadings: { ...state.loadings, list: true },
        errors: { ...state.errors, list: null },
      };
    }

    case ActionTypes.STARTREK_PLANETS_UPDATE_REQUEST: {
      return {
        ...state,
        loadings: { ...state.loadings, update: true },
        errors: { ...state.errors, update: null },
      };
    }
    case ActionTypes.STARTREK_PLANETS_UPDATE_SUCCESS: {
      return {
        ...state,
        selected: [],
        loadings: { ...state.loadings, update: false },
        errors: { ...state.errors, update: null },
      };
    }
    case ActionTypes.STARTREK_PLANETS_UPDATE_ERROR: {
      return {
        ...state,
        loadings: { ...state.loadings, update: false },
        errors: { ...state.errors, update: action.payload },
      };
    }

    case ActionTypes.SET_PLANET_FOR_UPDATE: {
      const newSelected = !state.selected.includes(action.payload)
        ? uniq([...state.selected, action.payload])
        : state.selected.filter(id => id !== action.payload);
      return { ...state, selected: newSelected };
    }

    case ActionTypes.TOGGLE_ALL_PLANET_ON_PAGE: {
      let newSelected = [];
      if (!isEmpty(state.list) && state.list.length !== state.selected.length) {
        newSelected = state.list.map(planet => planet.id);
      } else if (state.list.length === state.selected.length) {
        newSelected = [];
      }

      return { ...state, selected: newSelected };
    }

    case ActionTypes.CHANGE_AUTO_REFILL_PLANET_REQUEST: {
      return {
        ...state,
        loadings: { ...state.loadings, refill: true },
        errors: { ...state.errors, refill: null },
      };
    }
    case ActionTypes.CHANGE_AUTO_REFILL_PLANET_SUCCESS: {
      const newList = state.list.map(planet => {
        if (planet.id === action.payload.id) {
          return { ...planet, refill: action.payload.auto };
        } else {
          return planet;
        }
      });
      return {
        ...state,
        list: newList,
        loadings: { ...state.loadings, refill: false },
        errors: { ...state.errors, refill: null },
      };
    }
    case ActionTypes.CHANGE_AUTO_REFILL_PLANET_ERROR: {
      return {
        ...state,
        loadings: { ...state.loadings, refill: false },
        errors: { ...state.errors, refill: action.payload },
      };
    }

    case ActionTypes.TOGGLE_RENEWAL_PLANETS_MODAL: {
      const newValue = action.payload ? action.payload : !state.modals.renewal;

      return { ...state, modals: { ...state.modals, renewal: newValue } };
    }

    case ActionTypes.TOGGLE_COMET_LAUNCH_MODAL: {
      const newValue = action.payload.visible
        ? action.payload.visible
        : !state.modals.launch;

      return {
        ...state,
        launchMy: newValue ? action.payload.launchMy : null,
        modals: { ...state.modals, launch: newValue },
      };
    }

    default:
      return state;
  }
};

export default startrekReducer;
