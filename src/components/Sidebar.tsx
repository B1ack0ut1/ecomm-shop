// import link
import { Link } from "react-router-dom";
// import icons
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { selectSidebarIsOpen } from "../lib/features/sidebarSlice";
import { closeSidebar } from "../lib/features/sidebarSlice";
import {
  clearCart,
  selectAllCartItems,
  selectItemAmount,
  selectTotal,
} from "../lib/features/cartItemsSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpenSidebar = useSelector(selectSidebarIsOpen);

  const cart = useSelector(selectAllCartItems);
  const total = useSelector(selectTotal);
  const itemAmount = useSelector(selectItemAmount);

  return (
    <div
      className={`${
        isOpenSidebar ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vh] md:min-w-[30vw] md:max-w-[35vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        {/* icon */}
        <div
          onClick={() => dispatch(closeSidebar())}
          className="cursor-pointer h-8 w-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[320px] lg:h-[440px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center ">
          {/* total */}
          <div className="uppercase font-semibold">
            <span className="mr-2">Total: </span>$ {total.toFixed(2)}
          </div>
          {/* clear cart icon */}
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          to={"/"}
          className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium"
        >
          View cart
        </Link>
        <Link
          to={"/"}
          className="bg-black flex p-4 justify-center items-center text-white w-full font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
