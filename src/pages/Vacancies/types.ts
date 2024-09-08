export type OptionType = { value: string, label: string }
export type OperatingModelType = 'remote' | 'hybrid' | 'presential';
export type ContractTypeType = 'internship' | 'youngApprentice' | 'clt' | 'pj';
export type LevelType = 'youngApprentice' |
  'internship' |
  'trainee' |
  'assistant' |
  'junior' |
  'pleno' |
  'senior' |
  'coordinator' |
  'manager' |
  'director' |
  'notApplicable';
export type GenderType = 'male' | 'female' | '';
export type EducationLevelType = 'fundamental' | 'medium' | 'superior' | 'postGraduation' | 'master' | 'doctorate'
export type StatusType = 'waiting' | 'open' | 'canceled' | 'finished'

export type VacancyType = {
  id: string;
  title: string;
  department: string;
  locationCep?: string;
  operatingModel: OperatingModelType;
  contractType: ContractTypeType;
  description: string;
  additionalInfo?: string;
  level: LevelType;
  minSalary: number;
  maxSalary: number;
  hasVariableComissions: boolean;
  responsibleName: string;
  responsiblePhone: string;
  responsibleEmail: string;
  reasonForOpening: string;
  isSecret: boolean;
  vacanciesAmount: number;
  subordinatesAmount?: number;
  workingSchedule: string;
  needsTravel: boolean;
  needsExtraHours: boolean;
  minAge: number;
  maxAge: number;
  gender: GenderType;
  educationLevel: EducationLevelType;
  benefits: string[];
  otherBenefits?: string;
  minExperience?: number;
  desirableExperience?: number;
  necessaryRequirements: string;
  desirableRequirements?: string;
  willApplicantBeTested: boolean;
  recruiterComission: number;
  alignmentMeetingDate?: Date;
  suggestionsOfAlignmentMeetingDates: Date[]
  createdAt: Date;
  openedAt?: Date;
  finishedAt?: Date;
  canceledAt?: Date;
  isReposition: boolean;
  status: StatusType;
  companyId: string;
  company: { id: string, name: string }
}

export type GetVacanciesApiResponse = {
  success: boolean;
  message: string;
  vacancies: VacancyType[];
}
