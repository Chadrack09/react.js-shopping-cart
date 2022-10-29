import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addToCartAction } from '../redux/actions/Cart';
import { ItemButton } from './styles/Button.styled';
import PropTypes from 'prop-types';

/**
 * Reusable button component used in the application
 * 
 * @property {string} text - text to be displayed on the button
 * @property {string} fontSize - font size of the button
 * @property {string} color - color of the button
 * @property {string} bgColor - background color of the button
 * @property {string} width - width of the button
 * @property {string} height - height of the button
 * @property {string} border - border of the button
 * 
 */
class Button extends Component {

  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }
  
  /**
   * Adds product to cart
   * @param {*} product - product to be added to cart
   * @returns {void}
   */
  addToCart = (product) => () => {this.props.addToCart(product)}

  render() {
    return (
      <ItemButton onClick={this.props.action === 'add' 
              ? this.addToCart(this.props.product) : null}
        bgColor={this.props.bgColor} color={this.props.color}
        border={this.props.border} 
        width={this.props.width} height={this.props.height}
        fontSize={this.props.fontSize} fontWeight={this.props.fontWeight}>
          {this.props.text}</ItemButton>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    product: state.productDetails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);