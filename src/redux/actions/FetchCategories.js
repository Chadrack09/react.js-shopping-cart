import client from "../../service/Client";
import { FETCH_CATEGORIES_QUERY } from "../../service/Queries";
import { FETCH_CATEGORIES } from "../types";

export const fetchCategoriesActions = () => async (dispatch) => {
  let { data } = await client
    .query({
      query: FETCH_CATEGORIES_QUERY,
    })
    .catch((err) => console.log(err));

  dispatch({
    type: FETCH_CATEGORIES,
    payload: data.categories,
  });
};
