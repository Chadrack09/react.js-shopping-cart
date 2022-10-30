import React, { Component } from 'react'
import { connect } from 'react-redux';
import { 
  CartItem, CartItemDetails, CartItemImg, CartItemQty, 
  CartItemQtyDec, CartItemQtyInc, CartItemQtyVal 
} from './styles/Cart.styled';
import Plus from '../assets/svg/Plus.svg';
import Minus from '../assets/svg/Minus.svg';
import { addToCartAction, removeFromCartAction } 
  from '../redux/actions/Cart';
import ItemDes from './ItemDes';
import ItemPrice from './ItemPrice';
import ItemAttr from './ItemAttr';
import ImageSlider from './ImageSlider';
import PropTypes from 'prop-types';

/**
 * Cart items component to display items in the cart
 * @property {string} action - action to be performed on the item
 * @property {string} cibt - cart item border top
 * @property {string} cibb - cart item border bottom
 * @property {string} brand - brand of the product
 * @property {string} name - name of the product
 * @property {string} bfs - brand font size
 * @property {string} bfw - brand font weight
 * @property {string} bmb - brand margin bottom
 * @property {string} ifs - item font size
 * @property {string} ifw - item font weight
 * @property {string} imb - item margin bottom
 * @property {string} pfs - price font size
 * @property {string} pfw - price font weight
 * @property {string} aff - attribute font family
 * @property {string} afs - attribute font size
 * @property {string} atw - attributes of type <text> width
 * @property {string} ath - attributes of type <text> height
 * @property {string} atfs - attributes of type <text> font size
 * @property {string} aswh - attributes of type <swatch> width and height
 * @property {string} ciw - cart item image width
 * @property {string} cih - cart item image height
 */
class CartItems extends Component {

  constructor(props) {
    super(props);

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  /**
   * Increment the quantity of the item
   * @param {*} item 
   * @returns {void}
   */
  increment = (item) => () => {this.props.addToCart(item)}
  /**
   * Decrement the quantity of the item
   * @param {*} item 
   * @returns {void}
   */
  decrement = (item) => () => {this.props.removeFromCart(item)}

  render() {
    return (
      this.props.cartItems.length > 0 
      ?(
        this.props.cartItems.map((item, index) => (
        <CartItem key={index} cibt={this.props.cibt} cibb={this.props.cibb}>
          <CartItemDetails>
            <ItemDes 
                brand={item.brand} name={item.name} 
                bfs={this.props.bfs} bfw={this.props.bfw} bmb={this.props.bmb} 
                ifs={this.props.ifs} ifw={this.props.ifw} imb={"20px"} />

            <ItemPrice 
                symbol={this.props.currency.symbol}
                item={item}
                pfs={this.props.pfs} pfw={this.props.pfw} 
                imb={this.props.imb} />
            {
              item.attributes.length > 0 ? (
                <ItemAttr 
                  attributes={item.attributes} itemName={item.name}
                  aff={this.props.aff} afs={this.props.afs}
                  atw={this.props.atw} ath={this.props.ath} atfs={this.props.atfs}
                  aswh={this.props.aswh} />
              ) : null  
            }
          </CartItemDetails>

          {/* Image Gallery */}
          <CartItemImg cih={this.props.cih}>

            {/* Qty Increment Decrement */}
            <CartItemQty cqwh={this.props.cqwh} imr={this.props.imr}>
              <CartItemQtyInc cqwh={this.props.cqwh} onClick={this.increment(item)}>
                <img src={Plus} alt="Plus" /></CartItemQtyInc>
              <CartItemQtyVal cqwh={this.props.cqwh} pfs={this.props.pfs}>
                <span>{item.qty}</span>
              </CartItemQtyVal>
              <CartItemQtyDec cqwh={this.props.cqwh} onClick={this.decrement(item)}>
                <img src={Minus} alt="Minus" /></CartItemQtyDec>
            </CartItemQty>

            {/* Image Slider Component */}
            <ImageSlider 
              action={this.props.action}
              gallery={item.gallery} 
              name={item.name} 
              ciw={this.props.ciw} 
              cih={this.props.cih}/>
          </CartItemImg>
        </CartItem>
      ))) 
      : (<div>Empty shopping cart</div>)
    )
  }
}

CartItems.propTypes = {
  action: PropTypes.string,
  cibt: PropTypes.string,
  cibb: PropTypes.string,
  brand: PropTypes.string,
  name: PropTypes.string,
  bfs: PropTypes.string,
  bfw: PropTypes.string,
  bmb: PropTypes.string,
  ifs: PropTypes.string,
  ifw: PropTypes.string,
  imb: PropTypes.string,
  pfs: PropTypes.string,
  pfw: PropTypes.string,
  aff: PropTypes.string,
  afs: PropTypes.string,
  atw: PropTypes.string,
  ath: PropTypes.string,
  atfs: PropTypes.string,
  aswh: PropTypes.string,
  ciw: PropTypes.string,
  cih: PropTypes.string,
  cqwh: PropTypes.string,
  imr: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencySelected[0],
    cartItems: state.cart.cartItems,
    totalQty: state.cart.totalQty,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCartAction(item)),
    removeFromCart: (item) => dispatch(removeFromCartAction(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);