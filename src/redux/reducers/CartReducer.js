import store from "../store";
import {
  ADD_TO_CART,
  ADD_TO_CART_WITH_ATTRIBUTES,
  REMOVE_FROM_CART,
  UPDATE_WITH_ATTRIBUTES,
} from "../types";

const initialState = {
  cartItems: [],
  totalQty: 0,
};

export const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let item = action.payload;
      let inCart = false;

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
                ? {
                    ...cartItem,
                    qty: cartItem.qty + 1,
                  }
                : cartItem
            )
          : [...state.cartItems, { ...item, qty: 1 }],

        totalQty: state.cartItems.reduce((acc, item) => acc + item.qty, 1),
      };
    }

    case REMOVE_FROM_CART: {
      let item = action.payload;

      let itemToRemove = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      let newState = {};

      if (itemToRemove.qty <= 1) {
        return (newState = {
          ...state,
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.id !== item.id
          ),
          totalQty: state.totalQty - 1,
        });
      } else {
        return (newState = {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, qty: cartItem.qty - 1 }
              : cartItem
          ),
          totalQty: state.totalQty - 1,
        });
      }
    }

    case UPDATE_WITH_ATTRIBUTES: {
      let item = action.payload;

      console.log("item", item);
    }

    default:
      return state;
  }
};
