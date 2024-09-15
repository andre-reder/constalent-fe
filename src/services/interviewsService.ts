import pathName from "../pathName";
import { ReqBodyType } from "./types/reqBody";
import HttpClient from "./utils/HttpClient";

interface IInterviewsService {
  reqBody?: ReqBodyType;
  token: string;
  id?: string;
}

class InterviewsService {
  private readonly httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  getInterviews = async ({
    token,
  }: IInterviewsService) => {
    return this.httpClient.get({
      path: '/interviews',
      token,
    });
  }

  getInterview = async ({
    token,
    id,
  }: IInterviewsService) => {
    return this.httpClient.get({
      path: `/interviews/${id}`,
      token,
    });
  }

  createInterview = async ({
    token,
    reqBody,
  }: IInterviewsService) => {
    return this.httpClient.post({
      path: `/interviews`,
      token,
      reqBody,
    });
  }

  updateInterview = async ({
    token,
    reqBody,
    id,
  }: IInterviewsService) => {
    return this.httpClient.put({
      path: `/interviews/${id}`,
      token,
      reqBody,
    });
  }

  deleteInterview = async ({
    token,
    id,
  }: IInterviewsService) => {
    return this.httpClient.delete({
      path: `/interviews/${id}`,
      token,
    });
  }
}

export default new InterviewsService();
