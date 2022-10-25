import React, { Component } from 'react'
import CartItems from '../components/CartItems';
import '../css/Cart.css'

class Cart extends Component {
  render() {
    return (
      <div className="c-container cart-main-container">
        <h1 className="cart-title">Cart</h1>
        <div className="cart-container">

          {/* Custom styled reusable component used in minicart and cart page */}
          <CartItems bfs={"30px"} bfw={"600"} bmb={"16px"} 
              ifs={"30px"} ifw={"400"} imb={"20px"}
              pfs={"24px"} pfw={"700"} 
              aff={"Roboto Condensed"} afs={"18px"}
              atw={"63px"} ath={"45px"} atfs={"16px"} 
              aswh={"32px"} 
              cqwh={"45px"} 
              ciw={"200px"} cih={"288px"} />
        </div>
      </div>
    )
  }
}

export default Cart;