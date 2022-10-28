import styled from "styled-components";

export const ItemButton = styled.button`
  background-color: ${props => props.bgColor};
  width: ${props => props.width};
  height: ${props => props.height};
  border: ${props => props.border};
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight ? props.fontWeight : "400"};
  text-transform: uppercase;
  cursor: pointer;
`;