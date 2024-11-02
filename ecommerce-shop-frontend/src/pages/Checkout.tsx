import { useUser } from "@clerk/clerk-react";
import { loadStripe } from "@stripe/stripe-js";
import { selectAllCartItems } from "../lib/features/cartItemsSlice";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cart = useSelector(selectAllCartItems);
  const { isSignedIn } = useUser();

  const handleCheckout = async () => {
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    const body = { products: cart };
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(
      `http://localhost:3001/create-checkout-session`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    if (stripe) {
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        console.log(result.error);
      }
    } else {
      console.log("Stripe failed to initialize.");
    }
  };

  if (isSignedIn) {
    handleCheckout();
  }
  return (
    <div className="h-screen w-full flex justify-center items-center">
      Redirecting to checkout...
    </div>
  );
};

export default Checkout;
