import client from "../../service/Client";
import { FETCH_CATEGORIES_QUERY } from "../../service/Queries";
import { FETCH_CATEGORIES, SET_CATEGORY } from "../types";

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
  dispatch({
    type: SET_CATEGORY,
    payload: data.categories[0],
  });
};

export const setCategoryAction = (category) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY,
    payload: category
  });
};
