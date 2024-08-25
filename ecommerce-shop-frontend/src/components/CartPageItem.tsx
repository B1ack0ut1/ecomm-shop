import { IoMdClose, IoMdAdd, IoMdRemove } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseAmount,
  decreaseAmount,
} from "../lib/features/cartItemsSlice";
import { CartItemType } from "../lib/features/cartItemsSlice";

interface CartItemProps {
  data: CartItemType;
}

const CartPageItem: React.FC<CartItemProps> = ({ data }) => {
  const dispatch = useDispatch();

  const { id, title, price, image } = data;

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <img
          src={image}
          alt="Product image"
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <button
            onClick={() => dispatch(removeFromCart({ id }))}
            className="cursor-pointer h-8 w-8 flex justify-center items-center"
            aria-label="Remove item from cart"
          >
            <IoMdRemove />
          </button>
          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-black">{title}</p>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">color</p>
              <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
                size
              </p>
            </div>
            <div>$ {price}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartPageItem;
