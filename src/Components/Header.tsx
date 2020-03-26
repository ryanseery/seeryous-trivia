import React, { ReactElement } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.main};
`;

export function Header(): ReactElement {
  return (
    <HeaderWrapper>
      <h1>Header</h1>
    </HeaderWrapper>
  );
}
