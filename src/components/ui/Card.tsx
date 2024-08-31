import React, { useState, useEffect } from "react";
import CircularMenu from "./circularMenu/CircularMenu";
import { autoCurrency } from "../../helpers/CurrencyFormatter";

interface MenuOptionProps {
  id: string;
  label: string;
  onClick: () => Promise<void>;
}
interface CardProps {
  label?: string;
  value: number | string;
  onChange?: (value: string | number) => void;
  menuOptions?: MenuOptionProps[];
  className?: string;
  isCurrency?: boolean;
  isDisabled?: boolean;
}

const Card: React.FC<CardProps> = ({
  label,
  value,
  onChange,
  menuOptions,
  className,
  isCurrency = false,
  isDisabled = false,
}) => {
  const [inputDisabled, setInputDisabled] = useState(false);
  const [text, setText] = useState<string | number>(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let newValue = event.target.value.replace(/[^\d]/g, "");

    if (!isCurrency) {
      newValue = autoCurrency(newValue);
    }

    setText(newValue);
    onChange?.(newValue);
  };

  const toggle = (action: string | boolean) => {
    if (action === "line-md:edit") {
      setInputDisabled(true);
    } else {
      setInputDisabled(false);
    }
  };

  return (
    <div className={`flex flex-col text-[#353535] ${className}`}>
      {label && (
        <label className="block text-base font-medium text-[#353535]">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <input
          type="text"
          className={`w-full border-2 bg-transparent p-2 ${
            !inputDisabled
              ? "border-[#3c6e71] border-opacity-0"
              : "border-[#3c6e71]"
          }`}
          disabled={!inputDisabled}
          value={text ?? ""}
          onChange={handleChange}
        />
        <div>
          {!isDisabled && (
            <CircularMenu
              options={menuOptions ? menuOptions : []}
              toggle={toggle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
