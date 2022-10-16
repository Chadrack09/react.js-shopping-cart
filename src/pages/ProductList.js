import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "../components/Card";
import "../css/ProductList.css";

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

  render() {
    return (
      <div className="c-container" style={{ backgroundColor: "#eee" }}>
        <div className="category-title">{this.state.category.name}</div>
        <div className="line-break"></div>
        <div className="card-container">
          <Card />
        </div>
        <div style={{ height: "191px" }}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categorySelected: state.categorySelected[0],
  };
};

export default connect(mapStateToProps)(ProductList);
