import client from "../../service/Client";
import {
  FETCH_PRODUCTS_QUERY, GET_PRODUCT_BY_ID_QUERY,
} from "../../service/Queries";
import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_CATEGORY,
} from "../types";

/**
 *
 * @param {Object} dispatch
 *
 * @description Fetches all products from server and dispatches the results
 * to redux store by adding a new property to the product object called `checked`
 * to set default attributes value.
 *
 * @type {Boolean} checked
 *
 * ```js
 * let destructuredData = data.category.products.map((product) => { --- line 38
 * return {
 *   ...item,
 *   checked: index === 0 ? true : false,
 * };
 *```
 * @see {@link src\redux\reducers\ProductsReducer.js:48} for more information
 * @author [Chaadrack B.](https://github.com/Chadrack09)
 *
 */
export const fetchProductsActions = () => async (dispatch) => {
  let { data } = await client
    .query({
      query: FETCH_PRODUCTS_QUERY,
    })
    .catch((err) => console.log(err));

  let destructuredData = data.category.products.map((product) => {
    return {
      ...product,
      attributes: product.attributes.map((attribute) => {
        return {
          ...attribute,
          items: attribute.items.map((item, index) => {
            return {
              ...item,
              checked: index === 0 ? true : false, // new property added to products
            };
          }),
        };
      }),
    };
  });

  dispatch({
    type: FETCH_PRODUCTS,
    payload: destructuredData,
  });

  dispatch({
    type: FILTER_PRODUCTS_BY_CATEGORY,
    payload: {
      categoryName: "all",
      products: destructuredData,
    },
  });
};

export const filterProductsByCategory = (products, categoryName) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_CATEGORY,
    payload: {
      category: categoryName,
      products:
        categoryName === "all"
          ? products
          : products.filter((product) => product.category === categoryName),
    },
  });
};

export async function getchProductById(id) {
  const { data } = await client.query({
    query: GET_PRODUCT_BY_ID_QUERY,
    variables: { 
      productId: id
    },
  });
  return data.product;
}
