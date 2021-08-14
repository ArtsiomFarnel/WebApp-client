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

