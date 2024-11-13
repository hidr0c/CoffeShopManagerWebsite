import Api from "../api";
import { IWarehouseRespone, IWarehouseItem, IWarehouse  } from "./warehouse.type";

// Define parameters and response types for warehouse list
interface WarehouseListParams {
    page: number;
    limit: number;
}

interface WarehouseListResponse extends IWarehouseRespone {
    exports: IWarehouseItem[];
}
// Hơi BS nên không rõ lắm :^)
interface WarehouseGetResponse extends IWarehouseRespone {
    exportItem: IWarehouse; 
}

interface DeleteWarehouseResponse {
    result: string;
    exportItem?: object;
    message?: string;
}

// Get
// Function to get the paginated warehouse list
async function getWarehouseList(params: WarehouseListParams): Promise<WarehouseListResponse | null> {
    const url = `/warehouse/list?page=${params.page}&limit=${params.limit}`; // Phần này chưa rõ lắm

    try {
        const response = await Api.get<WarehouseListResponse>(url);

        if (response.data && response.data.result === "success") {
            return response.data;
        }
    } catch (error) {
        console.error("Failed to fetch warehouse list:", error);
    }

    return null;
}

// Function to get warehouse details by ID
async function getWarehouseById(id: string): Promise<WarehouseGetResponse | null> {
    const url = `/warehouse/get/${id}`;

    try {
        const response = await Api.get<WarehouseGetResponse>(url);

        if (response.data && response.data.result === "success") {
            return response.data;
        }
    } catch (error) {
        console.error(`Failed to fetch warehouse by ID ${id}:`, error);
    }

    return null;
}

// Post
async function addWarehouseEntry(params: IWarehouse): Promise<IWarehouseRespone | null> {
    const url = `/warehouse/add`; // Chưa có trang thêm sản phẩm
    const requestHeaders = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await Api.post<IWarehouseRespone>(url, params, { headers: requestHeaders });
        
        if (response.data && response.data.result === "success") {
            return response.data;
        }
    } catch (error) {
        console.error("Failed to add warehouse entry:", error);
    }

    return null;
}


// Put
async function updateWarehouseEntry(id: string, params: IWarehouse): Promise<IWarehouseRespone| null> {
    const url = `/warehouse/update/${id}`; // Chưa có sửa sản phẩm also
    const requestHeaders = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await Api.put<IWarehouseRespone>(url, params, { headers: requestHeaders });
        
        if (response.data && response.data.result === "success") {
            return response.data;
        }
    } catch (error) {
        console.error("Failed to update warehouse entry:", error);
    }

    return null;
}

// Delete
// Function to delete a warehouse entry by ID
async function deleteWarehouseEntry(id: string): Promise<DeleteWarehouseResponse | null> {
    const url = `/warehouse/delete/${id}`;
    
    try {
        const response = await Api.delete<DeleteWarehouseResponse>(url);
        
        // Check if the response indicates success
        if (response.data && response.data.result === "success") {
            return response.data;
        } else if (response.data && response.data.result === "error") {
            console.error("Error:", response.data.message);
            return response.data;
        }
    } catch (error) {
        console.error("Failed to delete warehouse entry:", error);
    }

    return null;
}


const WarehouseApi = {
    addWarehouseEntry,
    updateWarehouseEntry,
    deleteWarehouseEntry 
}

// Export the function
export default WarehouseApi;
export { getWarehouseList };
export type { WarehouseListParams, WarehouseListResponse, WarehouseGetResponse, DeleteWarehouseResponse};
