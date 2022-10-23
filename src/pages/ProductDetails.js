import React, { Component } from "react";
import { connect } from "react-redux";
import ItemDetails from "../components/ItemDetails";
import "../css/ProductDetails.css";

class ProductDetails extends Component {
  
  render() {
    return (
      <div className="c-container item-container">
        <ItemDetails product={this.props.product} />
        <div style={{ height: "178px" }}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.productDetails,
  };
};

export default connect(mapStateToProps)(ProductDetails);
