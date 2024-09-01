export interface AppContextInterface {
    signed: boolean | false,
    token: string | '',
    user: IAuthUserObject | null,
    signOut: () => void,
    login: (email: string, password: string) => Promise<void>,
}

export interface IAuthUserObject {
  name: string,
  id: string,
  role: string,
}
