import Api from "../api";
import {ISellItem, ISell, SellListResponse} from "./sell.type";

interface SellListParams {
    page: number;
    limit: number;
}

interface SellItem {
    _id: string;
    customerName: string;
    phoneNumber: string;
    sellDate: string;
    values: {
        name: string;
        price: number;
        quant: number;
        unit: string;
    }[];
}

interface AddSellItemResponse {
    result: string;
    message: string;
}

interface DeleteSellItemResponse {
    result: string;
    message: string;
}

// Get
// Function to get the paginated sell list
async function getSellList(params: SellListParams): Promise<SellListResponse | null> {
    const url = `/sell/list?page=${params.page}&limit=${params.limit}`;

    try {
        const response = await Api.get<SellListResponse>(url);

        if (response.data && response.data.result === "success") {
            return response.data;
        } else if (response.data && response.data.result === "error") {
            console.error("Error:", response.data.message);
            return response.data;
        }
    } catch (error) {
        console.error("Failed to fetch sell list:", error);
    }

    return null;
}

// Post
// Function to add a new sell item
async function addSellItem(sellItem: SellItem): Promise<AddSellItemResponse | null> {
    const url = "/sell/add";

    try {
        const response = await Api.post<AddSellItemResponse>(url, sellItem);

        if (response.data && response.data.result === "success") {
            return response.data;
        } else if (response.data && response.data.result === "error") {
            console.error("Error:", response.data.message);
            return response.data;
        }
    } catch (error) {
        console.error("Failed to add sell item:", error);
    }

    return null;
}

// Delete
// Function to delete a sell item by ID
async function deleteSellItem(sellId: string): Promise<DeleteSellItemResponse | null> {
    const url = `/sell/delete/${sellId}`;

    try {
        const response = await Api.delete<DeleteSellItemResponse>(url);

        if (response.data && response.data.result === "success") {
            return response.data;
        } else if (response.data && response.data.result === "error") {
            console.error("Error:", response.data.message);
            return response.data;
        }
    } catch (error) {
        console.error("Failed to delete sell item:", error);
    }

    return null;
}          // Phần này chắc bỏ vì hoá đơn làm sao mà xoá :^)
const SellAPI = {
    getSellList,
    addSellItem,
    deleteSellItem 
}
// Export the function and types correctly for isolatedModules
export { SellAPI };
export type { SellListParams, SellListResponse, SellItem, AddSellItemResponse, DeleteSellItemResponse};