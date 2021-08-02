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

export interface Provider {
    Id?: number;
    Name: string;
}

export interface Category {
    Id?: number;
    Name: string;
}

export interface Product {
    Id?: number;
    Name: string;
    Description: string;
    Cost: string;
    Category: string;
    Provider: string;
}