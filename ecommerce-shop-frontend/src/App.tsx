import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import CartPage from "./pages/CartPage";

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
        <Route path="cart-view">
          <Route index element={<CartPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
