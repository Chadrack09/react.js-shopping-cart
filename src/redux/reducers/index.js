import { combineReducers } from "redux";
import { addToCartReducer } from "./CartReducer";
import { categoriesReducer, categoryReducer } from "./CategoriesReducer";
import {currenciesReducer, currencySelectedReducer} from "./CurrenciesReducer";
import {changeGalleryImageReducer,filteredProductsReducer,
  productDetailsReducer,productsReducer} from "./ProductsReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  productsFiltered: filteredProductsReducer,
  productDetails: productDetailsReducer,
  categories: categoriesReducer,
  categorySelected: categoryReducer,
  currencies: currenciesReducer,
  currencySelected: currencySelectedReducer,
  cart: addToCartReducer,
  imageChange: changeGalleryImageReducer,
});

export default rootReducer;
