export interface IProduct {
    name: string;
    price: number;
    unit: string;
    description?: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductListResponse {
    result: string;
    products?: string[]; // Assuming "products" is an array of product names (strings)
    message?: string;
}

export interface ProductCountResponse {
    result: string;
    count?: number;
    message?: string;
}

export interface ProductSearchResponse {
    result: string;
    products?: string[];
    message?: string;
}

// Define the request structure for adding a product
export interface AddProductRequest {
    name: string;
    price: number;
    quantity: number;
}

// Define the response structure for adding a product
export interface AddProductResponse {
    result: string;
    message: string;
    product?: string;
}