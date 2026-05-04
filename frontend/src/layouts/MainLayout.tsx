import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="flex align-content-around flex-column h-screen">
        <Header />
        <div className="flex w-full mt-4 justify-content-center">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
