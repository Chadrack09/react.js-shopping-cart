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

/**
 * @description Header component used in the app,
 * displays the logo, categories, cart and currency
 * 
 * 
 * @param {object} props - props passed from parent component
 * @param {array} props.cartItems - array of items in the cart
 * @param {array} props.categories - array of categories
 * @param {array} props.currencies - array of currencies
 * @param {object} props.currencySelected - object of selected currency
 * @param {number} props.totalQty - total quantity of items in the cart
 * @param {function} props.totalAmountAction - action to set total amount and tax
 * @param {function} props.setCurrency - action to set currency
 * 
 * @returns {JSX.Element} - Header component
 * 
 * @see {@link https://reactjs.org/docs/components-and-props.html|React Components and Props}
 * @see {@link https://reactjs.org/docs/react-component.html|React Component}
 * @see {@link https://reactjs.org/docs/react-component.html#componentdidmount|React Component componentDidMount}
 * @see {@link https://reactjs.org/docs/react-component.html#componentdidupdate|React Component componentDidUpdate}
 * @see {@link https://reactjs.org/docs/react-component.html#componentdidcatch|React Component componentDidCatch}
 * @see {@link https://reactjs.org/docs/react-component.html#componentwillunmount|React Component componentWillUnmount}
 * 
 * @author  Chaadrack Boudzoumou
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

  currencyListEvent = (event) => {
    event.stopPropagation();
    this.setState({ isCurrencyOpen: !this.state.isCurrencyOpen }, () => {
      document.addEventListener('click', this.closeCurrencyList);
    });
  }

  closeCurrencyList = () => {
    this.setState({ isCurrencyOpen: false }, () => {
      document.removeEventListener('click', this.closeCurrencyList);
    })
  }

  selectedOption = (currency) => () => {
    this.setState({ isCurrencyOpen: true });

    this.props.setCurrency(currency);

    const totalAmount = this.props.cartItems.reduce((acc, item) =>
      acc + (item.prices.filter(price => 
      price.currency.symbol === currency.symbol)[0].amount * item.qty), 0)
    const tax = totalAmount * 0.21;
    
    this.props.totalAmountAction(totalAmount, tax);
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

// Mapping redux state to header component props
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
