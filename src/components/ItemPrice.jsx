import React, { Component } from 'react'
import { CartItemPrice } from './styles/Cart.styled'

class ItemPrice extends Component {
  render() {
    return (
      <>
        <CartItemPrice 
          pfs={this.props.pfs} pfw={this.props.pfw} 
          imb={this.props.imb}>

          {this.props.symbol} 
          {this.props.prices.filter(price => price.currency.symbol === 
            this.props.symbol)[0].amount}
        
        </CartItemPrice>
      </>
    )
  }
}

export default ItemPrice;