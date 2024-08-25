import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  selectProductById,
  useGetProductsQuery,
} from "../lib/features/productsSlice";
import { RootState } from "@reduxjs/toolkit/query";
import { selectAllCartItems } from "../lib/features/cartItemsSlice";
import { CartItemType } from "../lib/features/cartItemsSlice";
import CartPageItem from "../components/CartPageItem";
import Summary from "../components/Summary";

const CartPage = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectAllCartItems);

  return (
    <div className="container mx-auto">
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            {cartItems.length === 0 && <p>No items added to Cart.</p>}
            <ul>
              {cartItems.map((item) => {
                return <CartPageItem data={item} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
