
export interface IGroup {
  id: string;
  role?: string;
  name: string;
  class_name: string;
  race: string;
  ilvl?: number | null;
}

export interface IGroupDB extends IGroup{
  note: string;
  group_name: string;
  raid_id: number;
  raid_name?: string;
}

export interface IBracket {
  raidID: string;
  raidName?: string;
  raid: {[group_name: string]: IGroupDB[]}
}

export interface IBrackets {
  raid25: IBracket[]
  raid10: IBracket[]
}

export interface IGroupData extends Record<string, string | IGroup[]> {
  title: string;
  players: IGroup[];
}

export interface IRaid {
  [raid_id: string]: {
    [group_name: string]: IGroupDB[]
  }
}

