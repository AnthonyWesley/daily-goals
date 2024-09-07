import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import RadialMenu from "./RadialMenu";
import RadialConfirm from "./RadialConfirm";

interface MenuOption {
  id: string;
  label: string | false;
  onClick: () => void;
  action?: () => void;
}

export default function CircularMenu({ options }: { options: MenuOption[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<MenuOption | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setSelectedOption(null);
  };

  const handleExtraAction = (option: MenuOption) => {
    if (option.action) {
      option.action();
    }
  };

  return (
    <div className="relative flex">
      {selectedOption && (
        <RadialConfirm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onConfirm={() => {
            selectedOption.onClick();
            setSelectedOption(null);
            setIsOpen(false);
            handleExtraAction(options[1]);
          }}
          onCancel={() => {
            setSelectedOption(null);
            setIsOpen(true);
            handleExtraAction(options[1]);
          }}
        />
      )}

      {!selectedOption && (
        <RadialMenu
          isOpen={isOpen}
          options={options}
          onSelect={(option) => {
            handleExtraAction(option);
            setSelectedOption(option);
            setIsOpen(true);
          }}
        />
      )}

      <button
        className={`rounded-full p-3 text-white transition-all ${isOpen ? "bg-teal-950/50" : "bg-teal-950"}`}
        onClick={(selectedOption?.label as any) ? () => {} : toggleMenu}
      >
        {!isOpen && (
          <Icon icon="line-md:close-to-menu-alt-transition" width={20} />
        )}
        {isOpen && (
          <Icon
            icon={(selectedOption?.label as any) ?? "line-md:close-small"}
            width={20}
          />
        )}
      </button>
    </div>
  );
}
