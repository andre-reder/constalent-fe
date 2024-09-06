import { ChangeEvent, useState } from 'react';
import eyeSlash from '../../assets/images/icons/eye-slash.svg';
import eye from '../../assets/images/icons/eye.svg';
import Input from '../Input';
import { Container } from './styles';

export interface FormGroupInterface {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  isLoading?: boolean;
  aside?: boolean;
  padding?: number;
  disabled?: boolean;
}

export default function PasswordInputFormGroup({
  label, error, aside, padding, value, onChange, disabled,
}: FormGroupInterface) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Container aside={aside} padding={padding}>
      <div className="form-item">
        <label htmlFor="senha">{label}</label>
        <Input
          maxLength={15}
          error={error ?? undefined}
          placeholder="********"
          value={value}
          onChange={onChange}
          type={isVisible ? 'text' : 'password'}
          autoComplete="new-password"
          disabled={disabled}
        />

        <div className="password">
          {isVisible ? (
            <img className='primaryColor' src={eye} alt="eye" onClick={() => setIsVisible(false)} />
          ) : (<img className='primaryColor' src={eyeSlash} alt="eye" onClick={() => setIsVisible(true)} />)}
        </div>
      </div>
      { error && <small>{error}</small> }
    </Container>
  );
}
