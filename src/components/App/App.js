import React from "react";
import Header from '../Header/Header'
import Main from '../Main/Main'
import api from '../../utils/Api'

function App() {

  const [players, setPlayers] = React.useState([]);

  //Запрос списка игроков онлайн
  const getUsers = () => {
    api.getUsers()
    .then((data) => {
      return data.members.filter((player) => player.online)
    })
    .then((player) => setPlayers(player))
    .catch((err) => {
      console.log(err.message)
    })
  }

  React.useEffect(() => {
    getUsers()
  }, [])

  console.log(players)

  return (
  <div className="App">
    <Header/>
    <Main players={players}/>
  </div>
  )
}

export default App;
