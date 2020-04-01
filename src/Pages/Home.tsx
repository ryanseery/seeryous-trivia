import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useObject } from 'react-firebase-hooks/database';
import { Layout, Card, Loading, Link } from '../Components';
import { firebase } from '../lib';

const HomeWrapper = styled.div`
  padding: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .container {
    padding: 4em;
  }
  .user-name {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h3 {
      text-transform: capitalize;
      font-size: ${(props) => props.theme.fontSizes.medium};
    }
  }
  .games-won {
    text-align: center;
    h4 {
      font-size: ${(props) => props.theme.fontSizes.medium};
    }
  }
`;

type Props = { authUser: firebase.User };

export function Home({ authUser }: Props): ReactElement {
  const [data, loading, error] = useObject(firebase.database().ref('users').child(authUser.uid));

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
  }

  return (
    <Layout>
      <HomeWrapper>
        <Card>
          <div className="container">
            <div className="user-name">
              <h3>{data.val().name}</h3>
              <img src={data.val().avatar} alt={data.val().name} />
            </div>
            <div className="games-won">
              <h4>Games won: {data.val().gamesWon}</h4>
            </div>
          </div>
        </Card>
        <Link to="createGame">
          <Card>
            <div className="container">
              <h3>New Game</h3>
            </div>
          </Card>
        </Link>
      </HomeWrapper>
    </Layout>
  );
}
