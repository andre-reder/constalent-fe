import pathName from '../pathName';
import { ReqBodyType } from './types/reqBody';
import HttpClient from './utils/HttpClient';
interface AuthServiceInterface {
  reqBody?: ReqBodyType;
  token: string;
}

class AuthService {
  private readonly httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  auth = async ({
    reqBody,
    token = ''
  }: AuthServiceInterface) => {
    return this.httpClient.post({
      path: '/login',
      token,
      reqBody,
    });
  }

  googleLogin = async ({
    reqBody,
    token = ''
  }: AuthServiceInterface) => {
    return this.httpClient.post({
      path: '/google-login',
      token,
      reqBody,
    });
  }

  resetPassword = async ({
    reqBody,
    token = '',
  }: AuthServiceInterface) => {
    return this.httpClient.post({
      path: '/reset-password',
      reqBody,
      token,
    });
  }

  changePassword = async ({
    reqBody,
    token,
  }: AuthServiceInterface) => {
    return this.httpClient.post({
      path: '/update-password',
      token,
      reqBody,
    });
  }
}

export default new AuthService();
