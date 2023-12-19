import React from "react";
import "./passwordValidation.m.css";
import ErrorMessage from "../ErrorMessage";

interface PasswordValidationProps {
  minimumChar: boolean;
  letter: boolean;
  number: boolean;
  specialChar: boolean;
}

const PasswordValidation: React.FC<PasswordValidationProps> = (props) => {
  const { minimumChar, letter, number, specialChar } = props;

  const tickmark = <span> &#x2713;</span>;

  const getColor = (value: boolean) => {
    const color = value ? "green" : "red";
    return color;
  };

  return (
    <div className="password-validation">
      <div>
        <ErrorMessage
          text="Password should be 8 characters minimum"
          color={getColor(minimumChar)}
        />
        {minimumChar ? tickmark : null}
      </div>
      <div>
        <ErrorMessage
          text="Password should contains at least 1 letter"
          color={getColor(letter)}
        />
        {letter ? tickmark : null}
      </div>
      <div>
        <ErrorMessage
          text="Password should contains at least 1 Number"
          color={getColor(number)}
        />
        {number ? tickmark : null}
      </div>
      <div>
        <ErrorMessage
          text="Password should contains at least 1 Special character"
          color={getColor(specialChar)}
        />
        {specialChar ? tickmark : null}
      </div>
    </div>
  );
};

export default PasswordValidation;
