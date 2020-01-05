import React from "react";

const Column = (props: { size: string; children: React.ReactNode }) => {
  const size = props.size
    .split(" ")
    .map((size: string) => "col-" + size)
    .join(" ");
  return <div className={size}>{props.children}</div>;
};

export default Column;
