import { Link, useNavigate } from "react-router-dom";
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
import CartItem from "./CartItem";

// Types
import { AppDispatch } from "../lib/store";
import { useUser } from "@clerk/clerk-react";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpenSidebar = useSelector(selectSidebarIsOpen);

  const cart = useSelector(selectAllCartItems);
  const total = useSelector(selectTotal);
  const itemAmount = useSelector(selectItemAmount);

  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    dispatch(closeSidebar());
    if (!isSignedIn) {
      navigate("/sign-in?redirect=/checkout");
    } else {
      navigate("/checkout");
    }
  };

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
        <button
          onClick={() => dispatch(closeSidebar())}
          className="cursor-pointer h-8 w-8 flex justify-center items-center"
          aria-label="Close shopping bag sidebar"
        >
          <IoMdArrowForward className="text-2xl" />
        </button>
      </div>
      <div className="flex flex-col gap-y-2 h-[320px] lg:h-[440px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((cartItem) => {
          return <CartItem key={cartItem.id} cartItem={cartItem} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center ">
          {/* total */}
          <div className="uppercase font-semibold">
            <span className="mr-2">Total: </span>$ {total.toFixed(2)}
          </div>
          {/* clear cart icon */}
          <button
            onClick={() => dispatch(clearCart())}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
            aria-label="Clear shopping cart"
          >
            <FiTrash2 />
          </button>
        </div>
        <Link
          to={"/cart-view"}
          aria-label="Direct to homepage"
          className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium"
        >
          View cart
        </Link>
        <button
          onClick={handleCheckout}
          className="bg-black flex p-4 justify-center items-center text-white w-full font-medium"
        >
          {user ? "Proceed to Checkout" : "Login to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
