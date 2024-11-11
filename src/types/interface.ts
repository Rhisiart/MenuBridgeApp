export interface IFrame {
  version: number;
  cmd: number;
  sequence: number;
  dataLength: number;
  data: Uint8Array;
}

export interface ITab {
  id: number,
  name: string,
}

export interface IFloor extends ITab { 
  tables: ITable[],
}

export interface ITable {
  id: number,
  number: number,
	capacity: number,
}

export interface IMenu extends ITab {
  description: string,
  price: number,
}

export interface ICategory extends ITab {
  menus: IMenu[],
}
