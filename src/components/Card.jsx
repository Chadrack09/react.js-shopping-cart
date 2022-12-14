import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from "../assets/svg/CartIconLight.svg";
import { addToCartAction } from '../redux/actions/Cart';
import { changeGalleryImgAction, filterProductsByCategory, 
  productDetailsAction } from '../redux/actions/FetchProducts';
import ItemPrice from './ItemPrice';

  /**
   * Card component to display each product
   */
class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      symbol: "₹"
    }

    this.addToCartClickEvent = this.addToCartClickEvent.bind(this);
    this.itemClickEvent = this.itemClickEvent.bind(this);
  }

  componentDidCatch(error, info) {
    console.log(error.message, info);
  }

  /**
   * Adds to cart on green cart logo click event
   * @param {*} product 
   * @returns {void}
   */
  addToCartClickEvent = (product) => () => {
    this.props.addToCart(product);
  }

  /**
   * Redirects to product details page on image click event
   * @param {*} item - current product
   * @returns {void}
   */
  itemClickEvent = (item) => () => {
    this.props.productDetailsAction(item);
    this.props.changeGalleryImg(item.gallery[0]);
  }

  render() {

    return (
      this.props.productsFiltered !== undefined 
          && this.props.productsFiltered.length > 0 
      ? this.props.productsFiltered.map((item, index) => 
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
              <ItemPrice 
                symbol={this.props.currency.symbol}
                item={item} pfs={"18px"} pfw={"500"} imb={"0"} />
            </div>
          </div>
        </div>
      )
      : <div>Card Loading...</div>
    )
  }     
}

const mapStateToProps = state => ({
  products: state.products,
  category: state.categorySelected,
  currency: state.currencySelected[0],
  productDetails: state.productDetails,
  productsFiltered: state.productsFiltered.products,
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