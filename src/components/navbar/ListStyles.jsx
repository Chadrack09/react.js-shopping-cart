import styled from "styled-components";

export const CurrencyContainer = styled.div`
  background-color: green;
  height: inherit;
  margin-right: 22px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-size: 18px;
`;
export const CurrencyHeader = styled.div`
  width: 38px;
  height: inherit;
  background-color: rgb(126, 155, 240);
  border: none;
  outline: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const CurrencySymbol = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
export const CustomArrow = styled.div``;

export const ListContainer = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  background-color: chocolate;
  width: 114px;
  height: auto;
  text-align: center;
  box-shadow: 2px 3px 20px 7px rgba(150, 148, 148, 0.41);
  -webkit-box-shadow: 2px 3px 20px 7px rgba(150, 148, 148, 0.41);
  -moz-box-shadow: 2px 3px 20px 7px rgba(150, 148, 148, 0.41);
`;
export const ListItemContainer = styled.div`
  width: inherit;
  height: 100%;
  margin: 0;
  padding: 0;
`;
export const ListItem = styled.div`
  &:nth-child(odd) {
    background-color: red;
    padding: 16px 0 16px 0;
  }
  &:nth-child(even) {
    background-color: #eeeeee;
    padding: 9px 0 9px 0;
  }
`;
export const ListItemText = styled.span``;
export const ListItemSymbol = styled.span``;
