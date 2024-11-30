import axios from "axios"
import * as cheerio from 'cheerio'
import { extractCurrency, extractDescription, extractPrice } from "../utils/utils"
export const scrapeAmazonProduct = async (url:string)=>{
    if(!url){
        return
    }


    // proxy config using bright data
    const userName = String(process.env.BRIGHT_DATA_USER_NAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225
    const sessionID = (100000*Math.random()) | 0
    const options = {
        auth: {
          username: `${userName}-session-${sessionID}`,
          password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
      }
    
      try {
        // Fetch the product page
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
    
        // Extract the product title
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
          $('.priceToPay span.a-price-whole'),
          $('.a.size.base.a-color-price'),
          $('.a-button-selected .a-color-base'),
        );
    
        const originalPrice = extractPrice(
          $('#priceblock_ourprice'),
          $('.a-price.a-text-price span.a-offscreen'),
          $('#listPrice'),
          $('#priceblock_dealprice'),
          $('.a-size-base.a-color-price')
        );
    
        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
    
        const images = 
          $('#imgBlkFront').attr('data-a-dynamic-image') || 
          $('#landingImage').attr('data-a-dynamic-image') ||
          '{}'
    
        const imageUrls = Object.keys(JSON.parse(images));
    
        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
    
        const description = extractDescription($)
    
        // Construct data object with scraped information
        const data = {
          url:url,
          currency: currency || '$',
          image: imageUrls[0],
          title:title,
          currentPrice: Number(currentPrice) || Number(originalPrice),
          originalPrice: Number(originalPrice) || Number(currentPrice),
          priceHistory: [],
          discountRate: Number(discountRate),
          category: 'category',
          reviewsCount:100,
          stars: 4.5,
          isOutOfStock: outOfStock,
          description:description,
          lowestPrice: Number(currentPrice) || Number(originalPrice),
          highestPrice: Number(originalPrice) || Number(currentPrice),
          averagePrice: Number(currentPrice) || Number(originalPrice),
        }
        return data;
      } catch (error: any) {
        console.log(error);
      }
    }