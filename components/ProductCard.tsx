import placeholder from '../public/assets/images/placehoder.jpeg';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface Props {
  product: Product;
}

const ProductCard = async ({ product }: Props) => {


  return (
    <div className='' >
      <Link href={`/products/${product._id}`} className="product-card">
        <div className="">
          <Image 
            src={product.image && product.image !== "" ? product.image : placeholder}
            alt={product.title || "Product"}
            width={180}
            height={200}
            className="product-card_img"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="product-title">{product.title}</h3>

          <div className="flex justify-between px-6">
            <p className="text-black opacity-50 text-lg capitalize">
              {product.category}
            </p>

            <p className="text-black text-lg font-semibold">
              <span>{product?.currency}</span>
              <span>{product?.currentPrice}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
