import React, { FC } from "react";

const AppLayout: FC = ({ children }): JSX.Element => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div>{children}</div>
      </div>
    </>
  );
};

export default AppLayout;
