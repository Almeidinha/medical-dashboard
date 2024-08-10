import React, { FC } from "react";

export interface Column {
  field: string;
  headerName: string;
}

export interface HeaderTableComponentProps {
  columns: Column[];
}

const HeaderTableComponent: FC<HeaderTableComponentProps> = ({ columns }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns?.map((item) => {
          return (
            <th
              key={item.field}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {item.headerName}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default HeaderTableComponent;