import styled from "styled-components";

export const CartContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

export const CartLogo = styled.img`

`;

export const CartCounter = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #333;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transform: translate(50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: white;
  user-select: none;
  pointer-events: none;
`;

export const CartModal = styled.div`
  visibility: hidden;
  position: fixed;
  display: flex;
  z-index: 5;
  margin-top: 80px;
  padding-right: 3.5rem;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  /* overflow: auto; */
  background-color: rgba(57, 55, 72, 0.8);
  justify-content: end;
`;

export const CartModalContent = styled.div`
  width: 325px;
  height: 495px;
  background-color: aqua;
`;
export const CartItem = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 24px 0;
  border-top: ${props => props.cibt ? props.cibt : 0};
`;
export const CartItemDetails = styled.div`
  height: inherit;
`;
export const CartItemBrand = styled.div`
  font-size: ${props => props.bfs};
  font-weight: ${props => props.bfw};
  margin-bottom: ${props => props.bmb};
`;
export const CartItemName = styled.div`
  font-size: ${props => props.ifs};
  font-weight: ${props => props.ifw};
  margin-bottom: ${props => props.imb};
`;
export const CartItemPrice = styled.div`
  font-size: ${props => props.pfs};
  font-weight: ${props => props.pfw};
  margin-bottom: ${props => props.imb};
  display: flex;
  align-items: center;

  ${props => props.inEditMode && 
  `
    input {
      color: #5ECE7B;
      width: 100px;
      font-size: ${props.pfs};
      font-family: 'Source Sans Pro', sans-serif;
      border: none;
      border-bottom: 1px solid #5ECE7B;

      &:focus {
        outline: none;
      }
    } 
    
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
  `}
`;
export const PriceSymbol = styled.div`
  font-size: ${props => props.pfs};
`;
export const PriceValue = styled.div`
  font-size: ${props => props.pfs};
`;
export const CartAttributes = styled.div`
  margin-bottom: 1rem;
`;
export const CartAttrTitle = styled.div`
  font-family: ${props => props.aff};
  font-size: ${props => props.afs};
  margin-bottom: 7px;
`;
export const CartAttrContent = styled.div`
  display: flex;
`;
export const CartAttrProps = styled.div`
  & > input {
    border: none;
    display: none;
  }
`;
export const CartAttrTypes = styled.div`
  cursor: ${props => props.cursor};
  &.item-property-swatch {
    width: ${props => props.aswh};
    height: ${props => props.aswh};
    margin-right: 8px;
  }
  &.item-property-text {
    min-width: ${props => props.atw};
    min-height: ${props => props.ath};
    font-size: ${props => props.atfs};
    border: 1px solid black;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Source Sans Pro;
  }
  ${props => props.type === 'swatch' && `
    background-color: ${props.value};
  `}
  ${props => props.checked && props.type === 'swatch' && `
    outline: 2px solid black;
    outline-offset: 1px;
    outline-color: rgba(94, 206, 123, 1);
  `}
  ${props => props.checked && props.type === 'text' && `
    color: white;
    background-color: #1D1F22;
  `}
  ${props => props.type === 'swatch' && props.value === '#FFFFFF' && `
    border: 1px solid black;
    box-sizing: border-box;
  `}
`;
export const CartItemImg = styled.div`
  height: ${props => props.cih};
  display: flex;
  justify-content: flex-end;
`;
export const CartItemQty = styled.div`
  width: ${props => props.cqwh};
  margin-right: ${props => props.imr};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const CartItemQtyInc = styled.div`
  width: ${props => props.cqwh};
  height: ${props => props.cqwh};
  color: #1D1F22;
  border: 1px solid #1D1F22;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  `;
export const CartItemQtyDec = styled.div`
  width: ${props => props.cqwh};
  height: ${props => props.cqwh};
  color: #1D1F22;
  border: 1px solid #1D1F22;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const CartItemQtyVal = styled.div`
  width: inherit;
  text-align: center;
  font-size: ${props => props.pfs};
  font-weight: 500;
`;
export const CartImg = styled.div`
  width: ${props => props.ciw};
  height: ${props => props.cih};
  position: relative;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const CartImgArrows = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  right: 0;
  & > img {
    cursor: pointer;
    margin-right: 8px;
    margin-bottom: 16px;
  }
  & > img:last-child {
    margin-right: 16px;
  }
`;