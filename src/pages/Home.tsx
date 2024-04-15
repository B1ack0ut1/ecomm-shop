import Product from "../components/Product";
import Hero from "../components/Hero";
import { useGetProductsQuery } from "../lib/features/productsSlice";
import { selectAllProducts } from "../lib/features/productsSlice";
import { useSelector } from "react-redux";
const Home = () => {
  const { isLoading, isError } = useGetProductsQuery();
  const menAndWomenProducts = useSelector(selectAllProducts);

  if (isLoading)
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  if (isError)
    return (
      <section className="h-screen flex justify-center items-center">
        An error has occurred.
      </section>
    );

  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {menAndWomenProducts.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
