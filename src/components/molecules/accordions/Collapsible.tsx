"use client";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface IProps {
  children: React.ReactNode;
  title: string;
}
const Collapsible = ({ children, title }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="bg-muted p-4 rounded-lg shadow-sm duration-1000">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
        <h1 className="text-md font-semibold">{title}</h1>
        <div>{isOpen ? <FaMinus className="duration-500"/> : <FaPlus className="duration-500"/>}</div>
      </div>
        <div className="h-[1px] bg-muted-foreground my-2"></div>
      <div
        className={`flex flex-col gap-4 overflow-hidden transition-[max-height] duration-1000`}
        style={{
          maxHeight: isOpen ? "1000px" : "0px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapsible;
