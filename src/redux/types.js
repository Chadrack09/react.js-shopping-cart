/* Action Types */
export const FETCH_PRODUCTS = "FETCH_ALL_PRODUCTS";
export const FETCH_CATEGORIES = "FETCH_ALL_CATEGORIES";
export const FETCH_CURRENCIES = "FETCH_ALL_CURRENCIES";

export const CURRENCY_SELECTED = "CURRENCY_SELECTED";
export const SET_CATEGORY = "SET_CATEGORY";
export const FILTER_PRODUCTS_BY_CATEGORY = "FILTER_PRODUCTS_BY_CATEGORY";

/** @description this action adds new item to cart and increase qty */
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_WITH_ATTRIBUTES = "ADD_TO_CART_WITH_ATTRIBUTES";

/** @description this action decreases item qty and remove when qty is 0 */
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const PRODUCT_DETAILS = "PRODUCT_DETAILS";
