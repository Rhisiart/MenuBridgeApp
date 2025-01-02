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
  order: IOrder
}

export interface IMenu extends ITab {
  description: string,
  price: number,
  orderItem?: IOrderItem
}

export interface ICategory extends ITab {
  menus: IMenu[],
}

export interface IFloorTable {
  id: number,
  number: number,
  floorId: number,
  tableId: number,
}

export interface IOrder {
  id?: number,
  customerId: number,
  statuscode: string,
  createdOn: string,
  floorTable: IFloorTable,
}

export interface IOrderItem {
  id: number,
  orderId?: number,
  menuId?: number,
  tableId?: number,
  quantity: number,
  price: number,
}

export interface IOrderItemMenu extends IOrderItem {
  menuName: string
}

