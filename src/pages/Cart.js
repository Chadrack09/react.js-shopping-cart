import React, { Component } from 'react'
import { connect } from 'react-redux';
import Button from '../components/Button';
import CartItems from '../components/CartItems';
import '../css/Cart.css'

class Cart extends Component {
  
  render() {
    return (
      <div className="c-container cart-main-container">
        <h1 className="cart-title">Cart</h1>
        <div className="cart-container">

          {/* Custom styled reusable component used in minicart and cart page */}
          <CartItems 
              cibt={"1px solid #e5e5e5"}
              cibb={"1px solid #e5e5e5"}
              bfs={"30px"} bfw={"600"} bmb={"16px"} 
              ifs={"30px"} ifw={"400"} imb={"20px"}
              pfs={"24px"} pfw={"700"} 
              aff={"Roboto Condensed"} afs={"18px"}
              atw={"63px"} ath={"45px"} atfs={"16px"} 
              aswh={"32px"} 
              cqwh={"45px"} 
              ciw={"200px"} cih={"288px"} imr={"24px"} />
        </div>
        <div className='cart-footer-info'>
          <div className='cart-order-info'>
            <div className='cart-order-info-title'>Tax 21%:</div>
            <div className='cart-order-info-value'>
              {this.props.currency.symbol}{(this.props.tax).toFixed(2)}</div>
            <div className='cart-order-info-title'>Quantity:</div>
            <div className='cart-order-info-value'>{this.props.totalQty}</div>
            <div className='cart-order-info-title'>Total:</div>
            <div className='cart-order-info-value'>
              {this.props.currency.symbol}{(this.props.totalAmount).toFixed(2)}</div>
          </div>
          <Button
            text="Order" fontSize={"14px"}
            bgColor={"#5eCe7b"} color={"#fff"} 
            border={"none"} fontWeight={"600"}
            width={"279px"} height={"43px"} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencySelected[0],
    cartItems: state.cartItems,
    totalQty: state.cart.totalQty,
    totalAmount: state.cart.totalAmount,
    tax: state.cart.tax,
  }
}

export default connect(mapStateToProps)(Cart);