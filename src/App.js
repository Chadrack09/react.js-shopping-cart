import React from "react";
import { connect } from "react-redux";
import { fetchProductsActions } from "./redux/actions/FetchProducts";
import { fetchCategoriesActions } from "./redux/actions/FetchCategories";
import { fetchCurrenciesActions } from "./redux/actions/FetchCurrencies";
import Header from "./components/navbar/Header";
import ProductList from "./pages/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.props.fetchProducts();
    this.props.fetchCategories();
    this.props.fetchCurrencies();
  }

  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/:link/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<ProductList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProductsActions()),
    fetchCategories: () => dispatch(fetchCategoriesActions()),
    fetchCurrencies: () => dispatch(fetchCurrenciesActions()),
  };
};

export default connect(null, mapDispatchToProps)(App);
