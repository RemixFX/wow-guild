import React from "react";

function Sheet(props) {

  let rank;
  switch (props.player.pivot.rank) {
    case 1:
      rank = 'ГМ'
      break;
    case 2:
      rank = 'банкир'
      break;
    case 4:
      rank = 'офицер'
      break;
    case 5:
      rank = 'ветеран'
      break;
    case 6:
      rank = 'рейдер'
      break;
    case 9:
      rank = 'новичёк'
      break;
    default:
      rank = 'хз';
  }

  return (
    <ul className="sheet">
      <li className="sheet__cell">{rank}</li>
      <li className="sheet__cell">{props.player.name}</li>
      <li className="sheet__cell">{props.player.class_name}</li>
      <li className="sheet__cell">{props.player.equipment_lvl.avgItemLevel}</li>
      <li className="sheet__cell">{props.player.level}</li>
    </ul>
  )
}

export default Sheet;
