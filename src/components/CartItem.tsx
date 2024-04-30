import { Link } from "react-router-dom";
import { IoMdClose, IoMdAdd, IoMdRemove } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseAmount,
  decreaseAmount,
} from "../lib/features/cartItemsSlice";
// Types
import { CartItemType } from "../lib/features/cartItemsSlice";
import { AppDispatch } from "../lib/store";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { id, title, image, price, amount } = cartItem;

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* image */}
        <Link
          to={`/product/${id}`}
          aria-label="Learn more details about the product"
        >
          <img className="max-w-[80px]" src={image} alt={title} />
        </Link>
        <div className="w-full flex flex-col">
          {/* title & remove icon */}
          <div className="flex justify-between mb-2">
            {/* title */}
            <Link
              to={`/product/${id}`}
              aria-label="Learn more details about the product"
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {title}
            </Link>
            {/* remove icon */}
            <button
              onClick={() => dispatch(removeFromCart({ id }))}
              className="text-xl cursor-pointer"
              aria-label="Remove item from cart"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </button>
          </div>
          <div className="flex gap-x-2 h-[36px]">
            {/* qty */}
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              {/* minus icon */}
              <button
                onClick={() => dispatch(decreaseAmount({ id }))}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
                aria-label="Decrease item amount by 1"
              >
                <IoMdRemove />
              </button>
              {/* amount */}
              <div className="h-full flex justify-center items-center px-2">
                {amount}
              </div>
              <button
                onClick={() => dispatch(increaseAmount({ id }))}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
                aria-label="Increase item amount by 1"
              >
                {/* plus icon */}
                <IoMdAdd />
              </button>
            </div>
            {/* item price */}
            <div className="flex-1 flex items-center justify-around font-light text-gray-500">
              $ {price}
            </div>
            {/* final price */}
            {/* make the price at 2 decimals */}
            <div className="flex-1 flex justify-end items-center text-primary font-medium">{`$ ${(
              Number(price) * amount
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
