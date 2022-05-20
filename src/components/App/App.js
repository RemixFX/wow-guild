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
       data.members.filter((player) => {
        if (player.online) {
          console.log(player.name)
        }
      })
    })
    .then((players) => console.log(players))
    .catch((err) => {
      console.log(err.message)
    })
  }

  React.useEffect(() => {
    getUsers()
  }, [])



  return (
  <div className="App">
    <Header/>
    <Main players={players}/>
  </div>
  )
}

export default App;
