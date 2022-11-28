import { FC, FormEvent, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { IAccount } from "../../models/aсcountModel";
import { useInput } from "../../utils/Validations";
import Modal from "../Modal/Modal"
import Preloader from "../Preloader/Preloader";

interface IProps {
  children?: ReactNode,
  title: string;
  error: string;
  loading: boolean;
  titleButton: string;
  submit: (values: IAccount) => void;
}

const Form: FC<IProps> = ({ children, title, error, loading, titleButton, submit }) => {

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
    <Modal title={title}>
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
          type="submit" className={`form__button ${location.pathname === '/schedule' &&
            'form__button_style_gold'}`}>
          {titleButton}
        </button>
      </form>
      <div className="form__error-response">
        {loading && <Preloader addClass={'lds-spinner_style_l'} />}
        {error && '-- ' + error + ' --'}
      </div>
    </Modal>
  )
}

export default Form

