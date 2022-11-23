  import { FC, FormEvent, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { IAccount } from "../../models/aсcountModel";
import { useInput } from "../../utils/Validations";
import Modal from "../Modal/Modal"

interface IProps {
  children?: ReactNode,
  title: string;
  titleButton: string;
  submit: (values: IAccount) => void;
}

const Form: FC<IProps> = ({ children, title, titleButton, submit }) => {

  const location = useLocation();
  const loginInput = useInput('', {minLength: 2, isEmpty: true })
  const passwordInput = useInput('', {minLength: 4, isEmpty: true })

  const submitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    submit({
      login: loginInput.value,
      password: passwordInput.value
    });
  }

  return(
    <Modal title={title}>
      <form className="form" onSubmit={(evt) => submitForm(evt)}>
      <label className="form__label">Логин
          <input className="form__input" type="text" value={loginInput.value} autoComplete="off"
            onBlur={loginInput.onBlur} onChange={e => loginInput.onChange(e)} />
          <span className="form__error">
            {loginInput.isDirty && loginInput.error}
          </span>
        </label>

        <label className="form__label">Пароль
          <input className="form__input" type="password" value={passwordInput.value} autoComplete="off"
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
      {children}
    </Modal>
  )
}

export default Form

