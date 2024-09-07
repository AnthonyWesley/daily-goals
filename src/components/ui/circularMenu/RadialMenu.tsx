import { Icon } from "@iconify/react/dist/iconify.js";

interface Option {
  id: string;
  label: string | false;
  onClick: () => void;
}

interface RadialMenuProps {
  options: Option[];
  isOpen: boolean;
  onSelect: (option: Option) => void;
  // toggle: (option: string) => void;
}

export default function RadialMenuReact({
  options,
  isOpen,
  onSelect,
}: RadialMenuProps) {
  const radius = 45;

  return (
    <div className="relative z-20">
      {options?.map((option, index) => {
        const angle = (index / options.length - 1.5) * (Math.PI - 0.64);
        const x = radius * Math.cos(angle) + 10;
        const y = radius * Math.sin(angle);

        return (
          <button
            key={index}
            className={`btn absolute -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-teal-950 p-3 text-white transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
            style={{
              left: isOpen ? `calc(50% + ${x}px)` : "30%",
              top: isOpen ? `calc(50% + ${y}px)` : "50%",
              transition: "left 0.3s ease-out, top 0.3s ease-out, opacity 0.3s",
              pointerEvents: isOpen ? "auto" : "none",
            }}
            onClick={() => onSelect(option)}
          >
            {/* {option.label} */}
            <Icon icon={option?.label as any} width={20} />
          </button>
        );
      })}
    </div>
  );
}
