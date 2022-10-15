import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from "../assets/svg/CartIconLight.svg";
import { addToCartAction } from '../redux/actions/AddToCart';
import { filterProductsByCategory } from '../redux/actions/FetchProducts';
import store from '../redux/store';
import { ADD_TO_CART, FILTER_PRODUCTS_BY_CATEGORY } from '../redux/types';

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      symbol: "₹",
      currency: {},
      products: [],
      productsFiltered: [],
      category: {},
    }

    this.addToCartClickEvent = this.addToCartClickEvent.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.products.length > 0 && props.currency.length > 0) {
      return {
        currency: props.currency[0],
        products: props.products,
        productsFiltered: props.productsFiltered,
        category: props.category,

      }
    }
    return null;
  }

  componentDidCatch(error, info) {
    console.log(error.message, info);
  }

  addToCartClickEvent = (product) => () => {
    store.dispatch({
      type: ADD_TO_CART,
      payload: {
        product: product,
      }
    });
    console.log("From addToCartClickEvent: ", product);
  }

  render() {

    return (
        this.state.productsFiltered.length > 0 ?
        (
          this.state.productsFiltered.map((item, index) => (
          <div className="card-item" key={index}>
            <span className={ !item.inStock ? "stock-state" : "" }>
              { item.inStock ? "" : (<p className="stock-text">out of stock</p>) }</span>
            <Link to={`/details/${item.id}`} /*onClick={this.itemDetailsEvent([item])} */ >
            <div className="card-image">
              <img
                className="card-image-item"
                src={item.gallery[0]}
                alt={item.name}
                /* onClick={this.itemClickEvent(item.inStock)} */ />
            </div>
            </Link>
            <div className="break">
              <div className="logo-container" onClick={this.addToCartClickEvent(item)} >
                <div style={{ width: "24px", height: "24px", marginLeft: "12px" }}>
                <img className={`logo-light`} src={Logo} alt="item" /></div>
              </div>
            </div>
            <div className="card-text" style={{ fontSize: "18px" }}>
              <div className="card-title">{item.name}</div>
              <div className="card-price" style={{ fontWeight: "500" }}>
                {
                    this.state.currency.symbol === null 
                    ? this.state.symbol : this.state.currency.symbol
                }
                { 
                  item.prices.filter(price => price.currency.symbol 
                    === this.state.currency.symbol)[0].amount
                }
              </div>
            </div>
          </div>
        ))
      ) : (<div>No Card Loaded...</div>)
    )
  }     
}

const mapStateToProps = state => ({
  products: state.products,
  productsFiltered: state.productsFiltered.products,
  category: state.categorySelected,
  currency: state.currencySelected,
  productsFiltered: state.productsFiltered.products
});

const mapDispatchToProps = (dispatch) => {
  return {
    filterProductsByCategory: (category) => 
    dispatch(filterProductsByCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);