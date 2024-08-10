"use client"

import React, { useState } from "react";
import Link from 'next/link'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import SubMenu from "./componnets/sub-menu";

export interface SidebarData {
  title: string;
  path: string;
  icon: JSX.Element;
  subNav?: SidebarData[];
}

export interface SidebarProps {
  data: SidebarData[];
}

const Sidebar = (props: SidebarProps) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
      <div className="bg-gray-900 h-20 flex justify-start items-center">
          <Link href="#" className="ml-8 text-2xl h-20 flex justify-start items-center">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1 className="text-center ml-52 text-white">Medical Dashboard</h1>
        </div>
        <nav className={`bg-gray-900 w-64 h-full fixed top-0 left-0 transform ${sidebar ? "translate-x-0" : "-translate-x-full"} transition-transform duration-350 z-10`}>
          <div className="w-full">
            <Link href="#" className="ml-8 text-2xl h-20 flex justify-start items-center">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </Link>
            {props.data.map((item, index) => {
              return (
                <SubMenu item={item} key={index} />
              );
            })}
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;