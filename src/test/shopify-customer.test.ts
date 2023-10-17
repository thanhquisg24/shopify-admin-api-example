import shopify from '../modules/shopify/shopify-ins';

function getCustomerById(id: number) {
  return shopify.customer.get(id);
}

function createCustomer() {
  const customer: any = {};
  customer.first_name = 'Steve aaaa';
  customer.last_name = 'Lastnameson bbbb';
  customer.email = 'steve.lastnameson@example.com';
  customer.phone = '+15142546011';
  customer.verified_email = true;
  customer.addresses = [
    {
      address1: '123 Oak St',
      city: 'Ottawa',
      province: 'ON',
      phone: '555-1212',
      zip: '123 ABC',
      last_name: 'Lastnameson',
      first_name: 'Mother',
      country: 'CA',
    },
  ];
  customer.password = 'newpass';
  customer.password_confirmation = 'newpass';
  customer.send_email_welcome = false;
  return shopify.customer.create(customer);
}

// function searchCustomerByEmail(email: string, id: number) {
//   // "email:bob.norman@mail.example.com"
//   const params = { query: `email:${email} id:${id}` };
//   return shopify.customer.search(params);
// }

function searchCustomerByEmail(email: string) {
  // "email:bob.norman@mail.example.com"
  const params = { query: `email:${email}` };
  return shopify.customer.search(params);
}

function main() {
  // getCustomerById(7427220930874).then((data) => {
  //   console.log(
  //     '🚀 ~ file: shopify-customer.test.ts:9 ~ getCustomerById ~ data:',
  //     data,
  //   );
  // });

  // createCustomer().then((data) => {
  //   console.log('🚀 ~ file: createCustomer ~ data:', data);
  // });

  searchCustomerByEmail('thanhquisg24@gmail.com').then(
    (data) => {
      console.log('🚀 ~ file:searchCustomerByEmail ~ data:', data);
    },
  );

  console.log('hello');
}

main();
