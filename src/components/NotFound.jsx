import React, { Component } from 'react'
import '../css/NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div className='not-found-container'>
        <p className='title-404'>404</p>
        <p>Page not found</p>
      </div>
    )
  }
}

export default NotFound;