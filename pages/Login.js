import React from 'react';
import Image from 'next/image';
import styles from '../styles/Login.module.css';

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      {/* Phần bên trái chứa form */}
      <div className={styles.loginBox}>
        <h1>Phan café</h1>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Nhập email" className={styles.inputField} />
          
          <label>Password</label>
          <input type="password" placeholder="Mật khẩu" className={styles.inputField} />
          
          <div className={styles.options}>
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Nhớ tôi 30 ngày</label>
            </div>
            <a href="/forgot-password">Quên mật khẩu</a>
          </div>

          <button type="submit" className={styles.loginButton}>Đăng nhập</button>
        </form>

        <div className={styles.signup}>
          <p>Chưa có tài khoản? <a href="/signup">Sign Up</a></p>
        </div>
      </div>

      {/* Phần bên phải chứa hình ảnh */}
      <div className={styles.imageContainer}>
        <Image 
          src="/coffee.jpg" 
          alt="Coffee cup" 
          layout="fill" 
          objectFit="cover" 
        />
      </div>
    </div>
  );
}
