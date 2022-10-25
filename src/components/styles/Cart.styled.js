import styled from "styled-components";

export const CartContainer = styled.div`
  background-color: rgb(199, 228, 55);
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

/** 
 * 1. Customed styled component for CartItems component
 * 2. Used in Cart.js and Modal.jsx
 * 3. Reusable component
 * 4. Props are passed from Cart.js and Modal.jsx
 * 5. Props are used in CartItems.js
 * 
 * @property {string} bfs - brand font size
 * @property {string} bfw - brand font weight
 * @property {string} bmb - brand margin bottom
 * @property {string} ifs - item font size
 * @property {string} ifw - item font weight
 * @property {string} imb - item margin bottom
 * @property {string} pfs - price font size
 * @property {string} pfw - price font weight
 * @property {string} aff - attributes title font family
 * @property {string} afs - attributes title font size
 * @property {string} atw - attributes type text width
 * @property {string} ath - attributes type text height
 * @property {string} atfs - attributes type text font size
 * @property {string} aswh - attributes type <swatch> width and height
 * @property {string} cqwh - cart quantity width and height
 * @property {string} ciw - cart image width
 * @property {string} cih - cart image height
 */
export const CartItem = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  background-color: rgb(157, 248, 216);
  padding: 24px 0;
`;

export const CartItemDetails = styled.div`
  min-width: 335px;
  height: inherit;
  background-color: rgb(253, 163, 163);
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
`;

export const CartItemImg = styled.div`
  height: ${props => props.cih};
  background-color: rgb(253, 163, 163);
  display: flex;
  justify-content: flex-end;
`;

export const CartItemQty = styled.div`
  width: ${props => props.cqwh};
  margin-right: 24px;
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

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;