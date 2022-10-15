import { combineReducers } from "redux";
import { categoriesReducer } from "./CategoriesReducer";
import {
  currenciesReducer,
  currencySelectedReducer,
} from "./CurrenciesReducer";
import { productsReducer } from "./ProductsReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  currencies: currenciesReducer,
  currencySelected: currencySelectedReducer,
});

export default rootReducer;
