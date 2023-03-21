import { FC, FormEvent, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { IAccount } from "../../models/aсcountModel";
import { IError } from "../../models/globalError";
import { useInput } from "../../utils/Validations";
import Preloader from "../Preloader/Preloader";

interface IProps {
  children?: ReactNode;
  title: string;
  error: IError;
  loading: boolean;
  titleButton: string;
  submit: (values: IAccount) => void;
  handleCloseForm: () => void;
}

const Form: FC<IProps> = ({ children, title, error, loading, titleButton, submit, handleCloseForm }) => {

  const location = useLocation();
  const loginInput = useInput('', { minLength: 2, isEmpty: true })
  const passwordInput = useInput('', { minLength: 4, isEmpty: true })

  const submitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    submit({
      name: loginInput.value,
      password: passwordInput.value
    });
  }

  return (
    <div className='modal__wrapper'>
      <h3 className={`modal__header ${(location.pathname === '/schedule'
        || location.pathname === '/brackets') && 'modal__header_style_gold'}`}>{title}</h3>
      <button type="button" className="modal__close-button"
        onClick={handleCloseForm}> &#215;</button>
      <div className="modal__inner">
        <form className="form" onSubmit={(evt) => submitForm(evt)}>
          {children}
          <label className="form__label">Логин
            <input className="form__input" type="text" value={loginInput.value}
              onBlur={loginInput.onBlur} onChange={e => loginInput.onChange(e)} />
            <span className="form__error">
              {loginInput.isDirty && loginInput.error}
            </span>
          </label>

          <label className="form__label">Пароль
            <input className="form__input" type="password" value={passwordInput.value}
              onBlur={passwordInput.onBlur} onChange={e => passwordInput.onChange(e)} />
            <span className="form__error">
              {passwordInput.isDirty && passwordInput.error}
            </span>
          </label>
          <button disabled={!loginInput.inputValid || !passwordInput.inputValid}
            type="submit" className={`form__button ${(location.pathname === '/schedule' ||
              location.pathname === '/brackets') && 'form__button_style_gold'}`}>
            {titleButton}
          </button>
        </form><div className="form__error-response">
          {loading && <Preloader addClass={'lds-spinner_style_l'} />}
          {error.isError && '-- ' + error.message + ' --'}
        </div>
      </div>
    </div>
  )
}

export default Form

