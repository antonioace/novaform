import React from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import CardElement from "./CardElemento";

export interface ListElementsConfigProps {
  title: string;
  elements: {
    icon: React.ReactNode;
    label: string;
    type: string;
  }[];
}

function ListElementsConfig({ title, elements }: ListElementsConfigProps) {
  const [open, setOpen] = React.useState(false);
  const onClickOpen = () => {
    setOpen(!open);
  };
  return (
    <div
      className="w-full
    border-b border-b-[#eeeeee]
    py-1
    "
    >
      <div className="flex items-center justify-between px-2 pt-2 pb-1">
        <span className="text-xs font-semibold text-[#232323]">{title}</span>
        <span
          className="text-[#b0b0b0] text-xs cursor-pointer"
          onClick={onClickOpen}
        >
          {open ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
        </span>
      </div>
      {open && (
        <div className="grid grid-cols-3 gap-3 p-2">
          {elements.map((el) => (
            <CardElement key={el.label} icon={el.icon} label={el.label} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListElementsConfig;
