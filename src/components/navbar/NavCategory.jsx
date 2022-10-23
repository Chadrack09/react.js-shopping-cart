import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductsByCategory } from '../../redux/actions/FetchProducts';
import store from '../../redux/store';
import { SET_CATEGORY } from '../../redux/types';

class NavCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
    }
  }
  
  static getDerivedStateFromProps(props, state) {
    // console.log('From getDerivedStateFromProps', props);
    if(props.products.length > 0) {
      return {
        products: props.products,
      }
    }
    return null;
  }

  componentDidCatch(error, info) {
    console.log(error.message, info);
  }

  componentDidUpdate(prevProps, prevState) {
    let category = this.props.categories
      .filter(e => typeof e !== undefined).shift();
    // console.log("From Did Update", prevProps);
    
    if (category !== undefined) {
      let categorySelected = store.getState().categorySelected;
      if(categorySelected.length === 0) {
        store.dispatch({
          type: SET_CATEGORY,
          payload: category
        });
      }
    }
  }

  categoryClickEvent = (category) => () => {
    store.dispatch({
      type: SET_CATEGORY,
      payload: category
    });
    this.props.filterProductsByCategory(
        this.props.products, category.name);
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

const mapStateToProps = (state) => {
  return {
    products: state.products,
    category: state.category,
    categories: state.categories,
  }
}

const  mapDispatchToProps = dispatch => ({
  filterProductsByCategory: (products, category) => 
    dispatch(filterProductsByCategory(products, category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavCategory);
