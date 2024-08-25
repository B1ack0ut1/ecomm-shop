import Product from "../components/Product";
import Hero from "../components/Hero";
import { useGetProductsQuery } from "../lib/features/productsSlice";
import { selectAllProducts } from "../lib/features/productsSlice";
import { useSelector } from "react-redux";
import SkeletonHome from "../components/skeletons/SkeletonHome";

const Home = () => {
  const { isLoading, isError } = useGetProductsQuery();
  const menAndWomenProducts = useSelector(selectAllProducts);

  // Rtk query doesn't yet support Suspense and Errorboundary
  if (isLoading) return <SkeletonHome />;
  if (isError)
    return (
      <p className="h-screen flex justify-center items-center">
        An error has occurred.
      </p>
    );

  return (
    <div data-testid="home">
      <Hero />
      <section className="py-16">
        <div className="hidden"></div>
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
