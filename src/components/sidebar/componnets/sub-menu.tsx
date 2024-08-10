"use client"

import React, { useState } from "react";
import Link from 'next/link'
import { SidebarData } from "../sidebar";
import * as RiIcons from "react-icons/ri";

export interface SubMenuProps {
  item: SidebarData
}

const SubMenu = (props: SubMenuProps) => {
    
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const { item } = props;

  return (
      <>
          <Link
              href={item.path}
              onClick={item.subNav && showSubnav}
              className="flex justify-between items-center text-blue-200 py-5 px-5 list-none h-15 text-lg no-underline hover:bg-gray-700 hover:border-l-4 hover:border-green-500 cursor-pointer"
          >
              <div className="flex items-center">
                  {item.icon}
                  <span className="ml-4">{item.title}</span>
              </div>
              <div>
                  {item.subNav && subnav
                      ? <RiIcons.RiArrowUpSFill />
                      : item.subNav
                      ? <RiIcons.RiArrowDownSFill />
                      : null}
              </div>
          </Link>
          {subnav &&
              item.subNav?.map((subItem, index) => {
                  return (
                      <Link
                          href={subItem.path}
                          key={index}
                          className="bg-gray-700 h-15 pl-12 flex items-center text-white text-lg no-underline hover:bg-green-500 cursor-pointer"
                      >
                          {subItem.icon}
                          <span className="ml-4">{subItem.title}</span>
                      </Link>
                  );
              })}
      </>
  );
};

export default SubMenu;