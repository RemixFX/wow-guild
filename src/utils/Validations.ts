// ВАЛИДАЦИЯ

import { useState, useEffect, ChangeEvent } from "react";

interface Validation {
  isEmpty: boolean;
  minLength: number;
}

function useValidation(value: string, validations: Validation) {
  const [isMinLength, setIsMinLength] = useState<boolean>(true)
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const [inputValid, setInputValid] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const lengthError = `поле должно содержать больше ${validations.minLength} символов`;
  const emptyError = 'поле не может быть пустым';

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value.length === 0 ? setIsEmpty(true) : setIsEmpty(false)
          break
        case 'minLength':
          value.length > validations[validation] ? setIsMinLength(false) : setIsMinLength(true)
          break
      }
    }
  }, [value])

  useEffect(() => {
    if (isEmpty) {
      setInputValid(false)
      setError(emptyError)
      return
    }
    if (isMinLength) {
      setInputValid(false)
      setError(lengthError)
    }
    else {
      setInputValid(true)
      setError('')
    }
  }, [isEmpty, isMinLength])

  return { isEmpty, error, inputValid }
}

function useInput(initialState: string, validations: Validation) {
  const [value, setValue] = useState(initialState)
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const valid = useValidation(value, validations)
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    setIsDirty(true)
  }
  return { value, setValue, isDirty, onChange, onBlur, ...valid }
}

export {useInput}
