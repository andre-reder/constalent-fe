import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useApiCall from "../../../../hooks/useApiCall";
import candidatesService from "../../../../services/candidatesService";
import removeDuplicates from "../../../../utils/removeDuplicates";
import splitArray from "../../../../utils/splitArray";
import { CandidateType, GetCandidatesApiResponse, OptionType } from "../../types";

interface IUseLoadCandidates {
  setCandidatesSplitted: Dispatch<SetStateAction<Array<CandidateType[]>>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setFilteredCandidates: Dispatch<SetStateAction<CandidateType[]>>;
}

export default function useLoadCandidates({
  setCandidatesSplitted,
  setCurrentPage,
  setFilteredCandidates,
}: IUseLoadCandidates) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  const [graduationCourseOptions, setGraduationCourseOptions] = useState<OptionType[]>([]);

  const { apiCall } = useApiCall();

  const educationLevelOptions = useMemo(() => ([
    { value: 'fundamental', label: 'Ensino Fundamental' },
    { value: 'medium', label: 'Ensino Médio' },
    { value: 'superior', label: 'Superior' },
    { value: 'postGraduation', label: 'Pós-graduação' },
    { value: 'master', label: 'Mestrado' },
    { value: 'doctorate', label: 'Doutorado' },
  ]), []);

  const statusOptions = useMemo(() => ([
    { value: 'stored', label: 'Disponível' },
    { value: 'applied', label: 'Aplicado' },
    { value: 'hired', label: 'Contratado' },
  ]), []);

  const getCandidates = useCallback(async () => {
    await apiCall({
      apiToCall: candidatesService.getCandidates,
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      catchAction: () => setHasError(true),
      catchMessage: 'Houve um erro ao carregar os candidatos. Por favor, tente novamente',
      actionAfterResponse: (response: GetCandidatesApiResponse) => {
        if (!response.success) {
          setHasError(true);
          toast.error(`Houve um erro ao carregar os candidatos - ${response.message}`);
          return;
        }

        if (!response.candidates || response.candidates.length === 0) {
          setCandidates([]);
          return;
        }

        setHasError(false);
        setCandidates(response.candidates);

        const splittedArray = splitArray(response.candidates);
        setCandidatesSplitted(splittedArray);
        setCurrentPage(0);
        setFilteredCandidates(splittedArray[0]);

        const allGraduationCourses = response.candidates.map(candidate => candidate.graduationCourse);
        const uniqueGraduationCourses: string[] = removeDuplicates(allGraduationCourses);
        const mappedGraduationCourses = uniqueGraduationCourses.map(course => ({ value: course, label: course }));
        setGraduationCourseOptions(mappedGraduationCourses);
      },
    })
  }, [apiCall, setCurrentPage, setFilteredCandidates, setCandidatesSplitted]);

  useEffect(() => {
    getCandidates();
  }, [getCandidates]);

  return {
    isLoadLoading: isLoading,
    candidates,
    hasError,
    getCandidates,
    educationLevelOptions,
    graduationCourseOptions,
    statusOptions,
  };
}
