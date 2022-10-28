import styled from "styled-components";

export const CurrencyContainer = styled.div`
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
  right: 0;
  width: 114px;
  height: auto;
  text-align: center;
  box-shadow: 0px 4px 35px 0px rgba(168, 172, 176, 0.19);
  -webkit-box-shadow: 0px 4px 35px 0px rgba(168, 172, 176, 0.19);
  -moz-box-shadow: 0px 4px 35px 0px rgba(168, 172, 176, 0.19);
`;
export const ListItemContainer = styled.div`
  width: inherit;
  height: 100%;
  margin: 0;
  padding: 0;
`;
export const ListItem = styled.div`
  &:nth-child(odd) {
    padding: 16px 0 16px 0;
  }
  &:nth-child(even) {
    padding: 9px 0 9px 0;
  }
  &:hover {
    background-color: #eeeeee;
  }
`;
export const ListItemText = styled.span``;
export const ListItemSymbol = styled.span``;
