import React, { PropsWithChildren } from "react";
import ToolBar from "../ToolBar/ToolBar.tsx";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <ToolBar />
      </header>
      <main className="container">{children}</main>
    </>
  );
};

export default Layout;
