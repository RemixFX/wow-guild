import { useEffect, useState } from "react";
import Main from '../Main/Main'
import { dbApi } from '../../utils/Api'
import { Route, Routes } from "react-router-dom";
import Info from "../Info/Info";
import Layout from "../Layout/Layout";
import Invite from "../Invite/Invite";
import Schedule from "../Schedule/Schedule";
import Brackets from "../Brackets/Brackets";
import { fetchAuthorization, fetchEvents, fetchLogin, fetchRegister } from "../../store/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Form from "../Form/Form";
import { IAccount } from "../../models/aсcountModel";
import InfoSlider from "../InfoSlider/infoSlider";
import Constructor from "../Constructor/Constructor";
import ModalBrackets from "../ModalBrackets/ModalBrackets";

function App() {
  const [guildMessages, setGuildMessages] = useState([]);
  const [serverMessages, setServerMessages] = useState([]);
  const dispatch = useAppDispatch();
  const { error, loading, infoMessage, openLoginForm, openRegisterForm } = useAppSelector(state => state.admin)

  // Запрос данных при загрузке сайта
  useEffect(() => {
    dispatch(fetchAuthorization())
  }, [])


  // Регистрация нового аккаунта
  const register = (value: IAccount) => {
    dispatch(fetchRegister(value))
  }

  // Вход в аккаунт
  const login = (value: IAccount) => {
    dispatch(fetchLogin(value))
  }

  // Функция для запроса сообщений сервера
  const getServerMessages = () => {
    dbApi.getMessages()
      .then((messages) => setServerMessages(messages))
      .catch((err) => console.log(err.message))
  }

  // Запрос массива созданных событий
  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/info" element={<Info />} />
          <Route path="/invite" element={<Invite />} />
          {/* <Route path="/brackets" element={<ModalBrackets/>} /> */}
          <Route path="/" element={<Main
            guildMessages={guildMessages}
            serverMessages={serverMessages} />
          } />
        </Route>
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/brackets" element={<Brackets />} />
        <Route path="/constructor" element={<Constructor />} />
      </Routes>
      {openLoginForm && <Form
        title={'Войти в аккаунт'}
        titleButton={'Войти'}
        error={error.message}
        loading={loading}
        submit={login}>
        <p style={{ marginTop: "0", fontSize: "0.8rem", fontStyle: "italic" }}>
          Войти в аккаунт могут только учётные записи администратора.
          Что бы создать такой аккаунт, нужно зайти с учётной записи администратора.
        </p>
      </Form>}
      {openRegisterForm && <Form
        title={'Создать новый аккаунт для офицеров'}
        submit={register}
        error={error.message}
        loading={loading}
        titleButton={'Создать'}>
        <p style={{ marginBottom: "0", fontSize: "0.8rem", fontStyle: "italic" }}>
          Созданный аккаунт будет обладать всеми правами администратора.
        </p>
      </Form>}
      {(infoMessage) && <InfoSlider infoMessage={infoMessage} />}

    </div>
  )
}

export default App;


