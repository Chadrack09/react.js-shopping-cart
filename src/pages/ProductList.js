import React, { Component } from "react";
import Card from "../components/Card";
import "../css/ProductList.css";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "all",
    };
  }

  render() {
    return (
      <div className="main-container c-container">
        <div className="category-title">{this.state.category}</div>
        <div className="line-break"></div>
        <div className="card-container">
          <Card />
        </div>
        <div>
          <h1>New List</h1>
          <br />
          <div></div>
        </div>
      </div>
    );
  }
}

export default ProductList;
