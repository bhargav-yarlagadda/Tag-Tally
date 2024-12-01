import React from "react";
import { getProductById } from "@/lib/actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatNumber } from "@/lib/utils/utils";
import PriceInfoCard from "@/components/PriceInfoCard";
import placeholder from '../../../public/assets/images/placehoder.jpeg'
export const metadata: Metadata = {
  title: "Tag Tally | Analytics",
};

const Page = async ({ params }: any) => {
  const id = params.id;
  const product = await getProductById(id);

  if (!product) return redirect("/");

  return (
    <div className="pt-20 px-4 py-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-10 xl:gap-x-28">
        {/* Product Image */}
        <div className="flex justify-center">
          <Image
            src={product.image || placeholder }
            alt={product.title}
            width={580}
            height={350}
            className="rounded-lg shadow-md object-cover max-w-full h-auto"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-8">
          {/* Title and Link */}
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                {product.title}
              </h1>
              <Link
                href={product.url}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Visit Product
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />
                <span className="text-red-600 font-semibold">
                  {product.reviewsCount}
                </span>
              </div>
              {["bookmark", "share"].map((icon) => (
                <div
                  key={icon}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  <Image
                    src={`/assets/icons/${icon}.svg`}
                    alt={icon}
                    width={20}
                    height={20}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <p className="text-2xl sm:text-4xl font-bold text-gray-800">
              {product.currency} {formatNumber(product.currentPrice)}
            </p>
            <p className="text-lg sm:text-xl text-gray-500 line-through">
              {product.currency} {formatNumber(product.originalPrice)}
            </p>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/star.svg"
                alt="star"
                width={16}
                height={16}
              />
              <p className="text-primary font-semibold">
                {product.stars || "25"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/comment.svg"
                alt="comment"
                width={16}
                height={16}
              />
              <p className="text-gray-700 font-semibold">
                {product.reviewsCount} Reviews
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            <span className="text-green-600 font-semibold">93%</span> of buyers
            recommend this product.
          </p>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-16">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Product Description
        </h3>
        <div className="space-y-4 text-gray-700">
          <div className="flex flex-col gap-4">
            {product?.description
              ?.split("\n")
              .slice(0, 15)
              .map((line: string, index: number) => (
                <p key={index} className="text-sm sm:text-base text-black">
                  {line}
                </p>
              ))}
            {product?.description?.split("\n").length > 15 && (
              <p className="text-sm sm:text-base text-primary-blue font-semibold">
                ...Read more
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="grid grid-cols-2   gap-x-8 gap-y-6 ">
          <PriceInfoCard
            title="Current Price"
            iconSrc="/assets/icons/price-tag.svg"
            value={`${product.currency} ${formatNumber(product.currentPrice)}`}
          />
          <PriceInfoCard
            title="Average Price"
            iconSrc="/assets/icons/chart.svg"
            value={`${product.currency} ${formatNumber(product.averagePrice)}`}
          />
          <PriceInfoCard
            title="Highest Price"
            iconSrc="/assets/icons/arrow-up.svg"
            value={`${product.currency} ${formatNumber(product.highestPrice)}`}
          />
          <PriceInfoCard
            title="Lowest Price"
            iconSrc="/assets/icons/arrow-down.svg"
            value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
          />
        </div>
      </div>
      {/* Buy Now Button */}
      <div className="mt-12 flex justify-center">
        <Link
          href={product.url}
          target="_blank"
          className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition text-center"
        >
          <Image src="/assets/icons/bag.svg" alt="bag" width={22} height={22} />
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default Page;
