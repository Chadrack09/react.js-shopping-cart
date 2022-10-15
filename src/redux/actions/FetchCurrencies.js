import client from "../../service/Client";
import { FETCH_CURRENCIES_QUERY } from "../../service/Queries";
import { FETCH_CURRENCIES } from "../types";

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

  // dispatch({
  //   type: CURRENCY_SELECTED,
  //   payload: data.currencies[0],
  // });
};
