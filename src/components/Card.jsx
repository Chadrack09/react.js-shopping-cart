import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from "../assets/svg/CartIconLight.svg";

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      symbol: "₹",
      currency: {},
      products: [],
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(props.products.length > 0 && props.currency.length > 0) {
      return {
        currency: props.currency[0],
        products: props.products,
      }
    }
    return null;
  }

  componentDidCatch(error, info) {
    console.log(error.message, info);
  }

  render() {
    console.log(this.state.currency);
    console.log(this.state.products);
    return (
        this.state.products.length > 0 ?
        (
          this.state.products.map((item, index) => (
          <div className="card-item" key={index}>
            <span className={ !item.inStock ? "stock-state" : "" }>
              { item.inStock ? "" : (<p className="stock-text">out of stock</p>) }</span>
            <Link to={`/details/${item.id}`} /*onClick={this.itemDetailsEvent([item])} */ >
            <div className="card-image">
              <img
                className="card-image-item"
                src={item.gallery[0]}
                alt={item.name}
                /* onClick={this.itemClickEvent(item.inStock)} */ />
            </div>
            </Link>
            <div className="break">
              <div className="logo-container" /* onClick={this.addToCartClickEvent(item)} */ >
                <div style={{ width: "24px", height: "24px", marginLeft: "12px" }}>
                <img className={`logo-light`} src={Logo} alt="item" /></div>
              </div>
            </div>
            <div className="card-text" style={{ fontSize: "18px" }}>
              <div className="card-title">{item.name}</div>
              <div className="card-price" style={{ fontWeight: "500" }}>
                {
                    this.state.currency.symbol === null 
                    ? this.state.symbol : this.state.currency.symbol
                }
                { 
                  item.prices.filter(price => price.currency.symbol 
                    === this.state.currency.symbol)[0].amount
                }
              </div>
            </div>
          </div>
        ))
      ) : (<div>No Card Loaded...</div>)
    )
  }     
}

const mapStateToProps = state => ({
  products: state.products,
  currency: state.currencySelected,
});

export default connect(mapStateToProps)(Card);