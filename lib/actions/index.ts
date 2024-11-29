'use server'

import { scrapeAmazonProduct } from "../scraper"

export async function scrapeAndStoreProduct(productUrl:string) {
    if(!productUrl){
        return 
    }
    try {
        const scrapedProduct = await scrapeAmazonProduct(productUrl)
        if(!scrapedProduct )return 
        
    } catch (error:any) {
        throw new Error(`Action Failed Try After SomeTime ${error.message}`)
    }
}
