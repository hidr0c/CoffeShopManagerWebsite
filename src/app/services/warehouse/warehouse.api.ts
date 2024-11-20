import Api from "../api";
import {
  IWarehouseRespone,
  IWarehouseItem,
  IWarehouse,
} from "./warehouse.type";

// Define parameters and response types for warehouse list
interface WarehouseListParams {
  page: number;
  limit: number;
}

interface WarehouseListResponse extends IWarehouseRespone {
  imports: IWarehouse[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
}

interface WarehouseGetResponse extends IWarehouseRespone {
  importItem: IWarehouse;
}

interface DeleteWarehouseResponse {
  result: string;
  importItem?: object;
  message?: string;
}

// Function to get the paginated warehouse list
export async function getWarehouseList(
  params: WarehouseListParams
): Promise<WarehouseListResponse | null> {
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

// Function to get warehouse details by ID
export async function getWarehouseById(
  id: string
): Promise<WarehouseGetResponse | null> {
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

// Function to add a new warehouse entry
export async function addWarehouseEntry(
  params: IWarehouse
): Promise<IWarehouseRespone | null> {
  const url = `/warehouse/add`;
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await Api.post<IWarehouseRespone>(url, params, {
      headers: requestHeaders,
    });

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add warehouse entry:", error);
  }

  return null;
}

// Function to update an existing warehouse entry
export async function updateWarehouseEntry(
  id: string,
  params: IWarehouse
): Promise<IWarehouseRespone | null> {
  const url = `/warehouse/update/${id}`;
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await Api.put<IWarehouseRespone>(url, params, {
      headers: requestHeaders,
    });

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to update warehouse entry:", error);
  }

  return null;
}

// Function to delete a warehouse entry by ID
export async function deleteWarehouseEntry(
  id: string
): Promise<DeleteWarehouseResponse | null> {
  const url = `/warehouse/delete/${id}`;

  try {
    const response = await Api.delete<DeleteWarehouseResponse>(url);

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

// Export all functions as part of WarehouseApi
const WarehouseApi = {
  addWarehouseEntry,
  updateWarehouseEntry,
  deleteWarehouseEntry,
  getWarehouseList,
  getWarehouseById,
};

export default WarehouseApi;
