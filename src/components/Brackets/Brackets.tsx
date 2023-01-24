import { classColor, getNameGroupBuff, raid25 } from "../../utils/config"
import Topbar from "../Topbar/Topbar"

const Brackets = () => {
  return (
    <section className="brackets">
      <Topbar />
      <div className="bracket">
        <h1 className="bracket__header">Составы 25ки:</h1>
        <div className="bracket__raid_page_bracket">
          {Object.entries(raid25).map(([groupId, group]) =>
            <div className="bracket__group" key={groupId}>
              <ul className="bracket__notations_page_bracket">
                <li className="bracket__notation">Роль</li>
                <li className="bracket__notation">Имя</li>
                <li className="bracket__notation">Класс</li>
                <li className="bracket__notation">Раса</li>
                <li className="bracket__notation">Заметка</li>
              </ul>

              <div className="bracket__players">
                <h2 className="bracket__group-title">{group.title}</h2>
                {group.players.map((bplayer) =>
                  <ul className="bracket__row_page_bracket" key={bplayer.id}>
                    <li className="bracket__cell">{bplayer.role}</li>
                    <li className="bracket__cell">{bplayer.name}</li>
                    <li className="bracket__cell" style={classColor(bplayer)}>
                      {bplayer.class_name}
                    </li>
                    <li className="bracket__cell">{bplayer.race}</li>
                    <li className="bracket__cell">{bplayer.ilvl ? bplayer.ilvl : ""}</li>
                  </ul>
                )}
                <ul className="bracket__group-buffs">
                  <li className="bracket__group-buff">{getNameGroupBuff(group.players)}</li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default Brackets
