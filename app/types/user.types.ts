export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface UserPayload {
  id: string;
  fullName: string;
  email: string;
}

export interface UserUpdate {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
}

export interface User extends UserRegister {
  id: string;
  description: string;
}
