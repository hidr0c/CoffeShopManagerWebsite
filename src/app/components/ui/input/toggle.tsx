'use client';

import React from 'react';
import styles from './toggle.module.scss';

interface ToggleProps {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
    return (
        <div className={styles.toggle_container}>
            <label className={styles.toggle_label}>
                {label}
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="toggle-input"
                />
                <span className="toggle-slider"></span>
            </label>
        </div>
    );
};
