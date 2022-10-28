import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { totalAmountAction } from '../../redux/actions/Cart';
import Button from '../Button';
import CartItems from '../CartItems';

/**
 * 
 * @description Modal component to display minicart items, 
 * total amount and checkout button
 */
class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      symbol: "₹",
    }
  }

  componentDidMount() {
    const totalAmount = this.props.cartItems.reduce((acc, item) =>
      acc + (item.prices.filter(price => 
      price.currency.symbol === this.props.currency.symbol)[0].amount * item.qty), 0)

    const tax = totalAmount * 0.21;

    this.props.totalAmountAction(totalAmount, tax);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cartItems !== this.props.cartItems) {
      
      const totalAmount = this.props.cartItems.reduce((acc, item) =>
        acc + (item.prices.filter(price => 
        price.currency.symbol === this.props.currency.symbol)[0].amount * item.qty), 0)
      
        const tax = totalAmount * 0.21;

      this.props.totalAmountAction(totalAmount, tax);
    }
  }

  componentDidCatch(error, info) {
    console.log(error.message, info);
  }

  modalOverlayEvent = () => {
    if(this.props.open) {
      this.props.overlayClose();
    }
  }

  render() {
    return (
      this.props.open ? (
        <div className="modal-overlay" onClick={this.modalOverlayEvent}>
          <div className="modal-container" onClick={this.props.modalContainer}>
            <div className="modal-content">
              <div className="modal-header bag-title ">
                <span><span style={{ fontWeight: "700" }}>My Bag, </span> 
                  {this.props.totalQty === 0 || undefined 
                  ? '0 item' : this.props.totalQty + ' items'}
                </span>
              </div>
              <div className="modal-body">
                <div className="cart-container">
                  <CartItems 
                    bfs={"16px"} bfw={"300"} bmb={"8px"} 
                    ifs={"16px"} ifw={"300"} imb={"10px"}
                    pfs={"16px"} pfw={"500"} 
                    aff={"Raleway"} afs={"14px"}
                    atw={"24px"} ath={"24px"} atfs={"14px"} 
                    aswh={"16px"} 
                    cqwh={"24px"} 
                    ciw={"121px"} cih={"190px"} imr={"8px"} />
                </div>
              </div>
              <div>
              </div>
              <div className="modals-footer">
                <div className='total-amount'>
                  <div>
                    <span>Total</span>
                  </div>
                  <div>
                    <span>{this.props.currency.symbol}{` `}</span>
                    <span>{(this.props.totalAmount).toFixed(2)}</span>
                  </div>    
                </div>
                <div className="footer-btn">
                  <Link to={"/cart"}>
                  <Button
                    text="View Bag" fontSize={"14px"}
                    bgColor={"#fff"} color={"#000"} 
                    border={"1px solid rgba(29, 31, 34, 1)"}
                    width={"140px"} height={"43px"} /></Link>
                  <Button
                    text="Checkout" fontSize={"14px"}
                    bgColor={"#5eCe7b"} color={"#fff"} 
                    border={"none"}
                    width={"140px"} height={"43px"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ):null
    )
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  currency: state.currencySelected[0],
  totalQty: state.cart.totalQty,
  totalAmount: state.cart.totalAmount,
})

const mapDispatchToProps = dispatch => ({
  totalAmountAction: (totalAmount, tax) => 
  dispatch(totalAmountAction(totalAmount, tax)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
