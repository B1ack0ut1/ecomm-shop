import { useParams } from "react-router-dom";
// import cart context
import { CartContext } from "../contexts/CartContext";
// import product context
import { ProductContext } from "../contexts/ProductContext";

import { useDispatch, useSelector } from "react-redux";
import {
  selectProductById,
  useGetProductsQuery,
} from "../lib/features/productsSlice";
import { addToCart } from "../lib/features/cartItemsSlice";
import { RootState } from "../lib/store";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { isLoading, isError } = useGetProductsQuery();

  const product = useSelector((state: RootState) =>
    selectProductById(state, Number(id))
  );

  // if product is not found
  if (isLoading) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }
  if (isError) {
    return (
      <section className="h-screen flex justify-center items-center">
        An error has occurred.
      </section>
    );
  }

  const { title, price, description, image } = product;

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        {/* image & text wrapper */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* image */}
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-sm " src={image} alt="" />
          </div>
          {/* text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[70%] xl:max-w-[550px] mx-auto lg:mx-0">
              {title}
            </h1>
            <div className="text-xl text-red-500 font-medium mb-6">{price}</div>
            <p className="mb-8 max-w-[70%] xl:max-w-[550px]">{description}</p>
            <button
              onClick={() => dispatch(addToCart({ product, id }))}
              className="bg-primary py-4 px-8 text-white"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
