export type GenderType = 'male' | 'female' | '';
export type EducationLevelType = 'fundamental' | 'medium' | 'superior' | 'postGraduation' | 'master' | 'doctorate'
export type MaritalStatusType = 'single' | 'married' | 'divorced' | 'widower'
export type StatusType = 'stored' | 'applied' | 'hired'
export type OptionType = { value: string, label: string }

export type CandidateType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  resume: string;
  psycologicalTest?: string;
  candidatesForm?: string;
  salaryExpected: string;
  birthDate: Date;
  gender: GenderType;
  educationLevel: EducationLevelType;
  graduationCourse?: string;
  cpf: string;
  rg: string;
  cep?: string;
  streetNumber?: string;
  streetName?: string;
  district?: string;
  city?: string;
  uf?: string;
  maritalStatus: MaritalStatusType;
  childrenAmount: number;
  lastSalary: number;
  lastCompany: string;
  lastPosition: string;
  status: StatusType;
  createdAt: Date;
}

export type GetCandidatesApiResponse = {
  success: boolean;
  message: string;
  candidates: CandidateType[];
}
