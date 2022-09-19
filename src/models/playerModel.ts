export interface IPlayer {
  guid: number;
  class_name: string;
  equipment_lvl: {
    avgItemLevel: number,
    lastBGMaxItemLevel: number,
    maxItemLevel: number
  };
  level: number;
  name: string;
  online: number;
  pivot: {
    guid: number,
    guildid: number,
    offnote: string,
    pnote: string,
    rank: number
  }
}
