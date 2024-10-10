
export interface IRegisterUser {
    name: string;
    username: string;
    email: string;
    password: string;
    role: 'Admin' | 'User' ;
  }
  
  export interface ILoginUser {
    email: string;
    password: string;
    role?: 'Admin' | 'User' ;
  }
  
  export interface IJwtPayload {
    id: string;
    role: 'Admin' | 'User';
  }
  