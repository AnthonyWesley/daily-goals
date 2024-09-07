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

export default function CircularMenu({
  options,
  // toggle,
}: {
  options: MenuOption[];
  // toggle: (option: string | boolean) => void;
}) {
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
            // toggle(true);
          }}
          onCancel={() => {
            setSelectedOption(null);
            setIsOpen(true);
            handleExtraAction(options[1]);
            // toggle(false);
          }}
        />
      )}

      {!selectedOption && (
        <RadialMenu
          isOpen={isOpen}
          // toggle={toggle}
          options={options}
          onSelect={(option) => {
            handleExtraAction(option); // Executa a ação extra antes de exibir o RadialConfirm
            setSelectedOption(option); // Exibe o RadialConfirm depois
            setIsOpen(true);
          }}
        />
      )}

      <button
        className={`rounded-full p-3 text-white transition-all ${isOpen ? "bg-[#fe915e]/40" : "bg-[#fe915e]"}`}
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
