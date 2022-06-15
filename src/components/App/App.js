import React from "react";
import Header from '../Header/Header'
import Main from '../Main/Main'
import api from '../../utils/Api'

function App() {

  const [players, setPlayers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEmptyResult, setIsEmptyResult] = React.useState(false);

    // Показ сообщения, если игроки не найдены
    const showPreloaderMessage = () => {
      setIsEmptyResult(true)
      setTimeout(() => {
        setIsLoading(false)
        setIsEmptyResult(false)
      }, 1800)
    }

  //Запрос списка игроков онлайн
  React.useEffect(() => {
    setIsLoading(true);
    api.getUsers()
    .then((data) => {
      return data.members.filter((player) => player.online)
    })
    .then((player) => {
      if (player.length === 0) {
        setIsLoading(false)
        setIsEmptyResult(true)
      } else {
        setPlayers(player)
        setIsLoading(false)
      }
    })
    .catch((err) => {
      console.log(err.message)
      setIsLoading(false)
      setIsEmptyResult(true)
    })
  }, [])

  return (
  <div className="App">
    <Header/>
    <Main
    players={players}
    isLoading={isLoading}
    isEmptyResult={isEmptyResult}
    />
  </div>
  )
}

export default App;
