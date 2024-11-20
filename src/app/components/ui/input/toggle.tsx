'use client';

import React from 'react';
import './toggle.scss';

interface ToggleProps {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
    return (
        <div className="toggle-container" style={{ margin: '1em 0' }}>
            <label className="toggle-label">
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
