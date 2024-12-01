'use server'
import { revalidatePath } from "next/cache"
import Product from "../models/product.model"
import { connectToDB } from "../mongoose"
import { scrapeAmazonProduct } from "../scraper"
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils/utils";

export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) return;
  
    try {
      connectToDB();
  
      const scrapedProduct = await scrapeAmazonProduct(productUrl);
  
      if(!scrapedProduct) return;
  
      let product = scrapedProduct;
  
      const existingProduct = await Product.findOne({ url: scrapedProduct.url });
  
      if(existingProduct) {
        const updatedPriceHistory: any = [
          ...existingProduct.priceHistory,
          { price: scrapedProduct.currentPrice }
        ]
  
        product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        }
      }
  
      const newProduct = await Product.findOneAndUpdate(
        { url: scrapedProduct.url },
        product,
        { upsert: true, new: true }
      );
      revalidatePath(`/products/${newProduct._id}`);
      return newProduct._id.toString();
    } catch (error: any) {
      throw new Error(`Failed to create/update product: ${error.message}`)
    }
  }

export async function getProductById(productId:any){
  try {
    connectToDB()
    const product = await Product.findOne({_id:productId})
    return product
  } catch (error) {
    console.log("Unable get product by id")
  }

}
export async function deleteProductById(ProdId: any): Promise<boolean> {
  try {
    connectToDB();
    const deletedProd = await Product.deleteOne({ _id: ProdId });
    console.log('Product deleted successfully');
    // returns true if the product exists and if it is deleted
    return deletedProd.deletedCount >= 1
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; 
  }
}
export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error);
  }
}
