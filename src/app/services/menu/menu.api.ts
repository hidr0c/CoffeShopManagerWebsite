import Api from "../api";
import {
  IMenuItem,
  MenuListResponse,
  MenuGetResponse,
  IMenuResponse,
  DeleteMenuResponse,
  MenuAllResponse,
} from "./menu.type";

// Function to get the paginated menu list
export async function getMenuList(params: {
  page: number;
  limit: number;
}): Promise<MenuListResponse | null> {
  const url = `/menu/list?page=${params.page}&limit=${params.limit}`;

  try {
    const response = await Api.get<MenuListResponse>(url);

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch menu list:", error);
  }

  return null;
}

// Function to get menu item details by ID
export async function getMenuItemById(
  id: string
): Promise<MenuGetResponse | null> {
  const url = `/menu/get/${id}`;

  try {
    const response = await Api.get<MenuGetResponse>(url);

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error(`Failed to fetch menu item by ID ${id}:`, error);
  }

  return null;
}

// Function to add a new menu item
export async function addMenuItem(
  params: IMenuItem
): Promise<IMenuResponse | null> {
  const url = `/menu/add`;
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await Api.post<IMenuResponse>(url, params, {
      headers: requestHeaders,
    });

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add menu item:", error);
  }

  return null;
}

// Function to update an existing menu item
export async function updateMenuItem(
  id: string,
  params: IMenuItem
): Promise<IMenuResponse | null> {
  const url = `/menu/update/${id}`;
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await Api.put<IMenuResponse>(url, params, {
      headers: requestHeaders,
    });

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to update menu item:", error);
  }

  return null;
}

// Function to delete a menu item by ID
export async function deleteMenuItem(
  id: string
): Promise<DeleteMenuResponse | null> {
  const url = `/menu/delete/${id}`;

  try {
    const response = await Api.delete<DeleteMenuResponse>(url);

    if (response.data && response.data.result === "success") {
      return response.data;
    } else if (response.data && response.data.result === "error") {
      console.error("Error:", response.data.message);
      return response.data;
    }
  } catch (error) {
    console.error("Failed to delete menu item:", error);
  }

  return null;
}

// Function to get all menu items
export async function getAllMenuItems(): Promise<MenuAllResponse | null> {
  const url = `/menu/all`;

  try {
    const response = await Api.get<MenuAllResponse>(url);

    if (response.data && response.data.result === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch all menu items:", error);
  }

  return null;
}

// Export all functions as part of MenuApi
const MenuApi = {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuList,
  getMenuItemById,
  getAllMenuItems,
};

export default MenuApi;
