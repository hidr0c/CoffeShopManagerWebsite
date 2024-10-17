import Image from "next/image";
import styles from "./page.module.css";

export default function LoginPage() {
    return (
        <div className={styles.loginWrapper}>
            <form id={styles.loginForm}>
                <label>Email</label>
                <input type="email" placeholder="Nhập email" className={styles.inputField} />

                <div className={styles.passwordTitleWrapper}>
                    <label>Password</label>
                    <a href="/forgot-password">Quên mật khẩu</a>
                </div>
                <input type="password" placeholder="Mật khẩu" className={styles.inputField} />

                <div className={styles.rememberWrapper}>
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe">Nhớ tôi 30 ngày</label>
                </div>

                <button type="submit" className={styles.loginButton}>Đăng nhập</button>
            </form>

            <div className={styles.signupWrapper}>
                <p>Chưa có tài khoản? <a href="/signup">Sign Up</a></p>
            </div>
        </div>
    );
}
