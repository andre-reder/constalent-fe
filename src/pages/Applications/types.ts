
export type ApplicationStatus =
 'waiting' |
 'notContinued' |
 'rejectedByRecruiter' |
 'approvedByRecruiter' |
 'rejectedByCompany' |
 'approvedByCompany'

export type OptionType = { value: string, label: string }

export type ApplicationType = {
  id: string;
  date: Date;
  status: ApplicationStatus
  recruiterComission?: number;
  finalSalary?: number;
  candidate: { name: string, id: string };
  vacancy: { title: string, id: string };
  company: { name: string, id: string };
  companyId: string;
  vacancyId: string;
  candidateId: string;
  hiredAt?: Date;
}

export type GetApplicationsApiResponse = {
  success: boolean;
  message: string;
  applications: ApplicationType[];
}

export type InterviewDetailsType = {
  id: string;
  date: Date;
  type: 'company' | 'recruiter';
  details: string;
  aiSummary: string;
  status: 'scheduled' | 'canceled' | 'approved' | 'rejected';
  hiredAt?: Date;
}

export type CandidatesDocsType = {
  id: string;
  resume: string;
  psycologicalTest?: string;
  candidatesForm?: string;
}
