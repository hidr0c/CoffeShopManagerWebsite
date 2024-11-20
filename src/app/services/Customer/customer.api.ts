import Api from "../api";
import {ICustomer} from "../Customer"




// Phản hồi của API cho phương thức Delete
interface DeleteCustomerResponse {
    result: string; // "success" hoặc "error"
    customer?: ICustomer; // Thông tin khách hàng đã xóa (khi thành công)
    message?: string; // Thông báo lỗi (nếu có)
}

// Phản hồi của API cho phương thức Update
interface UpdateCustomerResponse {
    result: string; // "success" hoặc "error"
    customer?: ICustomer; // Thông tin khách hàng đã cập nhật (khi thành công)
    message?: string; // Thông báo lỗi (nếu có)
}

// Phản hồi của API cho phương thức Add
interface AddCustomerResponse {
    result: string; // "success" hoặc "error"
    message?: string; // Thông báo thêm mới (khi thành công hoặc thất bại)
    customer?: ICustomer; // Thông tin khách hàng đã thêm mới (khi thành công)
}

// 1. Hàm xóa khách hàng theo ID
async function deleteCustomer(customerId: string): Promise<DeleteCustomerResponse | null> {
    const url = `/customer/delete/${customerId}`;

    try {
        const response = await Api.delete<DeleteCustomerResponse>(url);

        if (response.data && response.data.result === "success") {
            return response.data;
        } else if (response.data && response.data.result === "error") {
            console.error("Error:", response.data.message);
            return response.data;
        }
    } catch (error) {
        console.error("Failed to delete customer:", error);
    }

    return null;
}

// 2. Hàm cập nhật thông tin khách hàng
async function updateCustomer(customerId: string, customerData: ICustomer): Promise<UpdateCustomerResponse | null> {
    const url = `/customer/update/${customerId}`;

    try {
        const response = await Api.put<UpdateCustomerResponse>(url, customerData);

        if (response.data && response.data.result === "success") {
            return response.data;
        } else if (response.data && response.data.result === "error") {
            console.error("Error:", response.data.message);
            return response.data;
        }
    } catch (error) {
        console.error("Failed to update customer:", error);
    }

    return null;
}

// 3. Hàm thêm mới khách hàng
async function addCustomer(customerData: ICustomer): Promise<AddCustomerResponse | null> {
    const url = `/customer/add`;

    try {
        const response = await Api.post<AddCustomerResponse>(url, customerData);

        if (response.data && response.data.result === "success") {
            return response.data;
        } else if (response.data && response.data.result === "error") {
            console.error("Error:", response.data.message);
            return response.data;
        }
    } catch (error) {
        console.error("Failed to add customer:", error);
    }

    return null;
}

// Export các hàm và kiểu dữ liệu
const CustomerAPI = {
    deleteCustomer,
    updateCustomer,
    addCustomer,
};

export default CustomerAPI;
export type { ICustomer, DeleteCustomerResponse, UpdateCustomerResponse, AddCustomerResponse };
