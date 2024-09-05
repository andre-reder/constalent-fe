import pathName from "../pathName";
import { ReqBodyType } from "./types/reqBody";
import HttpClient from "./utils/HttpClient";

interface ICompaniesService {
  reqBody?: ReqBodyType;
  token: string;
  id?: string;
}

class CompaniesService {
  private readonly httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  getCompanies = async ({
    token,
  }: ICompaniesService) => {
    return this.httpClient.get({
      path: '/companies',
      token,
    });
  }

  getCompaniesResumed = async ({
    token,
  }: ICompaniesService) => {
    return this.httpClient.get({
      path: '/companies/resumed',
      token,
    });
  }

  getCompany = async ({
    token,
    id,
  }: ICompaniesService) => {
    return this.httpClient.get({
      path: `/companies/${id}`,
      token,
    });
  }

  deleteCompany = async ({
    token,
    id,
  }: ICompaniesService) => {
    return this.httpClient.delete({
      path: `/companies/${id}`,
      token,
    });
  }
}

export default new CompaniesService();
