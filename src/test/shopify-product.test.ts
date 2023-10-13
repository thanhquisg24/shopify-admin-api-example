import shopify from '../modules/shopify/shopify-ins';

function getProductById(id: number) {
  return shopify.product.get(id);
}

function main() {
  getProductById(8736173621562).then((data) => {
    console.log(
      '🚀 ~ file: shopify-product.test.ts:9 ~ getProductById ~ data:',
      data,
    );
  });
  console.log('hello');
}

main();
