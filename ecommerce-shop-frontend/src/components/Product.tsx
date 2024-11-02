import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../lib/features/cartItemsSlice";
import Skeleton from "./skeletons/Skeleton";
import { useState } from "react";

// Types
import { ProductType } from "../lib/features/productsSlice";
import { AppDispatch } from "../lib/store";
import { closeSidebar } from "../lib/features/sidebarSlice";

const Product = ({ product }: { product: ProductType }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { id, image, category, title, price } = product;

  return (
    <div>
      <div
        className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition"
        tabIndex={0}
      >
        <div className="w-full h-full flex justify-center items-center">
          {/* image */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <Skeleton
              className={`${
                isLoaded ? "hidden" : ""
              } w-[130px] h-[160px] bg-[rgb(199_199_199)] group-hover:scale-110 transition duration-300`}
            />
            <img
              className={`${
                isLoaded ? "" : "hidden"
              } max-h-[160px] group-hover:scale-110 transition duration-300`}
              src={image}
              onLoad={() => setIsLoaded(true)}
              alt={title}
            />
          </div>
        </div>
        {/* buttons */}
        <div className="absolute top-2 -right-11 group-hover:right-2 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all">
          <button
            onClick={() => dispatch(addToCart({ product, id }))}
            aria-label="Add product to cart"
          >
            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            onClick={() => dispatch(closeSidebar())}
            className="flex w-12 h-12 bg-white justify-center items-center text-primary drop-shadow-xl"
            aria-label="Learn more details about the product"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      {/* category & title & price */}
      <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
      <Link
        to={`/product/${id}`}
        aria-label="Learn more details about the product"
      >
        <h2 className="font-semibold mb-1">{title}</h2>
      </Link>
      <div className="font-semibold">${price}</div>
    </div>
  );
};

export default Product;
