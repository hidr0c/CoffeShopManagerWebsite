// pages/index.js
import Link from 'next/link';
export default function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontSize: '36px', color: '#4b3d29' }}>Welcome to Phan Café</h1>
            <p style={{ fontSize: '18px', color: '#6d4c41' }}>Your cozy corner for coffee and conversation.</p>
            <Link href="/Login">Go to Login</Link>
        </div>
    );
}
