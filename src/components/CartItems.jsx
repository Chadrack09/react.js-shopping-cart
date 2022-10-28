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

class CartItems extends Component {

  constructor(props) {
    super(props);

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment = (item) => () => {this.props.addToCart(item)}
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
                prices={item.prices}
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