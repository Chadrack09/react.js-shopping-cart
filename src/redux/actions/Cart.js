import { ADD_TO_CART, REMOVE_FROM_CART, 
  TOTAL_AMOUNT, UPDATE_ATTRIBUTES } from "../types";

export const addToCartAction = (product) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: product,
  });
};
export const removeFromCartAction = (product) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: product,
  });
};
export const updateAttributesAction = (product, attr, id) => (dispatch) => {
  dispatch({
    type: UPDATE_ATTRIBUTES,
    payload: {
      product: product,
      attribute: attr,
      id: id,
    }
  });
}
export const totalAmountAction = (totalAmount, tax) => (dispatch) => {
  dispatch({
    type: TOTAL_AMOUNT,
    payload: {
      totalAmount: totalAmount,
      tax: tax
    }
  });
}