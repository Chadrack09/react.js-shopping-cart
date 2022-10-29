import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "../components/Button";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ADD_TO_CART } from "../redux/types";
/**
 * Cart Reducer Test
 * @see https://testing-library.com/docs/react-testing-library/intro
 * @see https://jestjs.io/docs/en/getting-started
 */


test("Test Add To Cart Action And Reducer", () => {
  let product = {
    "id": "new-nike-shoes",
    "brand": "Nike x Stussy",
    "name": "Nike Air Huarache Le",
    "inStock": true,
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087"
    ],
    "attributes": [
      {
        "name": "Size",
        "type": "text",
        "items": [
          {
            "displayValue": "40",
            "value": "40",
            "id": "40",
            "checked": true
          },
          {
            "displayValue": "41",
            "value": "41",
            "id": "41",
            "checked": false
          },
          {
            "displayValue": "42",
            "value": "42",
            "id": "42",
            "checked": false
          },
          {
            "displayValue": "43",
            "value": "43",
            "id": "43",
            "checked": false
          }
        ]
      }
    ],
    "prices": [
      {
        "currency": {
          "symbol": "$"
        },
        "amount": 144.69
      },
      {
        "currency": {
          "symbol": "£"
        },
        "amount": 104
      },
      {
        "currency": {
          "symbol": "A$"
        },
        "amount": 186.65
      },
      {
        "currency": {
          "symbol": "¥"
        },
        "amount": 15625.24
      },
      {
        "currency": {
          "symbol": "₽"
        },
        "amount": 10941.76
      }
    ],
    "description": "<p>Great sneakers for everyday use!</p>",
    "category": "clothes"
  };

  store.dispatch({ 
    type: ADD_TO_CART, 
    payload: product
  });

  expect(store.getState().cart.cartItems.length).toBe(1);
  expect(store.getState().cart.totalQty).toBe(1);
});