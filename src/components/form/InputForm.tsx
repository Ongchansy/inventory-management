import React from 'react'
import { Input } from '../ui/input';

type Props = {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string | number;
    name?: string;
    register?: any
    errors?: string | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    error?: string;
    defaultValue?: string;
}

const InputForm = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    className,
    error,
    defaultValue,
    register,
    name
}: Props) => {
  return (
    <div className={`input-form ${className || ''}`}>
      <label htmlFor={label}>{label}</label>
      <Input
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        {...register(name)}
        name={name}
        error={error}
        className={`input-form-input ${className || ''}`}
      />
      {error && <p className="input-form-error">{error}</p>}
    </div>
  )
}

export default InputForm