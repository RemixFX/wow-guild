import { FC } from "react";
import { IPlayer } from "../../models/playerModel";

const Sheet: FC<{ player: IPlayer }> = ({ player }) => {

  let rank;
  switch (player.pivot.rank) {
    case 0:
      rank = 'ГМ'
      break;
    case 1:
      rank = 'ст. офицер'
      break;
    case 2:
      rank = 'офицер'
      break;
    case 3:
      rank = 'проф рейдер'
      break;
    case 4:
      rank = 'рейдер'
      break;
    case 5:
      rank = 'твин'
      break;
    case 6:
      rank = 'кандидат'
      break;
    case 7:
      rank = 'участник'
      break;
    case 8:
      rank = 'новичек'
      break;
    case 9:
      rank = 'для бонуса'
      break;
    default:
      rank = 'новая роль';
  }

  return (
    <ul className="sheet">
      <li className="sheet__cell">{rank}</li>
      <li className="sheet__cell">{player.name}</li>
      <li className="sheet__cell">{player.class_name}</li>
      <li className="sheet__cell">{player.equipment_lvl.avgItemLevel}</li>
      <li className="sheet__cell">{player.level}</li>
    </ul>
  )
}

export default Sheet;
