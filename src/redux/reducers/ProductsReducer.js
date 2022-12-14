import { CHANGE_GALLERY_IMG, CHANGE_PRICE, FETCH_PRODUCTS, FILTER_PRODUCTS_BY_CATEGORY, 
  PRODUCT_DETAILS, UPDATE_ATTRIBUTES} from "../types";

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};
export const filteredProductsReducer = (state = [], action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_BY_CATEGORY:
      return action.payload;

    case CHANGE_PRICE: {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.product.id
            ? { 
              ...product,
              prices: product.prices.map((price) =>
                price.currency.symbol === action.payload.symbol
                  ? {
                      ...price,
                      amount: action.payload.price,

                  }
                  : price
              ),
            }
            : product
        ),
      }
    }

    default:
      return state;
  }
};

export const productDetailsReducer = (state = [], action) => {

  switch (action.type) {
    case PRODUCT_DETAILS: {
      return {
        ...action.payload,
        attrSelected: action.payload.attributes.map((attr) => 
              attr.items.find( item => item.checked === true)),
      };
    }
    
    case UPDATE_ATTRIBUTES: {
      let product = action.payload.product;

      return {
        ...product,
        attributes: state.attributes.map((attribute) =>
          attribute.name === action.payload.attribute.name
            ? {
                ...attribute,
                items: attribute.items.map((item) => {
                  const check = item.id === action.payload.id ? true : false;
                  return {
                    ...item,
                    checked: check,
                  };
                }),
              }
            : attribute
        ),
        attrSelected: state.attributes.map((attr) =>
        attr.items.find((itm) => itm.checked === true)),
      };
    }

    case CHANGE_PRICE: {
      return {
        ...state,
        prices: state.prices.map((price) => 
          price.currency.symbol === action.payload.symbol
          ? {
            ...price,
            amount: action.payload.price,
          }
          : price
        )
      }
    }

    default:
      return state;
  }
};

export const changeGalleryImageReducer = (state = "", action) => {
  switch (action.type) {
    case CHANGE_GALLERY_IMG: {
      return action.payload;
    }

    default:
      return state;
  }
};
