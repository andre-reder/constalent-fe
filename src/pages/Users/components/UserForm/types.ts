export type ActivityType = {
  value: string,
  label: string,
  datasDesabilitadas: string[],
  recorrente: boolean,
  specificPeriod: [Date, Date],
  grade: {
    dia: 'seg' | 'ter' | 'qua' | 'qui' | 'sex',
    horarios: {
      horarioInicio: string,
      horarioTermino: string,
      vagas: number,
    }[] }[],
  partner: { id: string, nome_fantasia: string },
  featPartner: { id: string, nome_fantasia: string } | null,
  ativo: boolean,
};

export type PartnerType = { value: string, label: string };
export type DateTimeOption = { id: null | string, date: null | string, startTime: string | null, endTime: null | string }
export type DateTimeType = {[ key: string ]: DateTimeOption[]};

export type ActivitiesOptionsApiResponse = {
  success: boolean;
  activities: {
    id: string;
    nome: string,
    grade: {
      dia: 'seg' | 'ter' | 'qua' | 'qui' | 'sex',
      horarios: {
        horarioInicio: string,
        horarioTermino: string,
        vagas: number,
      }[] }[],
    datasDesabilitadas: string[],
    recorrente: boolean;
    specificPeriod: [Date, Date],
    partner: { id: string, nome_fantasia: string },
    featPartner: { id: string, nome_fantasia: string } | null,
    ativo: boolean,
  }[];
}
