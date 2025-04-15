import {
  inputWrapper,
  iconStyleVariants,
  inputStyleVariants,
} from './Input.css';
import { IcPwActive, IcPwDefault } from '@/icons/src/colored';

interface BaseInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'password';
  hasError?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
  size?: 'search' | 'club' | 'auth';
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
  width?: string;
}

const BaseInput = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  hasError,
  success,
  icon,
  size = 'auth',
  showPasswordToggle,
  isPasswordVisible,
  onTogglePassword,
  width,
}: BaseInputProps) => {
  const state: 'default' | 'error' | 'success' = hasError
    ? 'error'
    : success
      ? 'success'
      : 'default';

  return (
    <div className={inputWrapper({ state, size })} style={{ width }}>
      <input
        className={inputStyleVariants[size]}
        type={type === 'password' && !isPasswordVisible ? 'password' : 'text'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {showPasswordToggle && value && (
        <button className={iconStyleVariants[size]} onClick={onTogglePassword}>
          {isPasswordVisible ? (
            <IcPwActive width={24} height={24} />
          ) : (
            <IcPwDefault width={24} height={24} />
          )}
        </button>
      )}
      {icon && <span className={iconStyleVariants[size]}>{icon}</span>}
    </div>
  );
};

export default BaseInput;
