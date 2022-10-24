import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../css/ProductDetails.css';
import store from "../redux/store";
import NotFound from '../components/NotFound';
import { ADD_TO_CART, CHANGE_GALLERY_IMG, UPDATE_ATTRIBUTES, UPDATE_WITH_ATTRIBUTES } from '../redux/types';

class ItemDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      currency: {},
      pdtAttributes: {},
    }
    
    this.setImage = this.setImage.bind(this);
    this.radioChangeEvent = this.radioChangeEvent.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  static getDerivedStateFromProps(props, state) {

    const { productDetails } = props;

    if(productDetails) {
      return {
        pdtAttributes: props.productDetails
      }
    }

    // if(props.cartItem.length > 0 && props.cartItem
    //   .find(item => item.id === props.product.id) !== undefined) {
    //   return {
    //     product: props.cartItem.find(item => item.id === props.product.id),
    //     currency: props.currency
    //   }
    // }

    // else if(props.productDetails !== undefined && props.productDetails !== null) {
    //   return {
    //     product: props.productDetails,
    //     currency: props.currency
    //   }
    // }

    // else if(props.products !== undefined && props.products !== null) {
    //   let urlId = window.location.pathname.split('/')[2];
    //   return {
    //     product: props.products.find(product => product.id === urlId),
    //     currency: props.currency
    //   }
    // }
    return null
  }

  setImage = (image) => () => {
    store.dispatch({
      type: CHANGE_GALLERY_IMG,
      payload: image
    })
  }

  radioChangeEvent = (product, attr) => (e) => { 

    store.dispatch({
      type: UPDATE_ATTRIBUTES,
      payload: {
        product: product,
        attribute: attr,
        id: e.target.id
      }

    })
  }

  addToCart = (product) => () => {
    store.dispatch({
      type: ADD_TO_CART,
      payload: product
    });
  }

  render() {

    return (
      <>
        {this.props.product !== undefined && this.props.product !== null 
          && this.props.currency !== undefined
          ?(
            <div className="item-detail-grid">
              <div className="item-detail-images">
                {
                  this.props.product.gallery.map((image, index) => (
                    <div className="item-image" key={index} 
                                  onClick={this.setImage(image)}>
                      <img src={image} alt="product" />
                    </div>
                  ))
                }
              </div>
              <div className="item-detail-main-img">
                <div className="main-img">
                  <img src={this.props.imageChange} alt="product" />
                </div>
              </div>
              <div className="item-detail-cart">
                <div className="cart-detail-container">
                  <div className="item-detail-header">
                    <p style={{fontWeight: "600"}}>{this.props.product.brand}</p>
                    <p>{this.props.product.name}</p>
                  </div>
                  <div className="item-detail-body">
                    {
                      this.props.product.attributes.length > 0 ? (
                        this.props.product.attributes.slice(0, 2).map((attr, index) => 
                          <div className="item-attributes-container" key={index}>
                            <div className="item-attributes-name">
                              <span>{attr.name}</span>
                            </div>
                            <div className="item-attributes-values">
                              {
                                attr.items.map((property, index) => (
                                  <div className={attr.type === 'swatch' ? 'attr-swatch-val' : 'attr-value'} key={index}>
                                    <input type="radio" name={attr.name} 
                                              id={property.id}
                                              value={property.value}
                                              style={{display: "none"}} 
                                              onChange={this.radioChangeEvent(this.props.productDetails, attr)} />
                                    <label htmlFor={property.id}>
                                    <div className={attr.type === 'swatch' ? 'item-properties-swatch' : 'item-property-txt'} 
                                          style={ property.checked && attr.type === 'text' 
                                          ? {backgroundColor: "red", color: "#fff"} 
                                          : property.checked && attr.type === 'swatch' 
                                          ? {outline: "2px solid black", 
                                            outlineOffset: "1px", 
                                            outlineColor: "rgba(94, 206, 123, 1)",
                                            backgroundColor: property.value} : attr.type === 'swatch' 
                                            ? {backgroundColor: property.value} : null}>
                                      <span>{attr.type === 'swatch' ? (null) : (property.value)}</span>
                                    </div>
                                    </label>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        )
                      ) : null
                    }
                    <div className='item-detail-price'>
                      <div className="item-attributes-name">
                        <span>{"Price"}</span>
                      </div>
                      <div className="item-price-value">
                        <span>
                          {this.props.currency.symbol}{` `}
                          {this.props.product.prices.filter(price => 
                            price.currency.symbol === this.props.currency.symbol)[0].amount}
                        </span>
                      </div>
                    </div>
                    <div className="item-detail-btn">
                      <button className="add-to-cart-btn" onClick={this.addToCart(this.props.productDetails)}>Add to Cart</button>
                    </div>
                    <div className="item-detail-description" 
                    dangerouslySetInnerHTML={{__html: this.props.product.description}} ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (<NotFound />)
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencySelected[0],
    cartItems: state.cart.cartItems,
    products: state.products,
    productDetails: state.productDetails,
    imageChange: state.imageChange
  }
}

export default connect(mapStateToProps)(ItemDetails);