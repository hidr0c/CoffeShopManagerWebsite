export interface IWarehouseItem {
    name: string;
    updateName?: string;
    price: number;
    updatePrice?: number;
    quant: number;
    updateQuant?: number;
    unit: string;
    updateUnit?: string;
}

export interface IWarehouse {
    customerName: string;
    updateCustomerName?: string;
    phoneNumber: string;
    updatePhoneNumber?: string;
    importDate: string;
    updateImportDate?: string;
    values: IWarehouseItem[];
}

export interface IWarehouseRespone{
    result: string;
    message: string;
}