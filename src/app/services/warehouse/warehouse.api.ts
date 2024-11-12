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


// Function to get the paginated warehouse list
async function getWarehouseList(params: WarehouseListParams): Promise<WarehouseListResponse | null> {
    const url = `/warehouse/list?page=${params.page}&limit=${params.limit}`;

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

// Export the function and types correctly for isolatedModules
export { getWarehouseList };
export type { WarehouseListParams, WarehouseListResponse };

async function addWarehouseEntry(params: IWarehouse): Promise<IWarehouseRespone | null> {
    const url = `/warehouse/add`;
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

const WarehouseApi = {
    addWarehouseEntry
}

// Export the function
export default WarehouseApi;