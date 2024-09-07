import { Icon } from "@iconify/react/dist/iconify.js";

interface RadialConfirmProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function RadialConfirm({
  isOpen,
  onConfirm,
  onCancel,
}: RadialConfirmProps) {
  const confirmOptions = [
    {
      id: "cancel",
      label: "line-md:close-small",
      onClick: onCancel,
    },
    {
      id: "confirm",
      label: "line-md:confirm",
      onClick: onConfirm,
    },
  ];

  const radius = 45;

  return (
    <div className="relative z-20">
      {confirmOptions.map((option, index) => {
        const angle = (index / confirmOptions.length - 1.5) * (Math.PI - 0.64);
        const x = radius * Math.cos(angle) + 10;
        const y = radius * Math.sin(angle);
        return (
          <button
            key={index}
            className={`btn absolute -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-teal-950 p-3 text-white transition duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
            style={{
              left: isOpen ? `calc(50% + ${x}px)` : "30%",
              top: isOpen ? `calc(50% + ${y}px)` : "50%",
              transition: "left 0.3s ease-out, top 0.3s ease-out, opacity 0.3s",
              pointerEvents: isOpen ? "auto" : "none",
            }}
            onClick={option.onClick}
          >
            {/* {option.label} */}
            <Icon icon={option?.label as any} width={20} />
          </button>
        );
      })}
    </div>
  );
}
