import { CURRENCY_SELECTED, FETCH_CURRENCIES } from "../types";

export const currenciesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CURRENCIES:
      return action.payload;
    default:
      return state;
  }
};

export const currencySelectedReducer = (state = [], action) => {
  switch (action.type) {
    case CURRENCY_SELECTED:
      return [action.payload];
    default:
      return state;
  }
};
