import pathName from "../pathName";
import { ReqBodyType } from "./types/reqBody";
import HttpClient from "./utils/HttpClient";

interface IApplicationsService {
  reqBody?: ReqBodyType;
  token: string;
  id?: string;
  applicationId?: string;
  candidateId?: string;
}

class ApplicationsService {
  private readonly httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  getApplications = async ({
    token,
  }: IApplicationsService) => {
    return this.httpClient.get({
      path: '/applications',
      token,
    });
  }

  getInterviewsOfApplication = async ({
    token,
    applicationId,
  }: IApplicationsService) => {
    return this.httpClient.get({
      path: `/applications/interviews/${applicationId}`,
      token,
    });
  }

  getCandidatesDocsOfApplication = async ({
    token,
    candidateId,
  }: IApplicationsService) => {
    return this.httpClient.get({
      path: `/applications/candidatesDocs/${candidateId}`,
      token,
    });
  }

  getApplication = async ({
    token,
    id,
  }: IApplicationsService) => {
    return this.httpClient.get({
      path: `/applications/${id}`,
      token,
    });
  }

  createApplication = async ({
    token,
    reqBody,
  }: IApplicationsService) => {
    return this.httpClient.post({
      path: `/applications`,
      token,
      reqBody,
    });
  }

  updateApplication = async ({
    token,
    reqBody,
    id,
  }: IApplicationsService) => {
    return this.httpClient.put({
      path: `/applications/${id}`,
      token,
      reqBody,
    });
  }

  deleteApplication = async ({
    token,
    id,
  }: IApplicationsService) => {
    return this.httpClient.delete({
      path: `/applications/${id}`,
      token,
    });
  }
}

export default new ApplicationsService();
