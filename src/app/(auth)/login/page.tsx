'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import { Input, Checkbox, message } from "antd"
import AuthApi from "../../services/auth";
import { LoginParams } from "../../models/AuthModel";

export default function LoginPage() {
    const router = useRouter();

    const onSubmit = async (data: LoginParams) => {
        console.log(data);
        try {
            const res = await AuthApi.login(data);
            if (res.result === "success") {
                router.push("/profile/");
            } else {
                message.error(res.message);
            }
        } catch (error) {
            message.error("Đăng nhập thất bại");
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            onSubmit(values);
        },
    });

    return (
        <div className={styles.loginWrapper}>
            <form onSubmit={formik.handleSubmit} id={styles.loginForm}>
                <label>
                    Email
                </label>
                <Input
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className={styles.inputField} />

                <div className={styles.passwordTitleWrapper}>
                    <label>Password</label>
                    <a href="/forgot-password">Quên mật khẩu</a>
                </div>
                <Input.Password
                    name="password"
                    placeholder="Mật khẩu"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className={styles.inputField} />

                <div className={styles.rememberWrapper}>
                    <Input
                        name="rememberMe"
                        onChange={formik.handleChange}
                        type="checkbox"
                        id="rememberMe" />
                    <label htmlFor="rememberMe">Nhớ tôi 30 ngày</label>
                </div>

                <button type="submit" className={styles.loginButton}>Đăng nhập</button>
            </form>

            <div className={styles.signupWrapper}>
                <p>Chưa có tài khoản? <a href="/signup">Đăng ký</a></p>
            </div>
        </div>
    );
}
