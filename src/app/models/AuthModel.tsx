interface SignupParams {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    confirmTOS: boolean;
}

interface SignupResponse {
    result: string;
    message: string;
}

interface LoginParams {
    email: string;
    password: string;
}

interface LoginResponse {
    result: string;
    message: string;
    data?: {
        token: string;
    };
}

interface UpdateUserParams {
    avatar: string;
    fullName: string;
    email: string;
}

interface UpdateUserPasswordParams {
    oldPassword: string;
    newPassword: string;
}

export type {
    SignupParams,
    SignupResponse,
    LoginParams,
    LoginResponse,
    UpdateUserParams,
    UpdateUserPasswordParams
}