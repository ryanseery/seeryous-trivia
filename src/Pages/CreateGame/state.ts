import uuidv4 from 'uuid/v4';
import { Team } from '../../@types/team';
import { User } from '../../@types/user';

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function blankUser(): User {
  return {
    _id: uuidv4(),
    name: '',
    avatar: '',
  };
}

export function blankTeam(): Team {
  return {
    _id: uuidv4(),
    name: '',
    color: getRandomColor(),
    users: [blankUser(), blankUser()],
    score: 0,
  };
}

interface CreateState {
  pointLimit: number;
  teams: Team[] | null;
}

enum ACTIONS {
  SET_POINT_LIMIT = 'SET_POINT_LIMIT',
  ADD_TEAM = 'ADD_TEAM',
  REMOVE_TEAM = 'REMOVE_TEAM',
  SET_TEAM_NAME = 'SET_TEAM_NAME',
  SET_TEAM_COLOR = 'SET_TEAM_COLOR',
  REMOVE_USER = 'REMOVE_USER',
  ADD_USER = 'ADD_USER',
}

type SetPointLimit = {
  type: ACTIONS.SET_POINT_LIMIT;
  pointLimit: number;
};
export const setPointLimit = (pointLimit: number): SetPointLimit => ({
  type: ACTIONS.SET_POINT_LIMIT,
  pointLimit,
});

type AddTeam = {
  type: ACTIONS.ADD_TEAM;
};
export const addTeam = (): AddTeam => ({
  type: ACTIONS.ADD_TEAM,
});

type RemoveTeam = {
  type: ACTIONS.REMOVE_TEAM;
  _id: string;
};
export const removeTeam = (_id: string): RemoveTeam => ({
  type: ACTIONS.REMOVE_TEAM,
  _id,
});

type SetTeamName = {
  type: ACTIONS.SET_TEAM_NAME;
  _id: string;
  name: string;
};
export const setTeamName = (_id: string, name: string): SetTeamName => ({
  type: ACTIONS.SET_TEAM_NAME,
  _id,
  name,
});

type SetTeamColor = {
  type: ACTIONS.SET_TEAM_COLOR;
  _id: string;
  color: string;
};
export const setTeamColor = (_id: string, color: string): SetTeamColor => ({
  type: ACTIONS.SET_TEAM_COLOR,
  _id,
  color,
});

type RemoveUser = {
  type: ACTIONS.REMOVE_USER;
  teamId: string;
  _id: string;
};
export const removeUser = (teamId: string, _id: string): RemoveUser => ({
  type: ACTIONS.REMOVE_USER,
  teamId,
  _id,
});

type AddUser = {
  type: ACTIONS.ADD_USER;
  teamId: string;
};
export const addUser = (teamId: string): AddUser => ({
  type: ACTIONS.ADD_USER,
  teamId,
});

type Action = SetPointLimit | AddTeam | RemoveTeam | SetTeamName | SetTeamColor | RemoveUser | AddUser;

export function reducer(state: CreateState, action: Action): CreateState {
  switch (action.type) {
    case ACTIONS.SET_POINT_LIMIT:
      return { ...state, pointLimit: action.pointLimit };
    case ACTIONS.ADD_TEAM:
      return { ...state, teams: [...state.teams, blankTeam()] };
    case ACTIONS.REMOVE_TEAM: {
      const updatedArr = state.teams.filter((team) => team._id !== action._id);

      return { ...state, teams: [...updatedArr] };
    }
    case ACTIONS.SET_TEAM_NAME: {
      const { _id, name } = action;

      const teamToUpdate = state.teams.find((team) => team._id === _id);

      teamToUpdate.name = name;
      return { ...state };
    }
    case ACTIONS.SET_TEAM_COLOR: {
      const { _id, color } = action;

      const teamToUpdate = state.teams.find((team) => team._id === _id);

      teamToUpdate.color = color;
      return { ...state };
    }
    case ACTIONS.REMOVE_USER: {
      const { teamId, _id } = action;

      const updatedArr = state.teams.map((team: Team) =>
        team._id === teamId ? { ...team, users: [...team.users.filter((user: User) => user._id !== _id)] } : team,
      );

      return { ...state, teams: [...updatedArr] };
    }
    case ACTIONS.ADD_USER: {
      const { teamId } = action;
      const updatedArr = state.teams.map((team: Team) =>
        team._id === teamId ? { ...team, users: [...team.users, blankUser()] } : team,
      );

      return { ...state, teams: [...updatedArr] };
    }
    default:
      throw new Error(`Create Game Reducer Received Unrecognized Action`);
  }
}
