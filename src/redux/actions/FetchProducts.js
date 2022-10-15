import client from "../../service/Client";
import {
  FETCH_ALL_PRODUCTS_QUERY,
  FETCH_PRODUCTS_QUERY,
} from "../../service/Queries";
import {
  FETCH_ALL_PRODUCTS,
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_CATEGORY,
} from "../types";

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
          items: attribute.items.map((item) => {
            return {
              ...item,
              checked: false, // This is the new property we are adding to the object
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

export const filterProductsByCategory = (products, categoryName) => (
  dispatch
) => {
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
