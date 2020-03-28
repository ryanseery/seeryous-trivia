import { User } from './user';

export interface Team {
  _id: string;
  name: string;
  color: string;
  users: User[];
  score: number;
}
