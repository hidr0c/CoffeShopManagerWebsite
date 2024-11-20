export interface IWarehouseItem {
  name: string;
  price: number;
  quant: number;
  unit: string;
}

export interface IWarehouse {
  _id?: string;
  supplierName: string;
  phoneNumber: string;
  importDate: string;
  values: IWarehouseItem[];
}

export interface IWarehouseRespone {
  result: string;
  message: string;
}
