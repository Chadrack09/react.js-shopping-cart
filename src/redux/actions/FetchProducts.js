import client from "../../service/Client";
import { FETCH_PRODUCTS_QUERY } from "../../service/Queries";
import { FETCH_PRODUCTS } from "../types";

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
};
