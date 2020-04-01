import React, { ReactElement } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import { useObject } from 'react-firebase-hooks/database';
import { Layout, Card, Loading, Link } from '../Components';

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
  }
  .games-won {
    text-align: center;
  }
`;

type Props = { authUser: firebase.User };

export function Home({ authUser }: Props): ReactElement {
  const [user, loading, error] = useObject(firebase.database().ref('users').child(authUser.uid));

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
              <img src={user.val().avatar} alt={user.val().name} />
              <h3>{user.val().name}</h3>
            </div>
            <div className="games-won">
              <h4>Games won: {user.val().gamesWon}</h4>
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
