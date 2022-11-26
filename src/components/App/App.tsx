import { useEffect, useState } from "react";
import Main from '../Main/Main'
import { dbApi } from '../../utils/Api'
import { Route, Routes } from "react-router-dom";
import Info from "../Info/Info";
import Layout from "../Layout/Layout";
import Invite from "../Invite/Invite";
import Schedule from "../Schedule/Schedule";
import { Calendar } from "../Brackets/Brackets";
import { fetchEvents, fetchLogin, fetchRegister } from "../../store/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Form from "../Form/Form";
import { IAccount } from "../../models/aсcountModel";
import { adminSlice } from "../../store/reducers/adminSlice";
import InfoSlider from "../InfoSlider/infoSlider";

function App() {
  const [guildMessages, setGuildMessages] = useState([]);
  const [serverMessages, setServerMessages] = useState([]);
  const SAMPLE_META = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  const dispatch = useAppDispatch();
  const { error, loading, infoMessage, openLoginForm, openRegisterForm } = useAppSelector(state => state.admin)

  // Запрос данных при загрузке сайта
  useEffect(() => {

    dbApi.getUserData().then((res) => {
      dispatch(adminSlice.actions.isLoggedIn(res.name))
    })
      .catch((err => console.log(err)))
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
          <Route path="/" element={<Main
            guildMessages={guildMessages}
            serverMessages={serverMessages} />
          } />

        </Route>
        <Route path="/schedule" element={<Schedule />} />
        <Route path="qq" element={<Calendar
          month={10}
          year={2021}
          preloadedEvents={[
            {
              id: 1,
              name: "Holiday",
              dateFrom: "2021-09-29T12:00",
              dateTo: "2021-10-03T08:45",
              meta: SAMPLE_META,
              type: "Holiday"
            },
            {
              id: 2,
              name: "Meeting",
              dateFrom: "2021-10-01T09:45",
              dateTo: "2021-10-04T22:00",
              meta: SAMPLE_META,
              type: "Standard"
            },
            {
              id: 3,
              name: "Away",
              dateFrom: "2021-10-01T01:00",
              dateTo: "2021-10-01T23:59",
              meta: SAMPLE_META,
              type: "Busy"
            },
            {
              id: 4,
              name: "Inspection",
              dateFrom: "2021-10-19T07:30",
              dateTo: "2021-10-21T23:59",
              meta: SAMPLE_META,
              type: "Standard"
            },
            {
              id: 5,
              name: "Holiday - Greece",
              dateFrom: "2021-10-14T08:00",
              dateTo: "2021-10-16T23:59",
              meta: SAMPLE_META,
              type: "Holiday"
            },
            {
              id: 6,
              name: "Holiday - Spain",
              dateFrom: "2021-10-29T08:00",
              dateTo: "2021-10-31T23:59",
              meta: SAMPLE_META,
              type: "Holiday"
            }
          ]} />} />
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


