import styled from 'styled-components';

export const Card = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: 0.4em;
  border: 1px solid grey;
  height: auto;
  overflow-x: hidden;
`;
