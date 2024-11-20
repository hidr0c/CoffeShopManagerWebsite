export interface ISellItem {
    name: string;
    price: number;
    quant: number;
    unit: string;
}

export interface ISell {
    customerName: string;
    phoneNumber: string;
    sellDate: string;
    values: ISellItem[];
}

export interface SellListResponse {
    result: string;
    sellItems?: ISellItem[];
    total?: number;
    limit?: number;
    page?: number;
    message?: string;
}