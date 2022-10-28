import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from "../assets/svg/CartIconLight.svg";
import { addToCartAction } from '../redux/actions/Cart';
import { changeGalleryImgAction, filterProductsByCategory, 
  productDetailsAction } from '../redux/actions/FetchProducts';

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
    this.itemClickEvent = this.itemClickEvent.bind(this);
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
    this.props.addToCart(product);
  }

  itemClickEvent = (item) => () => {
    this.props.productDetailsAction(item);
    this.props.changeGalleryImg(item.gallery[0]);
  }

  render() {

    return (
        this.state.productsFiltered.length > 0 ?
        (
          this.state.productsFiltered.map((item, index) => (
          <div className="card-item" key={index}>
            <div className="card-block">
              <span className={ !item.inStock ? "stock-state" : "" }>
                { item.inStock ? "" : (<p className="stock-text">out of stock</p>) }</span>
              <div className="card-image">
                <Link to={`/${item.brand}${item.name}/${item.id}`} >
                  <img
                    className="card-image-item"
                    src={item.gallery[0]}
                    alt={item.name}
                    onClick={this.itemClickEvent(item)} />
                </Link>
              </div>
                <div className="break">
                  <div className="logo-add-to-cart" onClick={this.addToCartClickEvent(item)} >
                    <img className={`logo-light`} src={Logo} alt="item" />
                  </div>
                </div>
              <div className="card-text" style={{ fontSize: "18px" }}>
                <div className="card-title">{`${item.brand} ${item.name}`}</div>
                <div className="card-price" style={{ fontWeight: "500" }}>
                  {this.state.currency.symbol === null 
                      ? this.state.symbol : this.state.currency.symbol}
                  {item.prices.filter(price => price.currency.symbol 
                      === this.state.currency.symbol)[0].amount}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (<div>Card Loading...</div>)
    )
  }     
}

const mapStateToProps = state => ({
  products: state.products,
  productsFiltered: state.productsFiltered.products,
  category: state.categorySelected,
  currency: state.currencySelected,
  productDetails: state.productDetails,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
    filterProductsByCategory: (category) => 
    dispatch(filterProductsByCategory(category)),
    productDetailsAction: (product) => dispatch(productDetailsAction(product)),
    changeGalleryImg: (img) => dispatch(changeGalleryImgAction(img)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);