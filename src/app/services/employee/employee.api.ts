import Api from "../api";
import { IEmployee, ICheckin } from "./employee.type";

// Define parameters and response types for employee list
interface EmployeeListParams {
  page: number;
  limit: number;
}

interface EmployeeListResponse extends IEmployeeResponse {
  employees: IEmployee[];
}

interface EmployeeGetResponse extends IEmployeeResponse {
  employee: IEmployee;
}

interface DeleteEmployeeResponse {
  result: string;
  message?: string;
}

interface IEmployeeResponse {
    result: string;
    message?: string;
  }

// Interface for the count response
interface EmployeeCountResponse {
    result: string;
    count?: number;
    message?: string;
  }

  interface EmployeeSearchParams {
    query: string; // Search query string
  }
  
  interface EmployeeSearchResponse {
    result: string;
    employees?: string[]; // Array of matching employee IDs or strings
    message?: string; // Error or success message
    error?: {
      message: string; // Detailed error message
    };
  }
  interface UpdateEmployeeStatusParams {
    id: string; // Employee ID
    isActive: boolean; // New status of the employee
  }
  
  interface UpdateEmployeeStatusResponse {
    result: string; // "success" or "error"
    message: string; // Success or error message
  }

  interface UpdateEmployeeStatusParams {
    id: string; // Employee ID
    isActive: boolean; // New status of the employee
  }
  
  interface UpdateEmployeeStatusResponse {
    result: string; // "success" or "error"
    message: string; // Success or error message
  }
  
  interface VerifyEmployeeParams {
    id: string; // Employee ID
  }
  
  interface VerifyEmployeeResponse {
    result: string; // "success" or "error"
    message: string; // Success or error message
    employee?: object; // Optional: Employee data if provided in response
  }
  
  
// GET
// Function to get the paginated employee list
export async function getEmployeeList(params: EmployeeListParams): Promise<EmployeeListResponse | null> {
  const url = `/employee/list?page=${params.page}&limit=${params.limit}`;

  try {
    const response = await Api.get<EmployeeListResponse>(url);

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch employee list:", error);
  }

  return null;
}

// Function to get employee details by ID
async function getEmployeeById(id: string): Promise<EmployeeGetResponse | null> {
  const url = `/employee/get/${id}`;

  try {
    const response = await Api.get<EmployeeGetResponse>(url);

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error(`Failed to fetch employee by ID ${id}:`, error);
  }

  return null;
}

// Function to search employees by query
async function searchEmployees(params: EmployeeSearchParams): Promise<EmployeeSearchResponse | null> {
    const url = `/employee/search`; // Adjust endpoint if necessary
    const requestConfig = {
      params: {
        query: params.query,
      },
    };
  
    try {
      const response = await Api.get<EmployeeSearchResponse>(url, requestConfig);
  
      if (response.data && response.data.result === "success") {
        return response.data;
      } else if (response.data && response.data.result === "error") {
        console.error("Error searching employees:", response.data.message);
        return response.data; // Optionally return error information
      }
    } catch (error) {
      console.error("Failed to search employees:", error);
    }
  
    return null;
  }
  
  // Function to get the total count of employees
  async function getEmployeeCount(): Promise<EmployeeCountResponse | null> {
    const url = `/employee/count`;
  
    try {
      const response = await Api.get<EmployeeCountResponse>(url);
  
      if (response.data && response.data.result === "success") {
        return response.data;
      } else if (response.data && response.data.result === "error") {
        console.error("Error fetching employee count:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch employee count:", error);
    }
  
    return null;
  }

// POST
// Function to add a new employee
async function addEmployee(params: IEmployee): Promise<IEmployeeResponse | null> {
  const url = `/employee/add`;
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await Api.post<IEmployeeResponse>(url, params, { headers: requestHeaders });

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add employee:", error);
  }

  return null;
}

// PUT
// Function to update an employee by ID
async function updateEmployee(id: string, params: IEmployee): Promise<IEmployeeResponse | null> {
  const url = `/employee/update/${id}`;
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await Api.put<IEmployeeResponse>(url, params, { headers: requestHeaders });

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to update employee:", error);
  }

  return null;
}

// DELETE
// Function to delete an employee by ID
async function deleteEmployee(id: string): Promise<DeleteEmployeeResponse | null> {
  const url = `/employee/delete/${id}`;

  try {
    const response = await Api.delete<DeleteEmployeeResponse>(url);

    if (response.data && response.data.result === "success") {
      return response.data;
    } else if (response.data && response.data.result === "error") {
      console.error("Error:", response.data.message);
      return response.data;
    }
  } catch (error) {
    console.error("Failed to delete employee:", error);
  }

  return null;
}

// Function to update employee status
async function updateEmployeeStatus(params: UpdateEmployeeStatusParams): Promise<UpdateEmployeeStatusResponse | null> {
    const url = `/employee/update-status`; // Adjust endpoint if necessary
    const requestHeaders = {
      "Content-Type": "application/json",
    };
  
    try {
      const response = await Api.put<UpdateEmployeeStatusResponse>(url, params, { headers: requestHeaders });
  
      if (response.data && response.data.result === "success") {
        return response.data;
      } else if (response.data && response.data.result === "error") {
        console.error("Error updating employee status:", response.data.message);
        return response.data; // Optionally return error information
      }
    } catch (error) {
      console.error("Failed to update employee status:", error);
    }
  
    return null;
  }

  // Function to verify an employee
async function verifyEmployee(params: VerifyEmployeeParams): Promise<VerifyEmployeeResponse | null> {
    const url = `/employee/verify`; // Adjust endpoint if necessary
    const requestHeaders = {
      "Content-Type": "application/json",
    };
  
    try {
      const response = await Api.post<VerifyEmployeeResponse>(url, params, { headers: requestHeaders });
  
      if (response.data && response.data.result === "success") {
        return response.data;
      } else if (response.data && response.data.result === "error") {
        console.error("Error verifying employee:", response.data.message);
        return response.data; // Optionally return error information
      }
    } catch (error) {
      console.error("Failed to verify employee:", error);
    }
  
    return null;
  }
  


// Export all functions as EmployeeApi
const EmployeeApi = {
  getEmployeeList,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeCount,
  searchEmployees,
  updateEmployeeStatus,
  verifyEmployee
};

// Export the functions and types
export default EmployeeApi;
export type {
  EmployeeListParams,
  EmployeeListResponse,
  EmployeeGetResponse,
  DeleteEmployeeResponse,
  EmployeeCountResponse,
  EmployeeSearchParams,
  EmployeeSearchResponse,
  UpdateEmployeeStatusParams,
  UpdateEmployeeStatusResponse,
  VerifyEmployeeParams,
  VerifyEmployeeResponse 
};
