export interface LoginRequestDto {
  usernameOrEmail: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  userId: number;
  username: string;
  email: string;
  role: string; // "Admin", "Employer", "User"
}

export interface UserCreateRequestDto {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  address: string;
}