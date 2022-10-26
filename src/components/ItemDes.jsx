import React, { Component } from 'react'
import { CartItemBrand, CartItemName } from './styles/Cart.styled';

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

export default ItemDes;