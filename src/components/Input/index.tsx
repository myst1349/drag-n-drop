import React, {useState} from 'react';
import classNames from 'classnames';
import noop from '../../helpers/noop';

import styles from './input.module.css';

interface IInputTextProps {
  name: string;
  label: string;
  htmlType?: 'text' | 'number' | 'color' | 'hidden';
  value?: string;
  placeholder?: string;
  className?: string;
  onChangeCb?: (name: string, value: string) => void;
}

const Input: React.FC<IInputTextProps> = (props) => {
  const {name, label, htmlType = 'text', className = '', value = '', placeholder = '', onChangeCb = noop} = props;
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setInputValue(value);
    onChangeCb && onChangeCb(name, value);
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={htmlType}
        id={name}
        name={name}
        className={styles.input}
        onChange={handleChange}
        value={inputValue}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
