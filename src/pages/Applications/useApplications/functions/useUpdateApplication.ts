import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import useApiCall from "../../../../hooks/useApiCall";
import useErrors from "../../../../hooks/useErrors";
import applicationsService from "../../../../services/applicationsService";
import formatCurrency from "../../../../utils/formatCurrency";
import parseCurrencyStringToFloat from "../../../../utils/parseCurrencyStringToFloat";
import { ApplicationStatus, ApplicationType } from "../../types";

export default function useUpdateApplication({ getApplications }: { getApplications: () => Promise<void> }) {
  const [applicationBeingUpdated, setApplicationBeingUpdated] = useState<ApplicationType>({} as ApplicationType);

  const [newStatus, setNewStatus] = useState<ApplicationStatus | ''>('');
  const [changeStatusModalShow, setChangeStatusModalShow] = useState(false);

  const [finalSalary, setFinalSalary] = useState('');
  const [changeSalaryModalShow, setChangeSalaryModalShow] = useState(false);

  const [isUpdatingApplication, setIsUpdatingApplication] = useState(false);

  const { apiCall } = useApiCall();
  const { errors, setError, removeError } = useErrors();

  function handleOpenChangeSalaryModal(application: ApplicationType) {
    setChangeSalaryModalShow(true);
    setFinalSalary(application.finalSalary ? formatCurrency(application.finalSalary) : '');
    removeError('finalSalary');
    setApplicationBeingUpdated(application);
  };

  function handleOpenChangeStatusModal(application: ApplicationType) {
    setNewStatus(application.status);
    setChangeStatusModalShow(true);
    removeError('finalSalary');
    setApplicationBeingUpdated(application);
  };

  function handleFinalSalaryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFinalSalary(formatCurrency(e.target.value));

    if (!e.target.value) {
      setError({ field: 'finalSalary', message: 'Salário é Obrigatório!' });
    } else {
      removeError('finalSalary');
    }
  }

  const changeStatus = useCallback(async () => {
    await apiCall({
      apiToCall: applicationsService.updateApplication,
      queryParams: { id: applicationBeingUpdated.id },
      reqBody: JSON.stringify({ status: newStatus }),
      onStartLoad: () => setIsUpdatingApplication(true),
      onEndLoad: () => setIsUpdatingApplication(false),
      actionAfterResponse: async (response) => {
        if (!response.success) {
          toast.error('Não foi possível alterar o status da aplicação. Por favor, tente novamente.');
          return;
        }
        toast.success('Status da aplicação editada com sucesso!');
        await getApplications();
        setChangeStatusModalShow(false);
      },
    })
  }, [apiCall, applicationBeingUpdated.id, newStatus, getApplications]);

  const changeSalary = useCallback(async () => {
    await apiCall({
      apiToCall: applicationsService.updateApplication,
      queryParams: { id: applicationBeingUpdated.id },
      reqBody: JSON.stringify({ finalSalary: parseCurrencyStringToFloat(finalSalary) }),
      onStartLoad: () => setIsUpdatingApplication(true),
      onEndLoad: () => setIsUpdatingApplication(false),
      actionAfterResponse: async (response) => {
        if (!response.success) {
          toast.error('Não foi possível alterar o salário final acordado da aplicação. Por favor, tente novamente.');
          return;
        }
        toast.success('Salário final acordado da aplicação alterado com sucesso!');
        await getApplications();
        setChangeSalaryModalShow(false);
      },
    })
  }, [apiCall, applicationBeingUpdated.id, finalSalary, getApplications]);

  const canChangeSalary = !!(errors.length === 0 && finalSalary)

  return {
    applicationBeingUpdated,
    handleOpenChangeStatusModal,
    handleOpenChangeSalaryModal,
    changeStatusModalShow,
    changeSalaryModalShow,
    changeStatus,
    changeSalary,
    isUpdatingApplication,
    handleFinalSalaryChange,
    errors,
    newStatus,
    setNewStatus,
    finalSalary,
    setChangeStatusModalShow,
    setChangeSalaryModalShow,
    appplicationBeingUpdated: applicationBeingUpdated,
    canChangeSalary,
  }
}
