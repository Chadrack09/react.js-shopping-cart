import React, { Component } from 'react'
import { CartItemPrice, PriceSymbol, PriceValue } from './styles/Cart.styled'
import PropTypes from 'prop-types';
import store from '../redux/store';
import { CHANGE_PRICE } from '../redux/types';

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

  constructor(props) {
    super(props);
    this.state = {
      inEditMode: false
    }
    this.changePriceEvent = this.changePriceEvent.bind(this);
    this.changeEditMode = this.changeEditMode.bind(this);
    this.cancelEditMode = this.cancelEditMode.bind(this);
  }
  

  changePriceEvent = (product) => (event) => {
    store.dispatch({
      type: CHANGE_PRICE,
      payload: {
        product: product,
        price: event.target.value,
        symbol: this.props.symbol
      },
    })
  }

  changeEditMode = () => {
    console.log("changeEditMode");
    this.setState({
      inEditMode: !this.state.inEditMode
    });
  }

  cancelEditMode = (event) => {
    event.preventDefault();
    this.setState({
      inEditMode: !this.state.inEditMode
    });
  }

  render() {

    const price = this.props.item.prices.filter(price => price.currency.symbol 
      === this.props.symbol)[0].amount

    return (

      this.props.item !== undefined ?
        (<CartItemPrice inEditMode={this.state.inEditMode}
          onDoubleClick={this.changeEditMode}
          pfs={this.props.pfs} pfw={this.props.pfw} 
          imb={this.props.imb}>
            <PriceSymbol>{this.props.symbol}</PriceSymbol>
          
            {
            this.state.inEditMode 
            ?
              <PriceValue>
                <form onSubmit={this.cancelEditMode}>
                  <input type="text" id={"price-input"} defaultValue={price}
                    onChange={this.changePriceEvent(this.props.item)} /> 
                </form>
              </PriceValue> 
            : <PriceValue>{price}</PriceValue> 
            }
        </CartItemPrice>)
        : null
    )
  }
}

ItemPrice.propTypes = {
  symbol: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  pfs: PropTypes.string,
  pfw: PropTypes.string,
  imb: PropTypes.string,
}
export default ItemPrice;