/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../contexts/auth";
interface UploadDocPayload {
  key: string;
  value: string | File | null | number | boolean | undefined;
}

interface ApiToCallInterface {
  reqBody?: string | UploadDocPayload[] | null,
  token: string,
}

interface ApiCallInterface {
  onStartLoad?: () => void,
  onEndLoad?: () => void,
  apiToCall: ({ token, reqBody }: ApiToCallInterface) => Promise<any>,
  reqBody?: string | UploadDocPayload[] | null,
  catchMessage?: string;
  catchAction?: () => void;
  actionAfterResponse: (response: any) => void;
  queryParams?: { [key: string]: string | boolean | number | undefined | null },
}

export default function useApiCall() {
  type AppContextType = {
    token: string;
    signOut: () => void;
  }

  const { token, signOut }: AppContextType = useAppContext();

  const apiCall = useCallback(async ({
    onStartLoad,
    onEndLoad,
    apiToCall,
    reqBody,
    queryParams,
    catchMessage,
    actionAfterResponse,
    catchAction,
  }: ApiCallInterface) => {
    try {
      if (onStartLoad) {
        onStartLoad();
      }

      const mergedParams = {
        token,
        reqBody,
        ...(queryParams ?? {}),
      };

      const apiResponse = await apiToCall(mergedParams);
      if (apiResponse === 'unauthorized') {
        signOut();
        return;
      }
      actionAfterResponse(apiResponse);
    } catch (error) {
      console.log(error)
      if (catchAction) {
        catchAction();
      }
      if (catchMessage) {
        toast.error(`${catchMessage} (${error})`);
        return;
      }
      toast.error(`Não foi possível concluir a solicitação. (${error})`);
      return;
    } finally {
      if (onEndLoad) {
        onEndLoad();
      }
    }
  }, [signOut, token]);

  return { apiCall };
}
