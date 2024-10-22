import Api from "../api";
import {
    LoginParams,
    LoginResponse,
    SignupParams,
    SignupResponse,
    UpdateUserParams,
    UpdateUserPasswordParams
} from "../../models/AuthModel";


async function login(params: LoginParams): Promise<LoginResponse | null> {
    localStorage.removeItem("user");
    const url = `/auth/login`;
    const response = await Api.post<LoginResponse>(url, params);

    if (response.data) {
        const { token } = response.data.data;
        if (token) {
            localStorage.setItem("token", token);
            await getMe();
        }
        return response.data;
    }

    return null;
}

async function signUp(params: SignupParams): Promise<SignupResponse | null> {
    const url = `/auth/register`;
    const response = await Api.post<SignupResponse>(url, params);

    if (response.data) {
        return response.data;
    }

    return null;
}

async function verifyLogin(): Promise<boolean> {
    const url = `/auth/me`;

    try {
        const response = await Api.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response.data.result === "success") {
            return true;
        }
    } catch (error) {
        console.error(error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return false;
};

async function getMe(): Promise<any | null> {
    const url = `/auth/me`;

    try {
        const response = await Api.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response.data.result === 'success') {
            localStorage.setItem("user", JSON.stringify(response.data.data));
            return response.data;
        }
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }

    return null;
};

async function updateUser(params: UpdateUserParams): Promise<any | null> {
    const requestUrl = `/auth/update`;
    const requestHeaders = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
    };

    try {
        const response = await Api.post(requestUrl, params, { headers: requestHeaders });

        if (response.data.result === "success") {
            return response.data;
        }
    } catch (error) {
        console.error("Failed to update user:", error);
    }

    return null;
}

async function changePassword(params: UpdateUserPasswordParams) {
    const url = `/auth/change-password`;
    const requestHeaders = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
        const response = await Api.post(url, params, { headers: requestHeaders });

        if (response.data.result === "success") {
            return response.data;
        }
    } catch (error) {
        console.error("Failed to change password:", error);
    }

    return null;
}

const AuthApi = {
    login,
    signUp,
    getMe,
    updateUser,
    verifyLogin,
    changePassword,
}

export default AuthApi;