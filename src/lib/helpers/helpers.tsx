import { Badge } from '@/components/badge'
import { ReactNode } from "react";
import { Status } from "../types";

export const getBadgeStatus = (status: Status): ReactNode => {
  const badges = {
    'pending': <Badge warning>{status}</Badge>,
    'completed': <Badge success>{status}</Badge>,
    'cancelled': <Badge neutral>{status}</Badge>,
    'absent': <Badge critical>{status}</Badge>,
    'default': <Badge neutral>{status}</Badge>,
  }
  
  return badges[status] || badges['default'];
}

export const toPascalCase = (str: string) => {
  return str.replace(/(\w)(\w*)/g,
    function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});
}