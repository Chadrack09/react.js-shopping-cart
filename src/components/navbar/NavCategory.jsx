import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCategoryAction } from '../../redux/actions/FetchCategories';
import { filterProductsByCategory } from '../../redux/actions/FetchProducts';
import PropTypes from 'prop-types';

/**
 * NavCategory component to display categories in the navbar
 * 
 * @property {object} categories - array of categories
 * @property {object} products - array of products
 * @property {function} filterProductsByCategory - action to filter products by category
 * @property {function} setCategory - action to set category
 * 
 */
class NavCategory extends Component {

  constructor(props) {
    super(props);
    this.categoryClickEvent = this.categoryClickEvent.bind(this);
  }

  componentDidCatch(error, info) {
    console.log(error.message, info);
  }

  categoryClickEvent = (category) => () => {
    this.props.setCategory(category);
    this.props.filterProductsByCategory(this.props.products, category.name);
  }

  render() {
    return (
      <nav className="navbar">
          <ul className="navbar-list">
          {
            this.props.categories.map((category, index) => (
            <li key={index} className="navbar-items" 
              onClick={this.categoryClickEvent(category)}>
              <Link to={`/`} className="navbar-link">
                {category.name}
              </Link>
            </li>
            ))
          }
          </ul>
      </nav>
    )
  }
}

NavCategory.propTypes = {
  categories: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
  }
}

const mapDispatchToProps = dispatch => ({
  filterProductsByCategory: (products, category) => 
    dispatch(filterProductsByCategory(products, category)),
  setCategory: (category) => dispatch(setCategoryAction(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavCategory);
