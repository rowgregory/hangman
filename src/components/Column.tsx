import React, { ReactNode } from "react";

interface ColumnProps {
  size: string;
  children: ReactNode;
}

const Column = ({ size, children }: ColumnProps) => {
  const columnSize = size
    .split(" ")
    .map((size: string) => "col-" + size)
    .join(" ");
  return <div className={columnSize}>{children}</div>;
};

export default Column;
