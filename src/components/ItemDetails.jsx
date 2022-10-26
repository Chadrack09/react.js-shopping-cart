import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../css/ProductDetails.css';
import store from "../redux/store";
import NotFound from '../components/NotFound';
import { ADD_TO_CART, CHANGE_GALLERY_IMG, UPDATE_ATTRIBUTES, UPDATE_WITH_ATTRIBUTES } from '../redux/types';
import Button from './Button';
import { addToCartAction } from '../redux/actions/Cart';
import ItemDes from './ItemDes';
import ItemPrice from './ItemPrice';
import ItemAttr from './ItemAttr';

class ItemDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      currency: {},
      pdtAttributes: {},
    }
    
    this.setImage = this.setImage.bind(this);
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
                    <div className="item-image-img" key={index} 
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
                <ItemDes
                  brand={this.props.product.brand} name={this.props.product.name} 
                  bfs={"30px"} bfw={"600"} bmb={"16px"} 
                  ifs={"30px"} ifw={"400"} imb={"43px"} />

                  <div className="item-detail-body">
                    {
                      this.props.product.attributes.length > 0 ? (

                        <ItemAttr
                          action={"change"}
                          cursor={"pointer"}
                          attributes={this.props.product.attributes} itemName={this.props.product.name}
                          aff={"Roboto Condensed"} afs={"18px"}
                          atw={"63px"} ath={"45px"} atfs={"16px"}
                          aswh={"32px"} />

                        // this.props.product.attributes.slice(0, 2).map((attr, index) => 
                        //   <div className="item-attributes-container" key={index}>
                        //     <div className="item-attributes-name">
                        //       <span>{attr.name}</span>
                        //     </div>
                        //     <div className="item-attributes-values">
                        //       {
                        //         attr.items.map((property, index) => (
                        //           <div className={attr.type === 'swatch' ? 'attr-swatch-val' : 'attr-value'} key={index}>
                        //             <input type="radio" name={attr.name} 
                        //                       id={property.id}
                        //                       value={property.value}
                        //                       style={{display: "none"}} 
                        //                       onChange={this.radioChangeEvent(this.props.productDetails, attr)} />
                        //             <label htmlFor={property.id}>
                        //             <div className={attr.type === 'swatch' ? 'item-properties-swatch' : 'item-property-txt'} 
                        //                   style={ property.checked && attr.type === 'text' 
                        //                   ? {backgroundColor: "red", color: "#fff"} 
                        //                   : property.checked && attr.type === 'swatch' 
                        //                   ? {outline: "2px solid black", 
                        //                     outlineOffset: "1px", 
                        //                     outlineColor: "rgba(94, 206, 123, 1)",
                        //                     backgroundColor: property.value} : attr.type === 'swatch' 
                        //                     ? {backgroundColor: property.value} : null}>
                        //               <span>{attr.type === 'swatch' ? (null) : (property.value)}</span>
                        //             </div>
                        //             </label>
                        //           </div>
                        //         ))
                        //       }
                        //     </div>
                        //   </div>
                        // )
                      ) : null
                    }
                    <div className='item-detail-price'>
                      <div className="item-attributes-name">
                        <span>{"Price"}</span>
                      </div>

                      <ItemPrice
                        symbol={this.props.currency.symbol}
                        prices={this.props.product.prices}
                        pfs={"24px"} pfw={"700"} 
                        imb={"20px"} />
                    </div>
                    <Button
                      action={"add"}
                      text="Add to cart" fontSize={"16px"}
                      bgColor={"#5eCe7b"} color={"#fff"} 
                      border={"none"} fontWeight={"600"}
                      width={"100%"} height={"52px"} 
                      onClick={this.addToCart} ></Button>
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