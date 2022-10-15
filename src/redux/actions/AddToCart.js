import { ADD_TO_CART } from "../types";

export const addToCartAction = (product) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: product,
  });
};
