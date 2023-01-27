/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchBrackets } from "../../store/reducers/ActionCreators"
import { classColor, getNameGroupBuff } from "../../utils/config"
import Topbar from "../Topbar/Topbar"

const Brackets = () => {

  const dispatch = useAppDispatch();
  const { brackets, error, loading } = useAppSelector(state => state.brackets)

  useEffect(() => {
    dispatch(fetchBrackets())
  }, [])

  console.log(brackets)

  return (
    <section className="brackets">
      <Topbar />
      <div className="bracket">
        <h1 className="bracket__header">Составы 25ки:</h1>
        {brackets.raid25.map((bracket) =>
          <div className="bracket__raid_page_bracket" key={bracket.raidID}>
            <span className="bracket__raid-id">id рейда: {bracket.raidID}</span>
            {Object.entries(bracket.raid).map(([groupName, groupPlayers]) =>
              <div className="bracket__group" key={groupName}>
                <ul className="bracket__notations_page_bracket">
                  <li className="bracket__notation">Роль</li>
                  <li className="bracket__notation">Имя</li>
                  <li className="bracket__notation">Класс</li>
                  <li className="bracket__notation">Раса</li>
                  <li className="bracket__notation">Заметка</li>
                </ul>
                <div className="bracket__players">
                  <h2 className="bracket__group-title">{groupName}</h2>
                  {groupPlayers.map((player) =>
                    <ul className="bracket__row_page_bracket" key={player.id}>
                      <li className="bracket__cell">{player.role}</li>
                      <li className="bracket__cell">{player.name}</li>
                      <li className="bracket__cell" style={classColor(player)}>
                        {player.class_name}
                      </li>
                      <li className="bracket__cell">{player.race}</li>
                      <li className="bracket__cell">{player.note}</li>
                    </ul>
                  )}
                  <ul className="bracket__group-buffs">
                    <li className="bracket__group-buff">{getNameGroupBuff(groupPlayers)}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
        <h1 className="bracket__header">Составы 10ки:</h1>
        {brackets.raid10.map((bracket) =>
          <div className="bracket__raid_page_bracket" key={bracket.raidID}>
            <span className="bracket__raid-id">id рейда: {bracket.raidID}</span>
            {Object.entries(bracket.raid).map(([groupName, groupPlayers]) =>
              <div className="bracket__group" key={groupName}>
                <ul className="bracket__notations_page_bracket">
                  <li className="bracket__notation">Роль</li>
                  <li className="bracket__notation">Имя</li>
                  <li className="bracket__notation">Класс</li>
                  <li className="bracket__notation">Раса</li>
                  <li className="bracket__notation">Заметка</li>
                </ul>
                <div className="bracket__players">
                  <h2 className="bracket__group-title">{groupName}</h2>
                  {groupPlayers.map((player) =>
                    <ul className="bracket__row_page_bracket" key={player.id}>
                      <li className="bracket__cell">{player.role}</li>
                      <li className="bracket__cell">{player.name}</li>
                      <li className="bracket__cell" style={classColor(player)}>
                        {player.class_name}
                      </li>
                      <li className="bracket__cell">{player.race}</li>
                      <li className="bracket__cell">{player.note}</li>
                    </ul>
                  )}
                  <ul className="bracket__group-buffs">
                    <li className="bracket__group-buff">{getNameGroupBuff(groupPlayers)}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Brackets
