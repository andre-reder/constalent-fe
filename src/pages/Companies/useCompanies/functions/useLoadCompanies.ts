import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApiCall from "../../../../hooks/useApiCall";
import companiesService from "../../../../services/companiesService";
import splitArray from "../../../../utils/splitArray";
import { CompanyType, GetCompaniesApiResponse } from "../../types";

interface IUseLoadCompanies {
  setCompaniesSplitted: Dispatch<SetStateAction<Array<CompanyType[]>>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setFilteredCompanies: Dispatch<SetStateAction<CompanyType[]>>;
}

export default function useLoadCompanies({
  setCompaniesSplitted,
  setCurrentPage,
  setFilteredCompanies,
}: IUseLoadCompanies) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [companies, setCompanies] = useState<CompanyType[]>([]);

  const { apiCall } = useApiCall();

  const getCompanies = useCallback(async () => {
    await apiCall({
      apiToCall: companiesService.getCompanies,
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      catchAction: () => setHasError(true),
      catchMessage: 'Houve um erro ao carregar as empresas. Por favor, tente novamente',
      actionAfterResponse: (response: GetCompaniesApiResponse) => {
        if (!response.success) {
          setHasError(true);
          toast.error(`Houve um erro ao carregar as empresas - ${response.message}`);
          return;
        }

        if (!response.companies || response.companies.length === 0) {
          setCompanies([]);
          return;
        }

        setHasError(false);
        setCompanies(response.companies);

        const splittedArray = splitArray(response.companies);
        setCompaniesSplitted(splittedArray);
        setCurrentPage(0);
        setFilteredCompanies(splittedArray[0]);
      },
    })
  }, [apiCall, setCurrentPage, setFilteredCompanies, setCompaniesSplitted]);

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  return {
    isLoadLoading: isLoading,
    companies,
    hasError,
    getCompanies,
  };
}
