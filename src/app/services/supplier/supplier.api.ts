import Api from "../api";
import { ISupplierResponse, ISupplier } from "./supplier.type";

// Define parameters and response types for supplier list
interface SupplierListParams {
  page: number;
  limit: number;
}

interface SupplierListResponse extends ISupplierResponse {
  suppliers: ISupplier[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
}

interface SupplierGetResponse extends ISupplierResponse {
  supplier: ISupplier;
}

interface DeleteSupplierResponse {
  result: string;
  supplier?: object;
  message?: string;
}

interface SupplierAllResponse extends ISupplierResponse {
  suppliers: ISupplier[];
}

// Function to get the paginated supplier list
export async function getSupplierList(
  params: SupplierListParams
): Promise<SupplierListResponse | null> {
  const url = `/supplier/list?page=${params.page}&limit=${params.limit}`;

  try {
    const response = await Api.get<SupplierListResponse>(url);

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch supplier list:", error);
  }

  return null;
}

// Function to get supplier details by ID
export async function getSupplierById(
  id: string
): Promise<SupplierGetResponse | null> {
  const url = `/supplier/get/${id}`;

  try {
    const response = await Api.get<SupplierGetResponse>(url);

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error(`Failed to fetch supplier by ID ${id}:`, error);
  }

  return null;
}

// Function to add a new supplier entry
export async function addSupplierEntry(
  params: ISupplier
): Promise<ISupplierResponse | null> {
  const url = `/supplier/add`;
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await Api.post<ISupplierResponse>(url, params, {
      headers: requestHeaders,
    });

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add supplier entry:", error);
  }

  return null;
}

// Function to update an existing supplier entry
export async function updateSupplierEntry(
  id: string,
  params: ISupplier
): Promise<ISupplierResponse | null> {
  const url = `/supplier/update/${id}`;
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await Api.put<ISupplierResponse>(url, params, {
      headers: requestHeaders,
    });

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to update supplier entry:", error);
  }

  return null;
}

// Function to delete a supplier entry by ID
export async function deleteSupplierEntry(
  id: string
): Promise<DeleteSupplierResponse | null> {
  const url = `/supplier/delete/${id}`;

  try {
    const response = await Api.delete<DeleteSupplierResponse>(url);

    if (response.data && response.data.result === "success") {
      return response.data;
    } else if (response.data && response.data.result === "error") {
      console.error("Error:", response.data.message);
      return response.data;
    }
  } catch (error) {
    console.error("Failed to delete supplier entry:", error);
  }

  return null;
}

// Function to get all suppliers
export async function getAllSuppliers(): Promise<SupplierAllResponse | null> {
  const url = `/supplier/all`;

  try {
    const response = await Api.get<SupplierAllResponse>(url);

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch all suppliers:", error);
  }

  return null;
}

// Export all functions as part of SupplierApi
const SupplierApi = {
  addSupplierEntry,
  updateSupplierEntry,
  deleteSupplierEntry,
  getSupplierList,
  getSupplierById,
  getAllSuppliers,
};

export default SupplierApi;
