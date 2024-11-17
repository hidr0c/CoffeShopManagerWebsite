
import React from 'react';

interface RadioGroupProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, value, options, onChange }) => {
  return (
    <div className="radio-group" style={{display: 'flex'}}>
      <label style={{minWidth:'100px'}}>{label}</label>
      <div className="radio-options" style={{ display: 'flex', gap: '1em' }}>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name="radio-group"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />
            <span style={{display:'inline-block', marginLeft:'0.5em'}}>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
