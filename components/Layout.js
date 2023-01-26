import React from "react";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div>
      <div className="p-5">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
