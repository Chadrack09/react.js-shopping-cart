import store from "../store";
import { ADD_TO_CART } from "../types";

const initialState = {
  cartItems: [],
  totalQty: 0,
};

export const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let item = action.payload.product;
      let inCart = false;
      let currency = action.payload.currency;

      state.cartItems.forEach((cartItem) => {
        if (cartItem.id === item.id) {
          inCart = true;
        }
      });

      return {
        ...state,
        cartItems: inCart
          ? state.cartItems.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, qty: cartItem.qty + 1 }
                : cartItem
            )
          : [...state.cartItems, { ...item, qty: 1 }],

        totalQty: state.totalQty + 1,

        /* totalAmount: state.cartItems.reduce(
          (acc, item) =>
            (acc +=
              item.prices.filter(
                (price) => price.currency.symbol === currency.symbol
              )[0].amount * item.qty),
          state.totalAmount
        ) */
      };
    }

    default:
      return state;
  }
};
