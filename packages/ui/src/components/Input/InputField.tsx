import BaseInput from './BaseInput';

interface InputFieldProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  size?: 'search' | 'club' | 'auth';
  width?: string;
}

const InputField = ({
  placeholder,
  value,
  onChange,
  icon,
  size = 'search',
  width,
}: InputFieldProps) => {
  return (
    <BaseInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      icon={icon}
      size={size}
      width={width}
    />
  );
};

export default InputField;
