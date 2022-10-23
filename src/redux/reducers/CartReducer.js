import store from "../store";
import {
  ADD_TO_CART,
  ADD_TO_CART_WITH_ATTRIBUTES,
  REMOVE_FROM_CART,
} from "../types";

const initialState = {
  cartItems: [],
  totalQty: 0,
};

export const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let product = action.payload;
      let inCart = false;
      // let ItemSame = state.cartItems.filter((itm) => itm.name === product.name);

      state.cartItems.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          inCart = true;
        }
      });

      // if(state.cartItems.length > 0 && ItemSame !== undefined && inCart === true){
        
      //   console.log("Condition Satisfied", ItemSame);

      //   let filtered = [];

      //   ItemSame.map((item) => {
      //     item.attributes.map((attr) => {
      //       filtered.push(attr.items.find((itm) => itm.checked === true));
      //     });
      //   });
      //   console.log("filtered", filtered);
        
      // }
      
      return {
        ...state,
        cartItems: inCart // is false
          ? state.cartItems.map((cartItem) =>
              cartItem.id === product.id
                ? {
                    ...cartItem,
                    qty: cartItem.qty + 1,
                  }
                : cartItem
            )
          : [
            ...state.cartItems, 
            { 
              ...product, 
              attrSelected: product.attributes.map((attr) => 
                attr.items.find((itm) => itm.checked === true)),
              qty: 1,
          }], // inCart is true

        totalQty: state.cartItems.reduce((acc, item) => acc + item.qty, 1),
      };
      
      // return {
      //   ...state,
      //   cartItems: inCart
      //     ? state.cartItems.map((cartItem) =>
      //         cartItem.id === item.id
      //           ? {
      //               ...cartItem,
      //               qty: cartItem.qty + 1,
      //             }
      //           : cartItem
      //       )
      //     : [...state.cartItems, { ...item, qty: 1 }],

      //   totalQty: state.cartItems.reduce((acc, item) => acc + item.qty, 1),
      // };
    }

    case ADD_TO_CART_WITH_ATTRIBUTES: {
      let item = action.payload;

      return {
        ...state,
      }
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

    default:
      return state;
  }
};