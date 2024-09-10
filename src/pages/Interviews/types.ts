export type OptionType = { value: string, label: string }
export type InterviewTypeType = 'recruiter' | 'company';
export type InterviewStatusType = 'scheduled' | 'canceled' | 'approved' | 'rejected';

export type InterviewType = {
  id: string;
  createdAt: Date;
  date: Date;
  details?: string;
  aiSummary?: string;
  relatory?: string;
  type: InterviewTypeType;
  status: InterviewStatusType;
  company: { id: string; name: string };
  candidate: { id: string; name: string };
  vacancy: { id: string; title: string };
}
export type GetInterviewsApiResponse = {
  success: boolean;
  message: string;
  interviews: InterviewType[];
}
