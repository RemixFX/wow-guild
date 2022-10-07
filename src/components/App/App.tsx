import React from "react";
import Header from '../Header/Header'
import Main from '../Main/Main'
import { dbApi } from '../../utils/Api'
import { Route, Routes } from "react-router-dom";
import Info from "../Info/Info";
import Layout from "../Layout/Layout";
import Invite from "../Invite/Invite";
import Schedule from "../Schedule/Schedule";

function App() {
  const [guildMessages, setGuildMessages] = React.useState([]);
  const [serverMessages, setServerMessages] = React.useState([]);

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
      </Routes>
    </div>
  )
}

export default App;


