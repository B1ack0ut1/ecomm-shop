import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="sign-in/*" element={<SignInPage />} />
        <Route path="sign-up/*" element={<SignUpPage />} />
        <Route index element={<Home />} />
        <Route path="product">
          <Route path=":id" element={<ProductDetails />} />
        </Route>
        <Route path="success" element={<PaymentSuccess />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
