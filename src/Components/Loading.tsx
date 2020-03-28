import styled from 'styled-components';

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('../assets/loading-indicator.gif');
  background-repeat: no-repeat;
  background-position: center center;
  background-color: ${(props) => props.theme.colors.background};
`;
