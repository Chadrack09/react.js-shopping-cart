import React, { Component } from "react";
import '../../css/Header.css';
import NavCategory from "./NavCategory";
import AppLogo from "../../assets/svg/AppLogo.svg";
import Arrow from "../../assets/svg/Arrow.svg";
import CartIcon from "../../assets/svg/CartIconDark.svg";
import { CurrencyContainer, CurrencyHeader, 
  CurrencySymbol, CustomArrow, ListContainer, 
  ListItem, ListItemContainer, ListItemSymbol, 
  ListItemText } from "../styles/List.styled";
import { connect } from "react-redux";
import { CURRENCY_SELECTED } from "../../redux/types";
import store from "../../redux/store";
import { CartContainer, CartCounter, CartLogo } from "../styles/Cart.styled";
import Modal from "./Modal";

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      symbol: "$",
      isOpen: true,
      isModalOpen: false,
      currencySelected: [],
      products: []
    };

    this.currencyListEvent = this.currencyListEvent.bind(this);
    this.selectedOption = this.selectedOption.bind(this);
    this.cartIconEvent = this.cartIconEvent.bind(this);
  }

  static getDerivedStateFromProps(props, state) {

    if(props.currencySelected.length > 0 && props.products.length > 0) {
      return {
        currencySelected: props.currencySelected,
        symbol: props.currencySelected[0].symbol,
        products: props.products
      }
    }
    return null;
  }

  componentDidUpdate( prevProps, prevState ) {

    let currency = this.props.currencies
      .filter(e => typeof e !== undefined).shift();
    
    if (currency !== undefined) {
      let currencySelected = store.getState().currencySelected;
      if(currencySelected.length === 0) {
        store.dispatch({
          type: CURRENCY_SELECTED,
          payload: currency
        });
      }
    }
  }

  componentDidCatch(error, info) {
    console.log(error.message, info);
  }

  currencyListEvent = () => {
    this.state.isOpen ? this.setState({ isOpen: false })
    : this.setState({ isOpen: true });
  }

  selectedOption = (currency) => () => {
    this.setState({ isOpen: true });
    store.dispatch({
      type: CURRENCY_SELECTED,
      payload: currency,
    });
  }

  cartIconEvent = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });

    this.state.isModalOpen ? document.body.style.overflow = 'unset' 
        : document.body.style.overflow = 'hidden';
  }

  overlayClose = () => {
    if(this.state.isModalOpen) {
      this.setState({ isModalOpen: !this.state.isModalOpen });
    }
    this.state.isModalOpen ? document.body.style.overflow = 'unset' 
        : document.body.style.overflow = 'hidden';
  }

  modalContainerEvent = (event) => {
    event.stopPropagation();
  }

  render() {
    return (
      <header className="header">
        <div className="navbar-container c-container">

          {/* Navbar Category List */}
          <NavCategory categories={this.props.categories} />

          {/* Navbar Logo */}
          <div className="logo-main-container">
            <img src={AppLogo} alt="Application Logo" />
          </div>

          {/* Navbar Right Actions */}
          <div className="">
            <div className="actions">
              <CurrencyContainer>

                {/* Navbar Currency List */}
                <CurrencyHeader onClick={this.currencyListEvent}>
                  <CurrencySymbol>
                    {this.state.symbol}
                  </CurrencySymbol>
                  <CustomArrow>
                    <img src={Arrow} style={this.state.isOpen ? 
                      { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }} alt="Arrow" />
                  </CustomArrow>
                </CurrencyHeader>

                {/* Navbar Currency Dropdown List */}
                {!this.state.isOpen && (
                <ListContainer>
                  <ListItemContainer>
                    {
                      this.props.currencies.map((currency, index) => (
                        <ListItem key={index} onClick={this.selectedOption(currency)}>
                          <ListItemSymbol style={{ fontWeight: "500", }}>{currency.symbol}</ListItemSymbol>
                          <ListItemText style={{ marginLeft: ".5rem", fontSize: "14px" }}>{currency.label}</ListItemText>
                        </ListItem>
                      ))
                    }
                  </ListItemContainer>
                </ListContainer>
                )}
              </CurrencyContainer>

              {/* Cart Icon */}
              <CartContainer>
                <CartLogo src={CartIcon} onClick={this.cartIconEvent} />
                <CartCounter>{this.props.totalQty}</CartCounter>
              </CartContainer>

              {/* Cart Modal */}
              <Modal open={this.state.isModalOpen}
                    overlayClose={this.overlayClose}
                    modalContainer={this.modalContainerEvent}
                    currency={this.state.currencySelected} />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
    category: state.category,
    currencies: state.currencies,
    currencySelected: state.currencySelected,
    totalQty: state.cart.totalQty,
  };
};

export default connect(mapStateToProps)(Header);
