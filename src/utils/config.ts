import { IGroup, IGroupData } from "../models/bracketsModel";
import { IEvents } from "../models/eventsModel";
import { IPlayer } from "../models/playerModel";

// ID гильдии
const GUILD_ID = 225

// ID игрового мира гильдии
const GUILD_REALM_ID = '57'

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

const group1: IGroup[] = [
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
    role: 'Лекарь',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '3',
    role: 'Лекарь',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '4',
    role: 'РДД',
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
  }
]

const group2: IGroup[] = [
  {
    id: '6',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '7',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '8',
    role: 'МДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '9',
    role: 'МДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '10',
    role: 'МДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  }
]

const group3: IGroup[] = [
  {
    id: '11',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '12',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '13',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '14',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '15',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  }
]

const group4: IGroup[] = [
  {
    id: '16',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '17',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '18',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '19',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '20',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  }
]

const group5: IGroup[] = [
  {
    id: '21',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '22',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '23',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '24',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  },
  {
    id: '25',
    role: 'РДД',
    name: '',
    class_name: '',
    race: '',
    ilvl: null
  }
]

const raid10: Record<string, IGroupData> = {
  group1: {
    title: "I группа",
    players: group1
  },
  group2: {
    title: "II группа",
    players: group2
  }
}

const raid25: Record<string, IGroupData> = {
  group1: {
    title: "I группа",
    players: group1
  },
  group2: {
    title: "II группа",
    players: group2
  },
  group3: {
    title: "III группа",
    players: group3
  },
  group4: {
    title: "IV группа",
    players: group4
  },
  group5: {
    title: "V группа",
    players: group5
  }
}

const raidBuffs = [
  {
    buff: '5% крит',
  },
  {
    buff: '3% РДД хаст'
  },
  {
    buff: '3% меткость'
  },
  {
    buff: '20% МДД хаст'
  },
  {
    buff: '5% МДД крит'
  },
  {
    buff: '3% доп физ урон'
  },
  {
    buff: '5% РДД крит'
  },
  {
    buff: '10% силы атаки'
  }
]

const groupRaceBuffs = [
  {
    buff: '+1% криту',
    sourseBuff: 'Эльф крови'
  },
  {
    buff: '+5ед/5% к осн. ресурсу',
    sourseBuff: 'Ночнорожденный'
  },
  {
    buff: '+5ед/5% к осн. ресурсу',
    sourseBuff: 'Эльф Бездны'
  },
  {
    buff: '+2% множитель крита',
    sourseBuff: 'Эредар'
  },
  {
    buff: '+2% множитель крита',
    sourseBuff: 'Дворф Черного Железа'
  },
  {
    buff: '+1% силы атаки и силы заклинаний',
    sourseBuff: 'Зандалар'
  },
  {
    buff: '+1% силы атаки и силы заклинаний',
    sourseBuff: 'Озаренный дреней'
  },
  {
    buff: '+2% силы',
    sourseBuff: 'Орк'
  },
  {
    buff: '1% снижение физ. урона',
    sourseBuff: 'Таурен'
  },
  {
    buff: '+2% духа',
    sourseBuff: 'Тролль'
  },
  {
    buff: '+1% к скорости атаки и заклинаний',
    sourseBuff: 'Дворф'
  },
  {
    buff: '+1% меткости',
    sourseBuff: 'Гном'
  },
  {
    buff: '+2% выносливости',
    sourseBuff: 'Дреней'
  },
  {
    buff: '+2% ловкости',
    sourseBuff: 'Ворген'
  },
  {
    buff: '+2% интелекта',
    sourseBuff: 'Высший эльф'
  }
]

//Получение списка групповых бафов
const getNameGroupBuff = (playersGroup: IGroup[]) => {
  let namesBuff: string[] = []
  groupRaceBuffs.forEach((item) => {
    return playersGroup.forEach((p) => {
      if (item.sourseBuff === p.race) {
        namesBuff = [...namesBuff, item.buff]
      }
    })
  })
  return namesBuff.join(', ')
}

// Изменение фона модального окна брекета

const changeModalBracketBackground = (value: string) => {
  const styleDefault = require('../images/online_bg.png')
  const styleIce = require('../images/bg_ice.png')
  const styleSindra = require('../images/bg_sindragosa.jpg')
  const styleLichKing = require('../images/bg_lichking.jpg')
  const stylePortal = require('../images/bg_portal.jpeg')
  const styleHorde = require('../images/bg_horde.jpg')
  const styleDragon = require('../images/bg_dragon.jpg')
  const styleAliance = require('../images/bg_aliance.jpg')
  const styleHeartStone = require('../images/bg_heartstone.jpg')
  const stylePergament = require('../images/bg_pergament.jpg')
  const styleCrystal = require('../images/bg_crystal.jpg')
  switch (value) {
    case 'По умолчанию':
      return { backgroundImage: `url(${styleDefault})` }
    case 'Лёд':
      return { backgroundImage: `url(${styleIce})` }
    case 'Синдрагоса':
      return { backgroundImage: `url(${styleSindra})` }
    case 'Король Лич':
      return { backgroundImage: `url(${styleLichKing})` }
    case 'Портал':
      return { backgroundImage: `url(${stylePortal})` }
    case 'Орда':
      return { backgroundImage: `url(${styleHorde})` }
    case 'Альянс':
      return { backgroundImage: `url(${styleAliance})` }
    case 'Смертокрыл':
      return { backgroundImage: `url(${styleDragon})` }
    case 'HeartStone':
      return { backgroundImage: `url(${styleHeartStone})` }
    case 'Пергамент':
      return { backgroundImage: `url(${stylePergament})` }
    case 'Crystal':
      return { backgroundImage: `url(${styleCrystal})` }
  }
}


export {
  GUILD_ID, GUILD_REALM_ID, cardStyle, classColor, raid10, raid25, raidBuffs,
  groupRaceBuffs, getNameGroupBuff, changeModalBracketBackground
}
