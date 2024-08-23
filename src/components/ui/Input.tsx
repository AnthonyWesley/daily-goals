import React from "react";

interface IInput {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Input({ label, value, onChange, className }: IInput) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div
      className={`flex flex-col gap-1 rounded-sm bg-transparent ${className}`}
    >
      <label htmlFor={label} className="">
        {label}
      </label>
      <input
        type="text"
        id={label}
        name={label}
        value={value}
        onChange={handleChange}
        className="h-10 rounded-sm border-none bg-neutral-200 p-1 text-2xl"
      />
    </div>
  );
}
