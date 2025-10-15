type TRoles = "SUPER_ADMIN" | "ADMIN" | "USER";

interface IUser {
  id: number;
  full_name: string;
  image: string;
  email: string;
  last_seen_in_days: null;
  permissions: string[];
  roles: TRoles[];
}

interface ILoginResponse {
  user: IUser;
  token: string;
}

interface IForgotPasswordResponse {
  status: "string";
  can_resend_after: number;
}

interface ICheckVerificationCodeResponse {
  is_valid: boolean;
}
