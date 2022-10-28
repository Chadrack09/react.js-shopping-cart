import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateAttributesAction } from '../redux/actions/Cart';
import store from '../redux/store';
import { UPDATE_ATTRIBUTES } from '../redux/types';
import { CartAttrContent, CartAttributes, CartAttrProps, CartAttrTitle, CartAttrTypes } from './styles/Cart.styled';

class ItemAttr extends Component {

  constructor(props) {
    super(props);
  }

  radioChange = (product, attr, id) => (e) => {
    console.log(attr);
    console.log(e.target.id);
    this.props.updateAttributes(product, attr, id);
  }

  render() {
    return (
      this.props.attributes.map((attr, index) => (
        <CartAttributes key={index}>
          <CartAttrTitle aff={this.props.aff} afs={this.props.afs}>
            <span>{attr.name}</span>
          </CartAttrTitle>
          <CartAttrContent>
            {
              attr.items.map((property, index) => (
                <CartAttrProps key={index}>
                  <input type="radio" name={`${this.props.itemName}-${attr.name}`} 
                    id={property.id} value={property.value} />
                  <label htmlFor={property.id}>
                    <CartAttrTypes 
                      onClick={this.props.action === 'change' 
                      ? this.radioChange(this.props.productDetails, attr, property.id) : null }
                      className={attr.type === 'swatch' 
                      ? 'item-property-swatch' : 'item-property-text'} 
                      checked={property.checked} type={attr.type} value={property.value}
                      atw={this.props.atw} ath={this.props.ath} atfs={this.props.atfs}
                      aswh={this.props.aswh} cursor={this.props.cursor}>
                      <span>{attr.type === 'swatch' ? (null) : (property.value)}</span>
                    </CartAttrTypes>
                  </label>
                </CartAttrProps>
              ))
            }
          </CartAttrContent>
        </CartAttributes>  
      ))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    productDetails: state.productDetails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAttributes: (product, attr, id) => dispatch(updateAttributesAction(product, attr, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemAttr);