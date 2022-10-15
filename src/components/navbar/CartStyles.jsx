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