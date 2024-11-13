import Api from "../api";
import {IProduct, ProductListResponse, ProductCountResponse, ProductSearchResponse, AddProductRequest, AddProductResponse} from "./supplier.type";
// Define the response structure for listing products

// Get
// Function to get the list of products with pagination
async function getProductList(page: number = 1, limit: number = 10): Promise<ProductListResponse | null> {
    const url = `/product/list?page=${page}&limit=${limit}`;

    try {
        const response = await Api.get<ProductListResponse>(url);

        if (response.data && response.data.result === "success") {
            return response.data;
        } else if (response.data && response.data.result === "error") {
            console.error("Error:", response.data.message);
            return response.data;
        }
    } catch (error) {
        console.error("Failed to retrieve product list:", error);
    }

    return null;
}

// Function to get the count of all products
async function getProductCount(): Promise<ProductCountResponse | null> {
    const url = `/product/count`;

    try {
        const response = await Api.get<ProductCountResponse>(url);

        if (response.data && response.data.result === "success") {
            return response.data;
        } else if (response.data && response.data.result === "error") {
            console.error("Error:", response.data.message);
            return response.data;
        }
    } catch (error) {
        console.error("Failed to retrieve product count:", error);
    }

    return null;
}

// Function to search for products by name
async function searchProductByName(search: string): Promise<ProductSearchResponse | null> {
    const url = `/product/search/${encodeURIComponent(search)}`;

    try {
        const response = await Api.get<ProductSearchResponse>(url);

        if (response.data && response.data.result === "success") {
            return response.data;
        } else if (response.data && response.data.result === "error") {
            console.error("Error:", response.data.message);
            return response.data;
        }
    } catch (error) {
        console.error("Failed to search for products:", error);
    }

    return null;
}

// Post
// Function to add a new product
async function addProduct(productData: AddProductRequest): Promise<AddProductResponse | null> {
    const url = "/product/add";

    try {
        const response = await Api.post<AddProductResponse>(url, productData);

        if (response.data && response.data.result === "success") {
            return response.data;
        } else if (response.data && response.data.result === "error") {
            console.error("Error:", response.data.message);
            return response.data;
        }
    } catch (error) {
        console.error("Failed to add product:", error);
    }

    return null;
}

const supplierapi = {
    getProductList,
    getProductCount,
    searchProductByName,
    addProduct 
}
// Export the function and type for isolatedModules
export { supplierapi };
export type { 
    ProductListResponse, 
    ProductCountResponse, 
    ProductSearchResponse, 
    AddProductRequest, 
    AddProductResponse 
};
