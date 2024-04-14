import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product">
          <Route path=":id" element={<ProductDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
