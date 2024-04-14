import { useState, useEffect } from "react";

// import icons
import { BsBag } from "react-icons/bs";
// import link
import { Link } from "react-router-dom";
// import logo
import Logo from "../assets/logo.svg";

import { useDispatch, useSelector } from "react-redux";
import { selectItemAmount } from "../lib/features/cartItemsSlice";
import { toggleSidebar } from "../lib/features/sidebarSlice";

const Header = () => {
  // header state
  const [isActive, setIsActive] = useState<boolean>(false);

  const dispatch = useDispatch();
  const itemAmount = useSelector(selectItemAmount);

  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });
  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* logo */}
        <Link to={"/"}>
          <div>
            <img className="w-[40px]" src={Logo} alt="" />
          </div>
        </Link>
        {/* cart */}
        <div
          onClick={() => dispatch(toggleSidebar())}
          className="cursor-pointer flex relative"
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
