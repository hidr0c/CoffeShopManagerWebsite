'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "antd"
import AuthApi from "../../services/auth";
import { LoginParams } from "../../models/AuthModel";

export default function LoginPage() {
    const router = useRouter()
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: LoginParams) => {
        try {
            const res = await AuthApi.login(data);
            if (res.result === "success") {
                router.push("/profile/");
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.loginWrapper}>
            <form onSubmit={handleSubmit(onSubmit)} id={styles.loginForm}>
                <label>
                    Email
                </label>
                <Input
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    className={styles.inputField} />

                <div className={styles.passwordTitleWrapper}>
                    <label>Password</label>
                    <a href="/forgot-password">Quên mật khẩu</a>
                </div>
                <Input
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                    className={styles.inputField} />

                <div className={styles.rememberWrapper}>
                    <Input
                        name="rememberMe"
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
