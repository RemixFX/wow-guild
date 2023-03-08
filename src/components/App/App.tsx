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
import { IAccount } from "../../models/aсcountModel";
import InfoSlider from "../InfoSlider/infoSlider";
import Constructor from "../Constructor/Constructor";
import Modal from "../Modal/Modal";

function App() {
  const dispatch = useAppDispatch();
  const { loggedIn, infoMessage } = useAppSelector(state => state.admin)

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

  console.log(loggedIn)

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
      <Modal login={login} register={register} />
      {(infoMessage) && <InfoSlider infoMessage={infoMessage} />}
    </div>
  )
}

export default App;


