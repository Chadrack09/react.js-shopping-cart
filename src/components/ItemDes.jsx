import React, { Component } from 'react'
import { CartItemBrand, CartItemName } from './styles/Cart.styled';
import PropTypes from 'prop-types';

/**
 * Reusable component display the name and brand of the product in the cart
 * 
 * @property {string} brand - brand of the product
 * @property {string} name - name of the product
 * @property {string} bfs - brand font size
 * @property {string} bfw - brand font weight
 * @property {string} bmb - brand margin bottom
 * @property {string} ifs - item font size
 * @property {string} ifw - item font weight
 * @property {string} imb - item margin bottom
 * 
 */
class ItemDes extends Component {
  render() {
    return (
      <>
        <CartItemBrand bfs={this.props.bfs} bfw={this.props.bfw} 
            bmb={this.props.bmb}>{this.props.brand}</CartItemBrand>
        <CartItemName ifs={this.props.ifs} ifw={this.props.ifw} 
            imb={this.props.imb}>{this.props.name}</CartItemName>
      </>
    )
  }
}

ItemDes.propTypes = {
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bfs: PropTypes.string,
  bfw: PropTypes.string,
  bmb: PropTypes.string,
  ifs: PropTypes.string,
  ifw: PropTypes.string,
  imb: PropTypes.string,
}

export default ItemDes;