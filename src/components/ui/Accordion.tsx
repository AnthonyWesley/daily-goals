import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

interface AccordionProps {
  title?: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function Accordion({
  title,
  content,
  icon,
  disabled,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (disabled) setIsOpen(false);
  }, [disabled]);

  return (
    <div
      className={` ${disabled ? "pointer-events-none" : "pointer-events-auto"} w-full overflow-hidden rounded-sm bg-transparent`}
    >
      <div className="mb-1 flex w-full items-center justify-between gap-1 rounded-md bg-[#2a2f3b] p-2 text-white focus:outline-none">
        {title ? title : ""}

        {!icon && (
          <Icon
            icon="line-md:chevron-small-down"
            className="cursor-pointer rounded-sm hover:bg-teal-900"
            style={{ rotate: isOpen ? "180deg" : "" }}
            width={30}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
        {icon && (
          <div
            className="flex cursor-pointer items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {icon}
          </div>
        )}
      </div>
      <div
        className={`overflow-hidden duration-500 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="">{content}</div>
      </div>
    </div>
  );
}
