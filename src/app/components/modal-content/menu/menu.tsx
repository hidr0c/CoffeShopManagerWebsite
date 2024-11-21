'use client';

import { Input, Select } from '@ui/input/input';
import { Toggle } from '@ui/input/toggle';

// Define the types for the props
interface MenuFormProps {
    formData: {
        name: string;
        type: string;
        price: number;
        isAvailable: boolean;
    };
    onChange: (key: string, value: string | number | boolean) => void;
}

export default function MenuForm({ formData, onChange }: MenuFormProps) {
    return (
        <div style={{ margin: '0 0 2em 0' }}>
            <Input
                label='Tên món'
                value={formData.name}
                onChange={(e) => onChange('name', e.target.value)}
            />
            <Select
                options={
                    [
                        { label: 'Coffee', value: 'Coffee' },
                        { label: 'Trà', value: 'Trà' },
                        { label: 'Bánh', value: 'Bánh' },
                        { label: 'Khác', value: 'Khác' },
                    ]
                }
                label="Loại"
                value={formData.type}
                onChange={(e) => onChange('type', e.target.value)}
            />
            <Input
                label='Giá'
                type="number"
                value={formData.price}
                onChange={(e) => onChange('price', parseFloat(e.target.value))}
            />
            <Toggle
                label='Có sẵn'
                checked={formData.isAvailable}
                onChange={(e) => onChange('isAvailable', e.target.checked)}
            />
        </div>
    );
}