export interface IUserLogin {
  UserName: string;
  Password: string;
}
  
export interface IUserSignup {
  FirstName: string,
  LastName: string,
  UserName: string;
  Email: string,
  Password: string;
  ConfirmPassword: string;
  PhoneNumber: string;
  Roles: string[]
}

export interface IUserData {
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  phoneNumber: string,
  imagePath: string,
  //Id: string,
  //PasswordHash: string,
  //EmailConfirmed: boolean,
  //PhoneNumberConfirmed: boolean,
  //TwoFactorEnabled: boolean
}

