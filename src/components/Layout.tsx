import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Sidebar />
    </main>
  );
};

export default Layout;
