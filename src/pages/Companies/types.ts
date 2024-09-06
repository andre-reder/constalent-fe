export type CompanyType = {
  id: string;
  cnpj: string;
  name: string;
  fantasyName: string;
  email: string;
  phone: string;
  contactName: string;
  contactRole: string;
  cep: string;
  streetName: string;
  streetNumber?: number;
  district: string;
  city: string;
  uf: string;
  minComission: number;
  maxComission: number;
  comissionPercentage: number;
  userLoginEmail?: string;
}

export type GetCompaniesApiResponse = {
  success: boolean;
  message?: string;
  companies?: CompanyType[];
}

export type OptionType = { value: string, label: string };
