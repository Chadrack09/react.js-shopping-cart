import React, { Component } from 'react'
import { CartItemPrice } from './styles/Cart.styled'
import PropTypes from 'prop-types';

/**
 * Reusable component to display price of the product
 * 
 * @property {string} symbol - currency symbol
 * @property {array} prices - all prices of the product
 * @property {string} pfs - price font size
 * @property {string} pfw - price font weight
 * @property {string} imb - item margin bottom
 */
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

ItemPrice.propTypes = {
  symbol: PropTypes.string.isRequired,
  prices: PropTypes.array.isRequired,
  pfs: PropTypes.string,
  pfw: PropTypes.string,
  imb: PropTypes.string,
}

export default ItemPrice;