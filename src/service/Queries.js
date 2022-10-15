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
