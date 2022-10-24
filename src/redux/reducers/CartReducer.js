import {
  ADD_TO_CART,
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
      let attrSelected = product.attributes.map((attr) =>
        attr.items.find((item) => item.checked === true))

      // let inCart = false;
      
      // state.cartItems.forEach((cartItem) => {
      //   // if (cartItem.id === product.id) {
      //   if (cartItem.id === product.id) {
      //     inCart = true;
      //   }
      // });

      if(state.cartItems.some(item => item.id === product.id &&
        item.attrSelected.every((attr, i) => attr.value === attrSelected[i].value))) {
        
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === product.id &&
            item.attrSelected.every((attr, i) => attr.value === attrSelected[i].value)
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
          totalQty: state.totalQty + 1,
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              ...product,
              qty: 1,
              attrSelected: attrSelected,
            },
          ],
          totalQty: state.totalQty + 1,
        };
      }
      
      // return {
      //   ...state,
      //   cartItems: inCart // is true
      //     ? state.cartItems.map((cartItem) =>
      //         // check if attrSelected is equal to cartAttrSelected
      //         // attrSelected.length === cartAttrSelected.length &&
      //         attrSelected.every((attr, i) => attr.id === cartAttrSelected[i].id)
      //           ? { ...cartItem, qty: cartItem.qty + 1 }
      //           : // 
      //           // : [...state.cartItems, { ...product, qty: 1 }]
      //       )
          
      //     : [
      //       ...state.cartItems, 
      //       { 
      //         ...product, 
      //         attrSelected: product.attributes.map((attr) => 
      //           attr.items.find((itm) => itm.checked === true)),
      //         qty: 1,
      //     }], // inCart is false

      //   totalQty: state.cartItems.reduce((acc, item) => acc + item.qty, 1),

      // return { // good one
      //   ...state,
      //   cartItems: inCart // is false
      //     ? state.cartItems.map((cartItem) =>
      //         cartItem.id === product.id
      //           ? {
      //               ...cartItem,
      //               attrSelected: // compare cartItem.attrSelected with attrSelected
      //                 cartItem.attrSelected === attrSelected
      //                   ? cartItem.attrSelected
      //                   : attrSelected,
                        
      //               qty: cartItem.qty + 1,
      //             }
      //           : cartItem
      //       )
      //     : [
      //       ...state.cartItems, 
      //       { 
      //         ...product, 
      //         attrSelected: product.attributes.map((attr) => 
      //           attr.items.find((itm) => itm.checked === true)),
      //         qty: 1,
      //     }], // inCart is true

      //   totalQty: state.cartItems.reduce((acc, item) => acc + item.qty, 1),
      // };
      
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