import React, { ReactElement, useReducer } from 'react';
import styled from 'styled-components';
import { useList } from 'react-firebase-hooks/database';
import { firebase } from '../../lib';
import { Layout, Loading, Form, Input, ColorInput, Button } from '../../Components';
import { Team } from '../../@types/team';
import { User } from '../../@types/user';
import { FormWrapper } from '../Signin';
import {
  reducer,
  blankTeam,
  setPointLimit,
  addTeam,
  removeTeam,
  setTeamName,
  setTeamColor,
  removeUser,
  addUser,
} from './state';

const CreateGameWrapper = styled.div`
  h2,
  h3 {
    font-size: ${(props) => props.theme.fontSizes.large};
  }
  .title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .teams {
    display: flex;
    flex-direction: row;
  }
  .create-team-container {
    margin-right: 1em;
    display: flex;
    flex-direction: column;
  }
  .users {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .create-user-container {
    display: flex;
    flex-direction: column;
  }
  .remove-user-button {
    width: 25%;
    align-self: flex-end;
    margin-bottom: 0.5em;
  }
`;

type Props = { authUser: firebase.User };

export function CreateGame({ authUser }: Props): ReactElement {
  const [users, loading, error] = useList(firebase.database().ref('users'));

  const [state, dispatch] = useReducer(reducer, {
    pointLimit: 5,
    teams: [blankTeam(), blankTeam()],
  });

  if (loading) return <Loading />;

  if (error) {
    console.error(error);
  }

  const cleanNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    return value === '' ? 0 : parseFloat(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('HANDLE SUBMIT');
  };

  console.log({ state });

  return (
    <CreateGameWrapper>
      <FormWrapper>
        <h2>Create Game</h2>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="pointLimit">
            Point Limit
            <Input
              type="number"
              id="pointLimit"
              name="pointLimit"
              value={state.pointLimit}
              onChange={(e) => dispatch(setPointLimit(cleanNumbers(e)))}
            />
          </label>

          <div className="teams-container">
            <div className="title-container">
              <h3>Teams</h3>
              <button type="button" onClick={() => dispatch(addTeam())}>
                +
              </button>
            </div>
            <div className="teams">
              {state.teams.map((team: Team, i: number) => (
                <div key={i} className="create-team-container">
                  <label htmlFor="teamName">
                    Team Name
                    <Input
                      type="text"
                      id="teamName"
                      name="teamName"
                      value={team.name}
                      onChange={(e) => dispatch(setTeamName(team._id, e.target.value))}
                    />
                  </label>

                  <label htmlFor="color">
                    Team Color
                    <ColorInput
                      type="color"
                      id="color"
                      name="color"
                      value={team.color}
                      onChange={(e) => dispatch(setTeamColor(team._id, e.target.value))}
                    />
                  </label>

                  <label htmlFor="users">
                    <span className="users">
                      Users{' '}
                      <button type="button" onClick={() => dispatch(addUser(team._id))}>
                        +
                      </button>
                    </span>
                    {team.users.map((user: User, index: number) => (
                      <div key={user._id} className="create-user-container">
                        {index !== 0 && (
                          <button
                            className="remove-user-button"
                            type="button"
                            onClick={() => dispatch(removeUser(team._id, user._id))}
                          >
                            X
                          </button>
                        )}
                        <Input
                          type="text"
                          id="user"
                          name="user"
                          value={user.name}
                          onChange={(e) => console.log('here')}
                        />
                      </div>
                    ))}
                  </label>
                  {i !== 0 && (
                    <Button type="button" color="red" onClick={() => dispatch(removeTeam(team._id))}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Form>
      </FormWrapper>
    </CreateGameWrapper>
  );
}
