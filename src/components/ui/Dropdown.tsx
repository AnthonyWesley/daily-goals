import { useState, useEffect } from "react";

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  dropdownSelect: (option: string) => void;
  dropdownList: string[];
}

export default function Dropdown({
  dropdownSelect,
  dropdownList,
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    if (dropdownList.length > 0 && selectedOption === "") {
      setSelectedOption(dropdownList[0]);
      dropdownSelect(dropdownList[0]);
    }
  }, [dropdownList]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    dropdownSelect(option);
  };

  return (
    <div className="select relative z-40 min-w-40 cursor-pointer text-white duration-500 lg:text-base">
      <div className="selected relative flex items-center justify-between rounded-md bg-[#3c6e71] p-2">
        <span className="ml-2">{selectedOption}</span>
        <svg
          className={`arrow -rotate-90 duration-500`}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
          />
        </svg>
      </div>

      <div className="options invisible absolute top-0 flex w-40 flex-col rounded-md bg-[#3c6e71] p-2 opacity-0 duration-500">
        <div>
          {dropdownList?.map((option, index) => (
            <div
              key={index}
              className={`rounded-sm p-2 ${
                selectedOption === option ? "bg-teal-600" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
