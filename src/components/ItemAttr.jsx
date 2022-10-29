import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateAttributesAction } from '../redux/actions/Cart';
import { CartAttrContent, CartAttributes, CartAttrProps, 
  CartAttrTitle, CartAttrTypes } from './styles/Cart.styled';
import PropTypes from 'prop-types';

/**
 * Reusable component to display the attributes of the product
 * 
 * @property {string} action - action to be performed on the component
 * @property {string} cursor - define type of cursor to be displayed
 * @property {array} attributes - attributes of the product
 * @property {string} itemName - name of the product
 * @property {string} aff - attribute font family
 * @property {string} afs - attribute font size
 * @property {string} atw - attributes of type <text> width
 * @property {string} ath - attributes of type <text> height
 * @property {string} atfs - attributes of type <text> font size
 * @property {string} aswh - attributes of type <swatch> width and height
 */
class ItemAttr extends Component {

  constructor(props) {
    super(props);
    this.radioChange = this.radioChange.bind(this);
  }

  /**
   * Updates the attributes of the product on radio button change event 
   * and if the action is 'change'
   * @param {*} product - product to be updated
   * @param {*} attr - attribute to be updated
   * @param {*} id - id of the attribute to be updated
   * @returns {void}
   */
  radioChange = (product, attr, id) => (e) => {
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

ItemAttr.propTypes = {
  action: PropTypes.string,
  cursor: PropTypes.string,
  attributes: PropTypes.array.isRequired,
  itemName: PropTypes.string.isRequired,
  aff: PropTypes.string,
  afs: PropTypes.string,
  atw: PropTypes.string,
  ath: PropTypes.string,
  atfs: PropTypes.string,
  aswh: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    productDetails: state.productDetails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAttributes: (product, attr, id) => 
        dispatch(updateAttributesAction(product, attr, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemAttr);