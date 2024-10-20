'use client'

import Image from "next/image";
import styles from "../login/page.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "antd"
import AuthApi from "../../services/auth";
import { SignupParams } from "../../models/AuthModel";

export default function SignupPage() {
    const router = useRouter()

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data: SignupParams) => {
        if (data.password !== data.confirmPassword) {
            alert('Mật khẩu không giống nhau');
            return
        }

        if (!data.confirmTOS) {
            alert("Bạn chưa đồng ý với điều khoản");
            return
        }

        AuthApi.signUp(data)
            .then(res => {
                if (res.status == 200) {
                    router.push("/profile/")
                } else {
                    alert(res.message)
                }
            })
    }
    return (
        <div className={styles.loginWrapper}>
            <form onSubmit={handleSubmit(onSubmit)} id={styles.loginForm}>
                <label htmlFor="name">
                    Tên
                    <Input
                        {...register("name", { required: true })}
                        type="name"
                        placeholder="Nhập tên"
                        className={styles.inputField} />
                </label>

                <label htmlFor="email">
                    Email
                    <Input
                        {...register("email")}
                        type="email"
                        placeholder="Nhập email"
                        className={styles.inputField} />
                </label>

                <label htmlFor="password">
                    Mật khẩu
                    <Input
                        {...register("password", { required: true })}
                        type="password"
                        minLength={8}
                        placeholder="Nhập mật khẩu"
                        className={styles.inputField} />
                </label>

                <label htmlFor="confirmPassword">
                    Nhập lại mật mã
                    <Input
                        {...register("confirmPassword", { required: true })}
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        className={styles.inputField} />
                </label>

                <label
                    className={styles.rememberWrapper}
                    htmlFor="confirmTOS">Tôi đồng ý với các điều khoản và chính sách
                    <input
                        {...register("confirmTOS")}
                        type="checkbox" />
                </label>

                <button type="submit" className={styles.loginButton}>Đăng ký</button>
            </form>

            <div className={styles.signupWrapper}>
                <p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
            </div>
        </div>
    );
}
