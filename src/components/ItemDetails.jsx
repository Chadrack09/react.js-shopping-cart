import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../css/ProductDetails.css';
import store from "../redux/store";
import { CHANGE_GALLERY_IMG } from '../redux/types';
import Button from './Button';
import ItemDes from './ItemDes';
import ItemPrice from './ItemPrice';
import ItemAttr from './ItemAttr';
import { Query } from '@apollo/client/react/components';
import { GET_PRODUCT_BY_ID_QUERY } from '../service/Queries';
import { changeGalleryImgAction, 
  productDetailsAction } from '../redux/actions/FetchProducts';
import PropTypes from 'prop-types';

/**
 * Item details component to display information about a product
 * @property {object} product - product to be displayed
 * 
 */
class ItemDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    }
    
    this.setImage = this.setImage.bind(this);
  }

  /**
   * Sets the image to be displayed in the main image container
   * @param {*} image 
   */
  setImage = (image) => () => {
    store.dispatch({
      type: CHANGE_GALLERY_IMG,
      payload: image
    })
  }

  render() {

    const id = window.location.pathname.split('/')[2];

    return (
      <Query query={GET_PRODUCT_BY_ID_QUERY} variables={{ productId: id }}>
        {
          ({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>
            if (error) return console.log(error.message);

            const product = data.product;

            let destructuredProduct = {
              ...product,
              attributes: product.attributes.map((attribute) => {
                return {
                  ...attribute,
                  items: attribute.items.map((item, index) => {
                    return {
                      ...item,
                      checked: index === 0 ? true : false, // new property added to product
                    };
                  }),
                };
              }),
            }
            
            if(this.props.imageChange === "") {
              store.dispatch(changeGalleryImgAction(product.gallery[0]));
            }
            if(this.props.productDetails.length === 0) {
              store.dispatch(productDetailsAction(destructuredProduct));
            }

            return (
              this.props.productDetails.length !== 0
              ? (
                <div className="item-detail-grid">
                  <div className="item-detail-images">
                    {
                      this.props.productDetails.gallery.map((image, index) => (
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
                      brand={this.props.productDetails.brand} 
                      name={this.props.productDetails.name} 
                      bfs={"30px"} bfw={"600"} bmb={"16px"} 
                      ifs={"30px"} ifw={"400"} imb={"43px"} />

                      <div className="item-detail-body">
                        {
                          this.props.productDetails.attributes.length > 0 ? (

                            <ItemAttr
                              action={"change"}
                              cursor={"pointer"}
                              attributes={this.props.productDetails.attributes} 
                              itemName={this.props.productDetails.name}
                              aff={"Roboto Condensed"} afs={"18px"}
                              atw={"63px"} ath={"45px"} atfs={"16px"}
                              aswh={"32px"} />
                          ) : null
                        }
                        <div className='item-detail-price'>
                          <div className="item-attributes-name">
                            <span>{"Price"}</span>
                          </div>

                          <ItemPrice
                            symbol={this.props.currency.symbol}
                            prices={this.props.productDetails.prices}
                            pfs={"24px"} pfw={"700"} 
                            imb={"20px"} />
                        </div>
                        <Button
                          action={"add"}
                          text="Add to cart" fontSize={"16px"}
                          bgColor={"#5eCe7b"} color={"#fff"} 
                          border={"none"} fontWeight={"600"}
                          width={"100%"} height={"52px"} 
                          onClick={this.addToCart} />
                        <div className="item-detail-description" 
                          dangerouslySetInnerHTML={{__html: this.props.productDetails.description}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
              : this.setState({product: destructuredProduct})
            )
          }
        }
      </Query>
    )
  }
}

ItemDetails.propTypes = {
  product: PropTypes.object.isRequired,
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