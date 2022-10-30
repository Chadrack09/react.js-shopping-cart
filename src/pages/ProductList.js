import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "../components/Card";
import "../css/ProductList.css";
import { dispatchProductFiltered } from "../redux/actions/FetchProducts";
import store from "../redux/store";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.categorySelected !== undefined &&
      props.categorySelected !== state.category
    ) {
      return {
        category: props.categorySelected,
      };
    }
    return null;
  }

  componentDidMount() {
    setTimeout(() => {
      if(this.props.productsFiltered.length === 0) {
        store.dispatch(dispatchProductFiltered("all", this.props.products));
      }
    }, 1000);
  }

  render() {
    console.log("CATEGORY:", this.props.categorySelected);
    return (
      this.props.categorySelected !== undefined && (
      <div className="c-container">
        <div className="category-title">{this.props.categorySelected.name}</div>
        <div className="line-break"></div>
        <div className="card-container">
          <Card />
        </div>
        <div style={{ height: "191px" }}></div>
      </div>
      ) 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categorySelected: state.categorySelected[0],
    productsFiltered: state.productsFiltered,
    products: state.products,
    currencies: state.currencies
  };
};

export default connect(mapStateToProps)(ProductList);