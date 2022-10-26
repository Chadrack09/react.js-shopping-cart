import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addToCartAction } from '../redux/actions/Cart';
import store from '../redux/store';
import { ADD_TO_CART } from '../redux/types';
import { ItemButton } from './styles/Button.styled'

class Button extends Component {

  constructor(props) {
    super(props);
    
  }

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