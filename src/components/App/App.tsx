import React from "react";
import Header from '../Header/Header'
import Main from '../Main/Main'
import { dbApi } from '../../utils/Api'
import { Route, Routes } from "react-router-dom";
import Info from "../Info/Info";
import Layout from "../Layout/Layout";
import Invite from "../Invite/Invite";
import Schedule from "../Schedule/Schedule";
import { Calendar } from "../Brackets/Brackets";

function App() {
  const [guildMessages, setGuildMessages] = React.useState([]);
  const [serverMessages, setServerMessages] = React.useState([]);
  const SAMPLE_META = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

  // Функция для запроса сообщений сервера
  const getServerMessages = () => {
    dbApi.getMessages()
      .then((messages) => setServerMessages(messages))
      .catch((err) => console.log(err.message))
  }

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
        <Route path="/schedule" element={<Schedule/>} />
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
        ]}/>} />
      </Routes>
    </div>
  )
}

export default App;


