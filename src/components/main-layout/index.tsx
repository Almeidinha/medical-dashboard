"use client"

import React from 'react'
import * as AiIcons from "react-icons/ai";
import Sidebar, { SidebarData } from '../sidebar/sidebar';
import DashboardContainer from '@/hooks/use-dashboard-state';

const AppLayout: React.FC<{children?: React.ReactNode}> = ({ children }) => {


  const data: SidebarData[] = [
    {
      title: "DashBoard",
      path: "/",
      icon: <AiIcons.AiFillHome />,
    },
    {
      title: "Appointment",
      path: "/appointment",
      icon: <AiIcons.AiFillApple />,
    }
  ]

  return (
    <DashboardContainer.Provider>
      <Sidebar data={data} />
      {children}      
    </DashboardContainer.Provider>
  )
}

export default AppLayout
