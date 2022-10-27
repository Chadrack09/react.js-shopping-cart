import client from "../../service/Client";
import { FETCH_CURRENCIES_QUERY } from "../../service/Queries";
import { CURRENCY_SELECTED, FETCH_CURRENCIES } from "../types";

export const fetchCurrenciesActions = () => async (dispatch) => {
  let { data } = await client
    .query({
      query: FETCH_CURRENCIES_QUERY,
    })
    .catch((err) => console.log(err));

  dispatch({
    type: FETCH_CURRENCIES,
    payload: data.currencies,
  });
};

export const setCurrencyAction = (currency) => (dispatch) => {
  dispatch({
    type: CURRENCY_SELECTED,
    payload: currency
  });
}
