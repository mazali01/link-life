import path from 'path';
import { Dal } from './dal';

export interface CreateUserModel {
  email: string
  name: string
  picture: string
  password: string
}

export interface UserModel {
  email: string
  name: string
  picture: string
  password: string
  followingIds: string[]
}

export const dbPath = path.join(__dirname, "data", "users.json");

class User extends Dal<UserModel> {
  constructor() {
    super(dbPath);
  }
}

export const userDal = new User();