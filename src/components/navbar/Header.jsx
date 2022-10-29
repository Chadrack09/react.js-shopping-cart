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
import store from "../../redux/store";
import { CartContainer, CartCounter, CartLogo } from "../styles/Cart.styled";
import Modal from "./Modal";
import { totalAmountAction } from "../../redux/actions/Cart";
import { setCurrencyAction } from "../../redux/actions/FetchCurrencies";
import PropTypes from "prop-types";

/**
 * 
 * Header component used in the app, displays 
 * item categories, currency list and cart modal
 * 
 * @see {@link https://reactjs.org/docs/components-and-props.html|React Components and Props}
 * @see {@link https://reactjs.org/docs/react-component.html|React Component}
 * @see {@link https://reactjs.org/docs/react-component.html#componentdidmount|React Component componentDidMount}
 * @see {@link https://reactjs.org/docs/react-component.html#componentdidupdate|React Component componentDidUpdate}
 * @see {@link https://reactjs.org/docs/react-component.html#componentdidcatch|React Component componentDidCatch}
 * @see {@link https://reactjs.org/docs/react-component.html#componentwillunmount|React Component componentWillUnmount}
 * 
 */
class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      symbol: "$",
      isCurrencyOpen: false,
      isModalOpen: false,
      currencySelected: [],
    };

    this.currencyListEvent = this.currencyListEvent.bind(this);
    this.closeCurrencyList = this.closeCurrencyList.bind(this);
    this.selectedOption = this.selectedOption.bind(this);
    this.cartIconEvent = this.cartIconEvent.bind(this);
  }

  static getDerivedStateFromProps(props, state) {

    if(props.currencySelected) {
      return {
        symbol: props.currencySelected.symbol,
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
        this.props.setCurrency(currency);
      }
    }

    
  }

  componentDidCatch(error, info) {
    console.log(error.message, info);
  }

  /**
   * Toggle currency list's state on and off
   * @param {*} event - event from the currency list element
   * 
   * @example
   * this.state = {
   *  isCurrencyOpen: false,
   * }
   * @returns {void} 
   */
  currencyListEvent = (event) => {
    event.stopPropagation();
    this.setState({ isCurrencyOpen: !this.state.isCurrencyOpen }, () => {
      document.addEventListener('click', this.closeCurrencyList);
    });
  }

  /**
   * Closes currency list on document click and remove event listener from dom
   * @returns {void}
   */
  closeCurrencyList = () => {
    this.setState({ isCurrencyOpen: false }, () => {
      document.removeEventListener('click', this.closeCurrencyList);
    })
  }

  /**
   * 
   * @param {Object} currency - currency object
   * @returns {void}
   */
  selectedOption = (currency) => () => {
    this.setState({ isCurrencyOpen: true });

    this.props.setCurrency(currency);

    const totalAmount = this.props.cartItems.reduce((acc, item) =>
      acc + (item.prices.filter(price => 
      price.currency.symbol === currency.symbol)[0].amount * item.qty), 0)
    const tax = totalAmount * 0.21;
    
    this.props.totalAmountAction(totalAmount, tax);
  }

  /**
   * Toggle modal's state on and off when cart icon is clicked
   * @returns {void}
   */
  cartIconEvent = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });

    this.state.isModalOpen ? document.body.style.overflow = 'unset' 
        : document.body.style.overflow = 'hidden';
  }

  /**
   * Set action to close modal when clicked outside of modal
   * @returns {void}
   */
  overlayClose = () => {
    if(this.state.isModalOpen) {
      this.setState({ isModalOpen: !this.state.isModalOpen });
    }
    this.state.isModalOpen ? document.body.style.overflow = 'unset' 
        : document.body.style.overflow = 'hidden';
  }

  /**
   * Set modal not to close when clicked inside of modal
   * @param {*} event
   */
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
                    <img src={Arrow} className={"__img_cart_logo"} style={this.state.isCurrencyOpen ? 
                      { transform: "rotate(0deg)" } : { transform: "rotate(180deg)" }} alt="Arrow" />
                  </CustomArrow>
                </CurrencyHeader>

                {/* Navbar Currency Dropdown List */}
                {this.state.isCurrencyOpen && (
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
    cartItems: state.cart.cartItems,
    categories: state.categories,
    currencies: state.currencies,
    currencySelected: state.currencySelected[0],
    totalQty: state.cart.totalQty,
  };
};

const mapDispatchToProps = dispatch => ({
  totalAmountAction: (totalAmount, tax) => dispatch(totalAmountAction(totalAmount, tax)),
  setCurrency: (currency) => dispatch(setCurrencyAction(currency)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
