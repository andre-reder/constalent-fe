import pathName from "../pathName";
import { ReqBodyType } from "./types/reqBody";
import HttpClient from "./utils/HttpClient";

interface ICandidatesService {
  reqBody?: ReqBodyType;
  token: string;
  id?: string;
}

class CandidatesService {
  private readonly httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  getCandidates = async ({
    token,
  }: ICandidatesService) => {
    return this.httpClient.get({
      path: '/candidates',
      token,
    });
  }

  getCandidate = async ({
    token,
    id,
  }: ICandidatesService) => {
    return this.httpClient.get({
      path: `/candidates/${id}`,
      token,
    });
  }

  createCandidate = async ({
    token,
    reqBody,
  }: ICandidatesService) => {
    return this.httpClient.post({
      path: `/candidates`,
      token,
      reqBody,
      contentType: 'multipart/form-data',
    });
  }

  updateCandidate = async ({
    token,
    reqBody,
    id,
  }: ICandidatesService) => {
    return this.httpClient.post({
      path: `/candidates/${id}`,
      token,
      reqBody,
      contentType: 'multipart/form-data',
    });
  }

  deleteCandidate = async ({
    token,
    id,
  }: ICandidatesService) => {
    return this.httpClient.delete({
      path: `/candidates/${id}`,
      token,
    });
  }
}

export default new CandidatesService();
