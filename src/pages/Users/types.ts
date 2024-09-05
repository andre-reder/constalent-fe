export type UserRoleType = 'customer' | 'admin' | '';

export type UsersType = {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  company?: { name: string, id: string };
}

export type GetUsersApiResponse = {
  success: boolean;
  message?: string;
  users?: UsersType[];
}

export type OptionType = { value: string, label: string };
