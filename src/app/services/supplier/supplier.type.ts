export interface ISupplier {
  _id?: string;
  name: string;
  field: string;
  phone: string;
  address: string;
}

export interface ISupplierResponse {
  result: string;
  message: string;
}
