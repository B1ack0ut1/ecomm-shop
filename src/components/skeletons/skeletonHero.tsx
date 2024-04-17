import Skeleton from "./Skeleton";

const SkeletonHero = () => {
  return (
    <section className="h-[800px] w-full bg-[rgb(150_150_150)] py-24">
      <div className="container mx-auto flex justify-around h-full">
        {/* text */}
        <div className="flex flex-col justify-center">
          {/* pretitle */}
          {/* Text: NEW TREND */}
          <Skeleton className="text w-[150px]" />
          {/* Text: AUTUMN SALE STYLISH */}
          <Skeleton className="w-[700px] h-[75px]" />
          {/* Text: WOMENS */}
          <Skeleton className="w-[325px] h-[75px] mb-4" />
          {/* Text: DISCOVER MORE */}
          <Skeleton className="text self-start w-[135px]" />
        </div>
        {/* image not necessary to display*/}
        <Skeleton className="w-[285px] invisible" />
      </div>
    </section>
  );
};

export default SkeletonHero;
