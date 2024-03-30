export interface Photo {
  userId: UserData;
  _id: string;
  title: string;
  image: string;
  onAuthorClick: (id: string) => void;
}

export interface PhotoMutation {
  title: string;
  image: File | null;
}
export interface PhotosResponse {
  message: string;
  photos: Photo[];
}

export interface UserData {
  _id: string;
  displayName: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar?: string;
  googleID?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
}
