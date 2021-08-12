export interface UserLogin {
  UserName: string;
  Password: string;
}
  
export interface UserSignup {
  FirstName: string,
  LastName: string,
  UserName: string;
  Email: string,
  Password: string;
  ConfirmPassword: string;
  PhoneNumber: string;
  Roles: string[]
}

export interface UserData {
  FirstName: string,
  LastName: string,
  UserName: string,
  Email: string,
  PhoneNumber: string,
  ImagePath: string,
  //Id: string,
  //PasswordHash: string,
  //EmailConfirmed: boolean,
  //PhoneNumberConfirmed: boolean,
  //TwoFactorEnabled: boolean
}