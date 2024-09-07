import React, { useState, useEffect } from "react";
import CircularMenu from "./circularMenu/CircularMenu";
import { autoCurrency } from "../../helpers/CurrencyFormatter";

interface EditableInputProps {
  label?: string;
  initialValue: string | number;
  onChange?: (value: string) => void;
  className?: string;
  isCurrency?: boolean;
  isDisabled?: boolean;
  options?: any;
  disabled?: boolean;
}

const EditableInput: React.FC<EditableInputProps> = ({
  label,
  initialValue = "",
  options,
  onChange,
  className,
  isCurrency = false,
  disabled,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let newValue = event.target.value.replace(/[^\d]/g, "");

    if (isCurrency) {
      newValue = autoCurrency(newValue);
    }

    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="block text-base font-medium">{label}</label>}
      <div className="flex items-center gap-2">
        <input
          type="text"
          className={`w-full bg-transparent p-2 ${
            disabled ? "border-opacity-0" : "border-2"
          }`}
          style={{
            pointerEvents: disabled ? "none" : "auto",
          }}
          value={value}
          onChange={handleChange}
        />
        <div>{options && <CircularMenu options={options} />}</div>
      </div>
    </div>
  );
};

export default EditableInput;
