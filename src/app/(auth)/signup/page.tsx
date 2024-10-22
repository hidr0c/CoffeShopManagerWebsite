'use client'

import Image from "next/image";
import styles from "../login/page.module.css";
import { useFormik } from 'formik';
import { useRouter } from "next/navigation";
import { Input, message } from "antd"
import AuthApi from "../../services/auth";
import { SignupParams } from "../../models/AuthModel";

export default function SignupPage() {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            confirmTOS: false,
        },
        onSubmit: values => {
            onSubmit(values);
        },
    });

    const onSubmit = async (data: SignupParams) => {
        console.log(data);
        if (data.password !== data.confirmPassword) {
            message.error('Mật khẩu không giống nhau');
            return;
        }

        if (!data.confirmTOS) {
            message.error('Vui lòng đồng ý với điều khoản TOS');
            return;
        }

        AuthApi.signUp(data)
            .then(res => {
                if (!res) return;

                if (res.result === "success") {
                    message.success("Đăng ký thành công. Chuyển sang trang đăng nhập trong vài giây...");
                    setTimeout(() => {
                        router.push("/login/")
                    }, 2000)
                } else {
                    message.error(res.message)
                }
            })
            .catch(error => {
                message.error("Đăng ký thất bại");
                if (process.env.DEBUG) {
                    console.log(error);
                }
            })
    }

    return (
        <div className={styles.registerWrapper}>
            <form onSubmit={formik.handleSubmit} id={styles.registerForm}>
                <label htmlFor="name">
                    Tên
                    <Input
                        required
                        name="name"
                        placeholder="Nhập tên"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className={styles.inputField} />
                </label>

                <label htmlFor="email">
                    Email
                    <Input
                        required
                        name="email"
                        type="email"
                        placeholder="Nhập email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className={styles.inputField} />
                </label>

                <label htmlFor="password">
                    Mật khẩu
                    <Input.Password
                        required
                        name="password"
                        minLength={8}
                        placeholder="Nhập mật khẩu"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className={styles.inputField} />
                </label>

                <label htmlFor="confirmPassword">
                    Nhập lại mật mã
                    <Input.Password
                        required
                        name="confirmPassword"
                        minLength={8}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        placeholder="Nhập lại mật khẩu"
                        className={styles.inputField} />
                </label>

                <label
                    className={styles.rememberWrapper}
                    htmlFor="confirmTOS">Tôi đồng ý với các điều khoản và chính sách
                    <input
                        name="confirmTOS"
                        onChange={formik.handleChange}
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
