import pathName from "../pathName";
import { ReqBodyType } from "./types/reqBody";
import HttpClient from "./utils/HttpClient";

interface IUsersService {
  reqBody?: ReqBodyType;
  token: string;
  id?: string;
}

class UsersService {
  private readonly httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  getUsers = async ({
    token,
  }: IUsersService) => {
    return this.httpClient.get({
      path: '/users',
      token,
    });
  }

  getUser = async ({
    token,
    id,
  }: IUsersService) => {
    return this.httpClient.get({
      path: `/users/${id}`,
      token,
    });
  }

  createUser = async ({
    token,
    reqBody,
  }: IUsersService) => {
    return this.httpClient.post({
      path: `/users`,
      token,
      reqBody,
    });
  }

  updateUser = async ({
    token,
    reqBody,
    id,
  }: IUsersService) => {
    return this.httpClient.patch({
      path: `/users/${id}`,
      token,
      reqBody,
    });
  }

  deleteUser = async ({
    token,
    id,
  }: IUsersService) => {
    return this.httpClient.delete({
      path: `/users/${id}`,
      token,
    });
  }
}

export default new UsersService();
