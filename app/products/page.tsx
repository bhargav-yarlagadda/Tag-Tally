
import { deleteProductById, getAllProducts } from "@/lib/actions";
import { redirect } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import React from "react";
import { Metadata } from "next";

// export const metadata:Metadata = {
//     title:"Tag Tally | Products"
// }
const page = async () => {
  const product = await getAllProducts();

  return (
    <div className=" bg-gradient-to-r transition-all delay-1000 ease-out from-blue-50 to-blue-100 px-6 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          Saved Products
        </h1>
        <p className="text-lg text-gray-600">
          Explore the products you’ve saved for later. Your personalized
          collection is just a scroll away!
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {product && product.length > 0 ? (
          product.map((prod:any, idx:any) => (
            <div
              key={idx}
              className="bg-white hover shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
            >

              <ProductCard product={prod} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No products saved yet. Add some to see them here!
            <button
              onClick={()=>{redirect('/')}}
              className="px-6 py-3 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white font-medium text-lg rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Return Home
            </button>
          </div>
        )}
      </div>

      {/* Decorative Element */}
      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          Start saving products to create your curated collection 💖
        </p>
      </div>
    </div>
  );
};

export default page;