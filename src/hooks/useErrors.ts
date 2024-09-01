import { useState } from 'react';

export interface ErrorsInterface {
  field: string;
  message: string;
}


export type GetErrorMessageByFieldNameType = (fieldname: string) => string | undefined;

export default function useErrors() {
  const [errors, setErrors] = useState<ErrorsInterface[]>([]);

  function setError({ field, message }: ErrorsInterface) {
    const errorFieldAlreadyExists = errors.find((error) => error.field === field);

    if (errorFieldAlreadyExists) {
      const isSameMessage = errorFieldAlreadyExists.message === message;
      if (isSameMessage) {
        return;
      }
      setErrors((prevState) => {
        const errorFieldIndex = prevState.findIndex((error) => error.field === field);
        const errorsCloned = JSON.parse(JSON.stringify(prevState));
        errorsCloned[errorFieldIndex] = { field, message };

        return errorsCloned;
      });
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError(fieldName: string) {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }

  function getErrorMessageByFieldName(fieldname: string) {
    return errors.find((error) => error.field === fieldname)?.message;
  }

  return {
    setError, removeError, getErrorMessageByFieldName, errors,
  };
}
