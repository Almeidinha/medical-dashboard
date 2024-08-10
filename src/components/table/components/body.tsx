import React, { FC } from "react";

export interface ColumnData {
  field: string;
}

export interface DataItem {
  [key: string]: any;
}

interface BodyTableComponentProps {
  data: DataItem[];
  columnsData: ColumnData[];
  striped: boolean;
  onRowClick?: (row: DataItem) => void;
}

const BodyTableComponent: FC<BodyTableComponentProps> = ({ data, columnsData, striped, onRowClick }) => {

  const handleRowClick = (row: DataItem) => {
    onRowClick?.(row)
  }
  
  return (
    <tbody className={`bg-white ${striped ? "divide-y divide-gray-200" : ""}`}>
      {data?.map((item, i) => (
        <tr key={`${item.id}-${i}`} className={`bg-white hover:bg-gray-100 ${onRowClick && 'cursor-pointer'}`} onClick={() => handleRowClick(item)}>
          {columnsData?.map((col, j) => (
            <td key={`${item.id}-${j}`}  className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
              <span>{item[col.field]}</span>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default BodyTableComponent;