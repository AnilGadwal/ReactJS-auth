import React from "react";
import "./inputField.css";
import PasswordValidation from "../PasswordValidation";
import {
  checkLength,
  hasAlphabetCharacter,
  hasNumber,
  hasSpecialCharacter,
} from "../../../utils";

interface InputFieldProps {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  page?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  page,
}) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      {page === "registration" && id === "password" && value ? (
        <PasswordValidation
          minimumChar={checkLength(value, 8)}
          letter={hasAlphabetCharacter(value)}
          number={hasNumber(value)}
          specialChar={hasSpecialCharacter(value)}
        />
      ) : null}
    </div>
  );
};

export default InputField;
