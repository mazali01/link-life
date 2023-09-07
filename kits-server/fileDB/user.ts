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
  friendsIds: string[]
}

class User extends Dal<UserModel> {
  constructor() {
    super("users.json");
  }
}

export const userDal = new User();