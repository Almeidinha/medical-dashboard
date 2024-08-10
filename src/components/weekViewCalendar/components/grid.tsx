import { ReactNode } from "react";
import { getMinutes, getUnixTime } from "date-fns";
import { Cell, Days } from "../lib/use-weekview";

interface GridProps {
  days: Days;
  rowHeight: number;
  CellContent?: (cell: Cell) => ReactNode;
}

const Grid = (props: GridProps) => {
  const { days, rowHeight, CellContent } = props;

  return (    
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${days[0].cells.length}, minmax(${rowHeight}px, 1fr))`,
      }}
    >
      {days.map((day, dayIndex) =>
        day.cells.map((cell, cellIndex) => (
          <div
            key={getUnixTime(cell.date)}
            className={`relative border-t border-l border-gray-100 transition-colors cursor-pointer hover:bg-slate-100 ${
              dayIndex === days.length - 1 ? 'border-r' : ''
            }`}
            style={{
              gridRowStart: cellIndex + 1,
              gridRowEnd: cellIndex + 2,
              gridColumnStart: dayIndex + 1,
              gridColumnEnd: dayIndex + 2,
              borderStyle: 'dashed',
              borderRadius: '4px',
            }}
          >
            {CellContent?.(cell)}
          </div>
        ))
      )}
      <div
        className="sticky left-0 grid pointer-events-none"
        style={{
          display: "grid",
          gridRowStart: 1,
          gridRowEnd: -1,
          gridColumnStart: 1,
          gridTemplateRows: `repeat(${days[0].cells.length}, minmax(${rowHeight}px, 1fr))`,
        }}
      >
        {days[0].cells.map(
          (cell, cellIndex) =>
            getMinutes(cell.date) === 0 && (
              <div
                key={getUnixTime(cell.date)}
                className="relative flex items-center justify-center border-t border-gray-100"
                style={{
                  gridRowStart: cellIndex + 1,
                  gridRowEnd: cellIndex + 2,
                }}
              >
                <span className="absolute top-0 left-0 text-xs text-slate-400 px-1">
                  {cell.hourAndMinute}
                </span>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Grid;