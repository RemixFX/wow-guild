/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Main from '../Main/Main'
import { Route, Routes } from "react-router-dom";
import Info from "../Info/Info";
import Layout from "../Layout/Layout";
import Invite from "../Invite/Invite";
import Schedule from "../Schedule/Schedule";
import Brackets from "../Brackets/Brackets";
import { fetchAuthorization, fetchEvents, fetchGuildNews, fetchLogin, fetchRegister, fetchServerNews } from "../../store/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Form from "../Form/Form";
import { IAccount } from "../../models/aсcountModel";
import InfoSlider from "../InfoSlider/infoSlider";
import Constructor from "../Constructor/Constructor";

function App() {
  const dispatch = useAppDispatch();
  const { error, loading, infoMessage, openLoginForm, openRegisterForm } = useAppSelector(state => state.admin)

  // Запрос данных при загрузке сайта
  useEffect(() => {
    dispatch(fetchAuthorization())
    dispatch(fetchServerNews())
    dispatch(fetchGuildNews())
  }, [])


  // Регистрация нового аккаунта
  const register = (value: IAccount) => {
    dispatch(fetchRegister(value))
  }

  // Вход в аккаунт
  const login = (value: IAccount) => {
    dispatch(fetchLogin(value))
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
          <Route path="/" element={<Main />
          } />
        </Route>
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/brackets" element={<Brackets />} />
        <Route path="/constructor" element={<Constructor />} />
      </Routes>
      <Form
        title={openRegisterForm ? 'Создать новый аккаунт для офицеров' : 'Войти в аккаунт'}
        titleButton={openRegisterForm ? 'Создать' : 'Войти'}
        error={error.message}
        loading={loading}
        submit={openRegisterForm ? register : login}>
        {
          openRegisterForm ?
            <p style={{ marginBottom: "0", fontSize: "0.8rem", fontStyle: "italic" }}>
              Созданный аккаунт будет обладать всеми правами администратора.
            </p>
            :
            <p style={{ marginTop: "0", fontSize: "0.8rem", fontStyle: "italic" }}>
              Войти в аккаунт могут только учётные записи администратора.
              Что бы создать такой аккаунт, нужно зайти с учётной записи администратора.
            </p>
        }
      </Form>
      {(infoMessage) && <InfoSlider infoMessage={infoMessage} />}

    </div>
  )
}

export default App;


