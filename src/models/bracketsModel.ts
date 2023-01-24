import { raid25, raid10 } from "../utils/config";

export interface IGroup {
  id: string;
  role?: string;
  name: string;
  class_name: string;
  race: string;
  ilvl?: number | null;
}

export interface IGroupData extends Record<string, string | IGroup[]> {
  title: string;
  players: IGroup[];
}

export interface IBracket {
  id: string;
  role?: string;
  name: string;
  class_name: string;
  race: string;
  ilvl?: number | null;
  note: string;
  group_name: string;
  raid_id: number;
}


