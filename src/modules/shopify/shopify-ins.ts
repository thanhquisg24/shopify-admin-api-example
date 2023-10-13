import Shopify from 'shopify-api-node';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_KEY = process.env.ADMIN_KEY || null;
// const ADMIN_SERECT = process.env.ADMIN_SERECT || null;
const ADMIN_ACCESS_TOKEN = process.env.ADMIN_ACCESS_TOKEN || null;
const SHOP_ID = process.env.SHOP_ID || null;

const apiVersion = '2023-07';

const shopify = new Shopify({
  shopName: SHOP_ID,
  apiKey: ADMIN_KEY,
  password: ADMIN_ACCESS_TOKEN,
  apiVersion,
});

export default shopify;
