
import React, { useState } from 'react';
import { AiFillCaretUp , AiFillCaretDown  } from "react-icons/ai";

interface ICollapsibleProps {
  children: React.ReactNode;
  isOpen?: boolean;
  title?: string;
  onCollapse?: (isOpen: boolean) => void;
}

const Collapsible = (props: ICollapsibleProps) => {
  const {
    isOpen = true,
    title,
    onCollapse
  } = props;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isOpen);

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
    onCollapse?.(!isOpen);
  };

  return (
    <div className="w-full">      
      <div 
        className="flex items-center justify-between w-full p-5 font-medium border border-gray-100 rounded-t-xl text-gray-400 bg-white hover:bg-gray-800 gap-5"
        onClick={handleToggle}
        role="button"
      >
        <span>{title}</span>
        {isCollapsed ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </div>      
      <div
        className={`${
          isCollapsed ? '' : 'max-h-0'
        } w-full basis-full overflow-hidden transition-all duration-300 ease-in-out rounded-b-xl`}
      >
        <div className="relative mx-auto flex flex-col rounded-b-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="p-6">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collapsible;