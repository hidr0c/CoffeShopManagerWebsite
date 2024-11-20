'use client'

import Api from '@/services/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function logout() {
    const router = useRouter();

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                Api.post('/auth/revoke', { token })
                    .then(() => {
                        localStorage.removeItem('token');
                        router.push('/login');
                    })
                    .catch((error) => {
                        console.error('Failed to revoke token:', error);
                    });
            } else {
                localStorage.removeItem('token');
                router.push('/login');
            }
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    }, []);
}