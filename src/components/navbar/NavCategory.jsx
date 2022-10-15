import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class NavCategory extends Component {

  componentDidCatch(error, info) {
    console.log(error.message, info);
  }

  render() {
    return (
      <nav className="navbar">
          <ul className="navbar-list">
          {
            this.props.categories.map((category, index) => (
            <li key={index} className="navbar-items">
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
export default NavCategory;
