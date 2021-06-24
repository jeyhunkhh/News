export interface IRegister {
  fullname: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthAction {
  type: string;
  payload: any;
  errors: any;
}

export interface IAuthInitialState {
  status: string;
  data: IUser | null;
  errors: [];
}

export interface IUser {
  _id: string;
  email: string;
  fullname: string;
  role: string;
}

export interface IUserInfo {
  access_token: string;
  user: IUser;
}
