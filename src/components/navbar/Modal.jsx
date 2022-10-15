import React, { Component } from 'react'

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      totalQty: 0,
      symbol: "₹"
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
                <span><span style={{ fontWeight: "700" }}>My Bag,</span> 
                  {this.state.totalQty === 0 ? '0 item' : this.state.totalQty + ' items'}
                </span>
              </div>
              <div className="modal-body">
                {
                  this.state.cart.length > 0 ? (
                    this.state.cart.map((item, index) => (
                      <div className="cart-items" key={index}>
                        <div className="item-desc">
                          <div className="item-brand">{item.brand}</div>
                          <div className="item-name">{item.name}</div>
                          <div className="item-price" style={{fontWeight: "500"}}>{this.state.symbol}{` `}
                          { 
                            item.prices.filter(price => 
                            price.currency.symbol === this.state.symbol)[0].amount
                          }
                          </div>
                          {
                            item.attributes.length > 0 ? (
                              item.attributes.slice(0, 2).map((attr, index) => (
                                <div className="item-property-container" key={index}>
                                  <div className="item-property-title">
                                    <span>{attr.name}</span>
                                  </div>
                                  <div className='item-property-content'>
                                    {
                                      attr.items.slice(0, 3).map((property, index) => (
                                        <div className="item-property" key={index}>
                                          <input type="radio" name={`${item.name}-${attr.name}`} 
                                                  id={property.id} value={property.value} 
                                                  onChange={this.radioChangeEvent(item.id, attr.name)} />
                                          <label htmlFor={property.id}>
                                            <div className={attr.type === 'swatch' ? 'item-property-swatch' : 'item-property-text'} 
                                                  style={ property.checked && attr.type === 'text' 
                                                  ? {backgroundColor: "red", color: "#fff"} 
                                                  : property.checked && attr.type === 'swatch' 
                                                  ? {outline: "2px solid black", 
                                                    outlineOffset: "1px", 
                                                    outlineColor: "rgba(94, 206, 123, 1)",
                                                    backgroundColor: property.value} : attr.type === 'swatch' ? {backgroundColor: property.value} : null}>
                                              <span>{attr.type === 'swatch' ? (null) : (property.value)}</span>
                                            </div>
                                          </label>
                                        </div>
                                      ))
                                    }
                                  </div>
                                </div>
                              ))
                            ) : null
                          }
                        </div>
                        <div className="item-btn-container">
                          <div className="item-sign" onClick={this.incrementItem(item)}>
                            <span>{"+"}</span>
                          </div>
                          <div className="item-qty">{item.qty}</div>
                          <div className="item-sign" onClick={this.decrementItem(item)}>
                            <span>{"-"}</span>
                          </div>
                        </div>
                        <div className="item-image">
                          <img src={item.gallery[0]} alt="" />
                        </div>
                      </div>
                  ))) : (
                    <div className="modal-item">
                      <p>Your bag is empty</p>
                    </div>
                  )
                }
              </div>
              <div>
              </div>
              <div className="modals-footer">
                <div className='total-amount'>
                  <div>
                    <span>Total</span>
                  </div>
                  <div>
                    <span>{this.state.symbol}{` `}</span>
                    <span>
                      {
                        this.state.cart.length > 0 ? 
                        (
                        this.state.cart.reduce((acc, item) =>
                          acc + (item.prices.filter(price => 
                            price.currency.symbol === this.state.symbol)[0].amount * item.qty), 0).toFixed(2) 
                        ) : 0
                      }
                    </span>
                  </div>    
                </div>
                <div className="footer-btn">
                  <div>
                    <input className='f-btn viewbag-btn' type="button" value="View Bag" />
                  </div>
                  <div>
                    <input className='f-btn checkout-btn' type="button" value="Checkout" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ):null


    )
  }
}

export default Modal;