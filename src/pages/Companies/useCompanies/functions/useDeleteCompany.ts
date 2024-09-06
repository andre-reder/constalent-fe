import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useApiCall from '../../../../hooks/useApiCall';
import companiesService from '../../../../services/companiesService';
import { CompanyType } from '../../types';

interface IUseDeleteCompany {
  loadCompanies: () => void;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function useDeleteCompany({
  loadCompanies,
  setSearchTerm,
}: IUseDeleteCompany) {
  const [isDeletingCompany, setIsDeletingCompany] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [companyBeingDeleted, setCompanyBeingDeleted] = useState<CompanyType>({} as CompanyType);

  const { apiCall } = useApiCall();

  const deleteCompany = useCallback(async (id: string) => {
    await apiCall({
      apiToCall: companiesService.deleteCompany,
      queryParams: { id },
      onStartLoad: () => setIsDeletingCompany(true),
      onEndLoad: () => setIsDeletingCompany(false),
      actionAfterResponse: (apiResponse) => {
        if (!apiResponse.success) {
          toast.error('Não foi possível remover a empresa. Por favor, tente novamente');
          return;
        }
        toast.success('Empresa removida com sucesso!');
        setDeleteModalShow(false);
        setSearchTerm('');
        loadCompanies();
      },
      catchMessage: 'Não foi possível remover a empresa. Por favor, tente novamente'
    })
  }, [apiCall, loadCompanies, setSearchTerm]);

  function handleOpenDeleteModal(user: CompanyType) {
    setDeleteModalShow(true);
    setCompanyBeingDeleted(user);
  }

  return {
    isDeletingCompany,
    deleteModalShow,
    setDeleteModalShow,
    companyBeingDeleted,
    deleteCompany,
    handleOpenDeleteModal,
  };
}
