import React, { Component } from 'react'
import '../css/ProductDetails.css'

class ItemDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.product.gallery[0],
    }

    this.setImage = this.setImage.bind(this);
  }

  setImage = (image) => () => {
    this.setState({
      image: image
    });
  }

  render() {
    return (
      <div className="item-detail-grid">
        <div className="item-detail-images">
          {
            this.props.product.gallery.map((image, index) => (
              <div className="item-image" key={index} onClick={this.setImage(image)}>
                <img src={image} alt="product" />
              </div>
            ))
          }
        </div>
        <div className="item-detail-main-img">
          <div className="main-img">
            <img src={this.state.image} alt="product" />
          </div>
        </div>
        <div className="item-detail-cart">
          <div className="cart-detail-container">
            <div className="item-detail-header">
              <p style={{fontWeight: "600"}}>{this.props.product.brand}</p>
              <p>{this.props.product.name}</p>
            </div>
            <div className="item-detail-body">
              {
                this.props.product.attributes.length > 0 ? (
                  this.props.product.attributes.map((attr, index) => 
                    <div className="item-attributes-container" key={index}>
                      <div className="item-attributes-name">
                        <span>{attr.name}</span>
                      </div>
                      <div className="item-attributes-values">
                        {
                          attr.items.map((property, index) => (
                            <div className="attr-value" key={index}>
                              <input type="radio" name={attr.name} 
                                        id={`${attr.name}-${property.id}`} value={property.value}
                                        // style={{display: "none"}} 
                                        /* onChange={this.radioChangeEvent(this.state.product.id, attr.name)} */ />
                                <label htmlFor={`${attr.name}-${property.id}`}>
                                <div className={attr.type === 'swatch' ? 'item-properties-swatch' : 'item-property-txt'} 
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
                  )
                ) : null
              }
              <div className="item-attributes-name">
                <span>{"Price"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ItemDetails