import HeroCarousel from "@/components/HeroCarousel";
import Searchbar from "@/components/SearchBar";
import Image from "next/image";
import { Metadata } from "next";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Tag Tally | Home",
  description:
    "Track product prices effortlessly and save money on your online shopping.",
};

const getRandomProducts = (products: any[], count: number): any[] => {
  // Shuffle the array using Fisher-Yates algorithm
  for (let i = products.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [products[i], products[j]] = [products[j], products[i]];
  }
  return products.slice(0, count);
};

const Home = async () => {
  const allProducts = await getAllProducts();
  console.log(allProducts);
  let randomProducts;
  // Get 4 random products
  if(!!allProducts){
     randomProducts = getRandomProducts([...allProducts], 4);
  }

  return (
    <>
      <section className="px-6 py-24 md:px-20">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Unleash the Power of
              <span className="text-primary"> Tag Tally</span>
            </h1>

            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-4 items-center justify-center gap-y-16">
          {randomProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
