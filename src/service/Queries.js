import { gql } from "@apollo/client";

export const FETCH_CATEGORIES_QUERY = gql`
  query categories {
    categories {
      name
    }
  }
`;

export const FETCH_CURRENCIES_QUERY = gql`
  query Currencies {
    currencies {
      label
      symbol
    }
  }
`;

export const FETCH_PRODUCTS_QUERY = gql`
  query category($input: CategoryInput) {
    category(input: $input) {
      products {
        id
        brand
        name
        inStock
        gallery
        attributes {
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            symbol
          }
          amount
        }
        description
        category
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query category($input: CategoryInput) {
    category(input: $input) {
      products {
        id
        brand
        name
        inStock
        gallery
        attributes {
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            symbol
          }
          amount
        }
        description
      }
    }
  }
`;
export const GET_PRODUCT_BY_ID_QUERY = gql`
  query Product($productId: String!) {
    product(id: $productId) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;