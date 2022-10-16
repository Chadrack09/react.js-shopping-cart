import React, { Component } from "react";
import { connect } from "react-redux";
import ItemDetails from "../components/ItemDetails";
import "../css/ProductDetails.css";

class ProductDetails extends Component {
  render() {
    return (
      <div className="c-container item-container">
        <h1>Product Details</h1>
        <p>{this.props.product.id}</p>

        <ItemDetails product={this.props.product} />
        <div style={{ height: "178px" }}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.productDetails.product,
  };
};

export default connect(mapStateToProps)(ProductDetails);
