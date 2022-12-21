export interface IGroup {
  id: string,
  role?: string,
  name: string,
  class_name: string,
  race: string,
  ilvl?: number | null
}

export interface IGroupData extends Record<string, string | IGroup[]> {
  title: string;
  players: IGroup[];
}
