import React, { Component } from 'react'
import { connect } from 'react-redux';
import { CartAttrContent, CartAttributes, CartAttrProps, 
  CartAttrTitle, CartAttrTypes, CartImg, CartItem, CartItemBrand, 
  CartItemDetails, CartItemImg, CartItemName, CartItemPrice, 
  CartItemQty, CartItemQtyDec, CartItemQtyInc, CartItemQtyVal } from './styles/Cart.styled';
import Plus from '../assets/svg/Plus.svg';
import Minus from '../assets/svg/Minus.svg';

class CartItems extends Component {

  render() {
    return (
      this.props.cartItems.length > 0 
      ?(
        this.props.cartItems.map((item, index) => (
        <CartItem key={index}>
          <CartItemDetails>
            <CartItemBrand bfs={this.props.bfs} bfw={this.props.bfw} 
                      bmb={this.props.bmb}>{item.brand}</CartItemBrand>
            <CartItemName ifs={this.props.ifs} ifw={this.props.ifw} 
                        imb={this.props.imb}>{item.name}</CartItemName>
            <CartItemPrice pfs={this.props.pfs} pfw={this.props.pfw} imb={this.props.imb}>
              {this.props.currency.symbol} 
              {item.prices.filter(price => 
                price.currency.symbol === this.props.currency.symbol)[0].amount}
            </CartItemPrice>
            {
              item.attributes.length > 0 ? (
                item.attributes.map((attr, index) => (
                  <CartAttributes key={index}>
                    <CartAttrTitle aff={this.props.aff} afs={this.props.afs}>
                      <span>{attr.name}</span>
                    </CartAttrTitle>
                    <CartAttrContent>
                      {
                        attr.items.map((property, index) => (
                          <CartAttrProps key={index}>
                            <input type="radio" name={`${item.name}-${attr.name}`} 
                              id={property.id} value={property.value} />
                            <label htmlFor={property.id}>
                              <CartAttrTypes className={attr.type === 'swatch' 
                                ? 'item-property-swatch' : 'item-property-text'} 
                                checked={property.checked} type={attr.type} value={property.value}
                                atw={this.props.atw} ath={this.props.ath} atfs={this.props.atfs}
                                aswh={this.props.aswh}>
                                <span>{attr.type === 'swatch' ? (null) : (property.value)}</span>
                              </CartAttrTypes>
                            </label>
                          </CartAttrProps>
                        ))
                      }
                    </CartAttrContent>
                  </CartAttributes>  
                ))
              ) : null  
            }
          </CartItemDetails>
          <CartItemImg cih={this.props.cih}>
            <CartItemQty cqwh={this.props.cqwh}>
              <CartItemQtyInc cqwh={this.props.cqwh}><img src={Plus} alt="Plus" /></CartItemQtyInc>
              <CartItemQtyVal cqwh={this.props.cqwh} pfs={this.props.pfs}><span>1</span></CartItemQtyVal>
              <CartItemQtyDec cqwh={this.props.cqwh}><img src={Minus} alt="Minus" /></CartItemQtyDec>
            </CartItemQty>
            <CartImg ciw={this.props.ciw} cih={this.props.cih}>
              <img src={item.gallery[0]} alt={item.name} />
            </CartImg>
          </CartItemImg>
        </CartItem>
      ))) 
      : (<div>Empty</div>)
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencySelected[0],
    cartItems: state.cart.cartItems,
  }
}

export default connect(mapStateToProps)(CartItems);