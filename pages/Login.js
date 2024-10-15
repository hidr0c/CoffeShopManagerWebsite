// pages/Login.js

import React from 'react';

const Login = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <label>Email</label>
                <input type="email" placeholder="Nhập email" />
                
                <label>Password</label>
                <input type="password" placeholder="Mật khẩu" />
                
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login;
