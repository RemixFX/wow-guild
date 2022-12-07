import { IGroup } from "../models/bracketsModel";
import { IEvents } from "../models/eventsModel";
import { IPlayer } from "../models/playerModel";


// Стиль событий в зависимости от названия события
const cardStyle = (event: IEvents) => {
  let background;
  switch (event.name) {
    case 'ИК 25':
      background = { backgroundColor: '#3973e9' }
      break;
    case 'Логово Груула':
      background = { backgroundColor: '#7e5032db' }
      break;
    case 'Логово Магдеридона':
      background = { backgroundColor: '#678933' }
      break;
    case 'Ульдуар 25':
      background = { backgroundColor: '#8f4040' }
      break;
    case 'ИВК 25':
      background = { backgroundColor: '#003091', color: '#fbe0ae' }
      break;
    case 'героик Логово Груула':
      background = { backgroundColor: '#58331b', color: '#fbe0ae' }
      break;
    case 'героик Логово Магдеридона':
      background = { backgroundColor: '#3e5c0f', color: '#fbe0ae' }
      break;
    case 'Каражан об':
      background = { backgroundColor: '#8567a3cc' }
      break;
    case 'Каражан гер':
      background = { backgroundColor: '#47315c', color: '#fbe0ae' }
      break;
    case 'ИК 10 об':
      background = { backgroundColor: '#6a9ef5' }
      break;
    case 'ИВК 10 гер':
      background = { backgroundColor: '#3a5178', color: '#fbe0ae' }
      break;
    case 'Ульдуар 10':
      background = { backgroundColor: '#ad4343' }
      break;
    default:
      background = {
        background: 'linear-gradient(0deg, #000, #0b1587 53%, #000 100%)',
        color: '#fbe0ae'
      }
  }
  return background
}

// Цвет шрифта в зависимости от названия класса
const classColor = (player: IPlayer | IGroup) => {
  let color;
  switch (player.class_name) {
    case 'Воин':
      color = { color: '#ab820e' }
      break;
    case 'Друид':
      color = { color: '#eb7831' }
      break;
    case 'Жрец':
      color = { color: '#d9d9d9' }
      break;
    case 'Маг':
      color = { color: '#5ac2ff' }
      break;
    case 'Паладин':
      color = { color: '#fd8ada' }
      break;
    case 'Рыцарь смерти':
      color = { color: '#b10000' }
      break;
    case 'Охотник':
      color = { color: '#7aa737' }
      break;
    case 'Чернокнижник':
      color = { color: '#952cff' }
      break;
    case 'Шаман':
      color = { color: '#284cfd' }
      break;
    case 'Разбойник':
      color = { color: '#e6e946' }
      break;
    default:
      color = { color: '#fbe0ae' }
  }
  return color
}
const raid10 = [
  {
    id: "1",
    title: "I группа"
  },
  {
    id: "2",
    title: "II группа"
  }
]

const bracket10: IGroup[] = [
  {
    id: '1',
    role: 'Танк',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '2',
    role: 'Хиллер',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '3',
    role: 'Хиллер',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '4',
    role: '',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '5',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '6',
    role: 'Танк',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '7',
    role: 'Хиллер',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '8',
    role: 'Хиллер',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '9',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '10',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  }
]

const taskStatus = {
  requested: {
    name: "Requested",
    items: []
  },
  toDo: {
    name: "To do",
    items: []
  }
};

export { cardStyle, classColor, raid10, bracket10 }
