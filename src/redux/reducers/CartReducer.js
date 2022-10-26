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
        attr.items.find((item) => item.checked === true));


      if(state.cartItems.some(item => item.id === product.id &&
        item.attrSelected.every((attr, i) => 
        attr.value === attrSelected[i].value))) {
        
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === product.id &&
            item.attrSelected.every((attr, i) => 
            attr.value === attrSelected[i].value)
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
          totalQty: state.totalQty + 1,
        };
      } 
      else {
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
          totalQty: state.cartItems.reduce((acc, item) => acc + item.qty, 1),
        };
      }
    }

    case REMOVE_FROM_CART: {

      let item = action.payload;
      let itemToRemove = state.cartItems.find(
        (cartItem) => cartItem.id === item.id &&
        cartItem.attrSelected.every((attr, i) => 
        attr.value === item.attrSelected[i].value));

      let newState = {};

      if (itemToRemove.qty <= 1) {
        return (newState = {
          ...state,
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.id !== item.id ||
            !cartItem.attrSelected.every((attr, i) => 
            attr.value === item.attrSelected[i].value)),
          totalQty: state.totalQty - 1,
        });
      } 
      else {
        return (newState = {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === item.id &&
            cartItem.attrSelected.every((attr, i) => 
            attr.value === item.attrSelected[i].value)
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