import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Link } from './Link';
import { ROUTES } from '../App';

const HeaderWrapper = styled.nav`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.main};
  border-bottom: 0.1rem solid ${(props) => props.theme.colors.main};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
  h2 {
    margin: 0;
    padding: 0;
    font-size: ${(props) => props.theme.fontSizes.small};
    text-transform: capitalize;
  }
  ul {
    list-style: none;
    li {
      font-size: ${(props) => props.theme.fontSizes.medium};
    }
  }
`;

type Props = { authUser: firebase.User };

export function Header({ authUser }: Props): ReactElement {
  const location = useLocation();

  return (
    <HeaderWrapper>
      <h1>Seeryous Trivia</h1>
      <ul>
        <li>
          {(() => {
            switch (location.pathname) {
              case '/signin':
                return <Link to={ROUTES.SIGNUP}>Sign Up</Link>;
              case '/signup':
                return <Link to={ROUTES.SIGNIN}>Sign In</Link>;
              case '/':
                return <h2>{authUser?.displayName}</h2>;
              default:
                return <h2>{authUser?.displayName}</h2>;
            }
          })()}
        </li>
      </ul>
    </HeaderWrapper>
  );
}
