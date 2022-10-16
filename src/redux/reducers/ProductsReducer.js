import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_CATEGORY,
  PRODUCT_DETAILS,
} from "../types";

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

export const filteredProductsReducer = (state = [], action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_BY_CATEGORY:
      return action.payload;

    default:
      return state;
  }
};

export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};
