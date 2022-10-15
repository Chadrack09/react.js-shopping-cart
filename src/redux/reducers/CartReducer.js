import store from "../store";
import { ADD_TO_CART } from "../types";

const initialState = {
  cartItems: [],
  totalQty: 0,
  totalAmount: 0,
};

export const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let item = action.payload.product;
      let inCart = false;

      state.cartItems.forEach((cartItem) => {
        if (cartItem.id === item.id) {
          inCart = true;
        }
      });

      console.log("Already in cart", inCart);
      console.log("Item From PayLoad", item);

      return {
        cartItems: inCart
          ? state.cartItems.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, qty: cartItem.qty + 1 }
                : cartItem
            )
          : [...state.cartItems, { ...item, qty: 1 }],
        totalQty: state.totalQty + 1,
        totalAmount: 0,
      };
    }

    default:
      return state;
  }
};
