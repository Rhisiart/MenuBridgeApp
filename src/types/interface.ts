export interface IFrame {
  version: number;
  cmd: number;
  sequence: number;
  dataLength: number;
  data: Uint8Array;
}

export interface IFloor {
  id: number,
  name: string, 
  tables: ITable[],
}

export interface ITable {
  id: number,
	capacity: number,
}
