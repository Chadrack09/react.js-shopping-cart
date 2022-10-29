import React, { Component } from 'react'
import { CartImg, CartImgArrows } from './styles/Cart.styled';
import LeftArrow from '../assets/svg/LeftArrow.svg';
import RightArrow from '../assets/svg/RightArrow.svg';
import PropTypes from 'prop-types';

/**
 * Image slider component to display images of the product
 * @property {string} action - action to be performed on the item
 * @property {string} gallery - gallery of images of the product
 * @property {string} name - name of the product
 * @property {string} ciw - cart item image width
 * @property {string} cih - cart item image height
 */
class ImageSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    }

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  /**
   * Display the previous image in the gallery
   */
  previous = () => {
    const isFirstImg = this.state.currentImageIndex === 0;
    const newIndex = isFirstImg 
    ? this.props.gallery.length - 1 
    : this.state.currentImageIndex - 1;

    this.setState({
      currentImageIndex: newIndex
    })
  }

  /**
   * Display the next image in the gallery
   */
  next = () => {
    const isLastImg = this.state.currentImageIndex 
                          === this.props.gallery.length - 1;
    const newIndex = isLastImg 
    ? 0 : this.state.currentImageIndex + 1;
    
    this.setState({
      currentImageIndex: newIndex
    })
  }

  render() {
    return (
      <CartImg ciw={this.props.ciw} cih={this.props.cih}>
        <img src={this.props.gallery[this.state.currentImageIndex]} alt={this.props.name} />
        {
          this.props.action === 'arrows' && this.props.gallery.length > 1
          ? (
            <CartImgArrows>
              <img src={LeftArrow} alt="Left Arrow" onClick={this.previous} />
              <img src={RightArrow} alt="Right Arrow" onClick={this.next} />
            </CartImgArrows>
          )
          : null
        }
      </CartImg>
    )
    
  }
}

ImageSlider.propTypes = {
  action: PropTypes.string,
  gallery: PropTypes.array.isRequired,
  name: PropTypes.string,
  ciw: PropTypes.string,
  cih: PropTypes.string,
}

export default ImageSlider;