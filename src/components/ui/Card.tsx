import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { autoCurrency } from "../../helpers/CurrencyFormatter";

interface CardProps {
  label: string;
  value: number | string;
  onChange?: (value: any) => void;
  isDisabled?: boolean;
  className?: string;
  confirm?: (b: boolean) => void;
  isCurrency?: boolean;
}

const Card: React.FC<CardProps> = ({
  label,
  value,
  onChange,
  isDisabled = false,
  className,
  confirm,
  isCurrency = false,
}) => {
  const [inputDisabled, setInputDisabled] = useState(false);
  const [text, setText] = useState<string | number>(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let newValue = event.target.value.replace(/[^\d]/g, "");
    if (isCurrency) {
      setText(newValue);
    } else {
      newValue = autoCurrency(newValue);
      setText(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const toggleDisabled = () => {
    setInputDisabled(!inputDisabled);

    if (confirm) {
      confirm(inputDisabled);
    }
  };

  const disabled = isDisabled ? isDisabled : !inputDisabled;
  return (
    <div
      className={`text-[#353535]" flex flex-col items-start rounded-md border-l-[10px] border-l-[#284B63] bg-[#ffffff] p-2 font-semibold shadow-md ${className}`}
    >
      <label className="block text-base font-medium text-[#353535]">
        {label}
      </label>
      <div className="flex w-full items-center gap-2 text-4xl">
        <input
          type="text"
          className={`w-full border-2 border-opacity-0 bg-transparent p-4 ${
            disabled ? "border-[#3c6e71]" : ""
          }`}
          disabled={disabled}
          onChange={handleChange}
          value={text ?? 0}
        />
        {!isDisabled && (
          <div className="flex flex-col justify-center gap-1 self-end">
            <div
              onClick={toggleDisabled}
              className={`${
                !isDisabled ? "bg-[#3c6e71]" : "bg-[#284b63]"
              } flex h-10 w-10 cursor-pointer items-center justify-center rounded-md rounded-tl-xl p-2 text-white`}
              title={!inputDisabled ? "Editar" : "Confirmar"}
            >
              {!inputDisabled && <Icon icon="line-md:edit" width={20} />}

              {inputDisabled && <Icon icon="line-md:confirm" width={20} />}
            </div>

            {inputDisabled && (
              <div
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md rounded-tl-xl bg-[#e63946] p-2 text-white"
                onClick={() => setInputDisabled(false)}
                title="Cancelar"
              >
                <Icon icon="line-md:close-small" width={30} />
              </div>
            )}
            {/* {!inputDisabled && (
              <div
                className="flex h-10 w-10 justify-center rounded-md rounded-tl-xl bg-[#284b63] p-2 text-white"
                title="Deletar"
              >
                <Icon
                  icon="ph:trash"
                  width={20}
                  onClick={() => setInputDisabled(true)}
                />
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
