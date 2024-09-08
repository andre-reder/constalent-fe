import pathName from "../pathName";
import { ReqBodyType } from "./types/reqBody";
import HttpClient from "./utils/HttpClient";

interface IVacanciesService {
  reqBody?: ReqBodyType;
  token: string;
  id?: string;
}

class VacanciesService {
  private readonly httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  getVacancies = async ({
    token,
  }: IVacanciesService) => {
    return this.httpClient.get({
      path: '/vacancies',
      token,
    });
  }

  getVacancy = async ({
    token,
    id,
  }: IVacanciesService) => {
    return this.httpClient.get({
      path: `/vacancies/${id}`,
      token,
    });
  }

  createVacancy = async ({
    token,
    reqBody,
  }: IVacanciesService) => {
    return this.httpClient.post({
      path: `/vacancies`,
      token,
      reqBody,
    });
  }

  updateVacancy = async ({
    token,
    reqBody,
    id,
  }: IVacanciesService) => {
    return this.httpClient.post({
      path: `/vacancies/${id}`,
      token,
      reqBody,
    });
  }

  deleteVacancy = async ({
    token,
    id,
  }: IVacanciesService) => {
    return this.httpClient.delete({
      path: `/vacancies/${id}`,
      token,
    });
  }
}

export default new VacanciesService();
