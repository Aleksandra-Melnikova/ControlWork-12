export interface RegisterMutation {
  username: string;
  password: string;
  image: File | null;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  image: string;
  role: string;
  googleID?: string;
  token: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Photo {
  _id: string;
  title: string;
  image: string;
  user: {
    _id: string;
    username: string;
  };
}

export interface PhotoMutation {
  title: string;
  image: File | null;
}
