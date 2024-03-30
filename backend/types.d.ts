import { Model, Types } from 'mongoose';

export interface PhotoData {
  userId: Types.Schema.ObjectId;
  title: string;
  image: string | null;
}

export interface UserData {
  email: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface UserFields {
  email: string;
  username: string;
  password: string;
  token: string;
  role: string;
  googleID: string;
  avatar: string;
  displayName: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, object, UserMethods>;
