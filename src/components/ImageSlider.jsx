import React, { Component } from 'react'
import { CartImg, CartImgArrows } from './styles/Cart.styled';
import LeftArrow from '../assets/svg/LeftArrow.svg';
import RightArrow from '../assets/svg/RightArrow.svg';


class ImageSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    }

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  previous = () => {
    const isFirstImg = this.state.currentImageIndex === 0;
    const newIndex = isFirstImg 
    ? this.props.gallery.length - 1 
    : this.state.currentImageIndex - 1;

    this.setState({
      currentImageIndex: newIndex
    })
  }

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

export default ImageSlider;