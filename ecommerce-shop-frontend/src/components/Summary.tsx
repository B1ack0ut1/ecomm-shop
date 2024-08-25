import { useSelector } from "react-redux";
import {
  selectAllCartItems,
  selectItemAmount,
  selectTotal,
} from "../lib/features/cartItemsSlice";

import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/clerk-react";
import { redirect } from "react-router-dom";

const Summary = () => {
  const cartItems = useSelector(selectAllCartItems);
  const total = useSelector(selectTotal);
  const itemAmount = useSelector(selectItemAmount);

  const user = useUser();

  const makePayment = async () => {
    // if (!user.isSignedIn) {
    //   redirect("/sign-in");
    // }

    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    const body = {
      products: cartItems,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `http://localhost:3001/create-checkout-session`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    console.log(response);
    const session = await response.json();
    console.log(session);
    if (stripe) {
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      } else {
        console.log("Stripe failed to initialize.");
      }
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <div>$ {total.toFixed(2)}</div>
          <button
            onClick={makePayment}
            className="bg-black flex p-4 justify-center items-center text-white w-full font-medium"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
