import shopify from '../modules/shopify/shopify-ins';
function getCustomerById(id: number) {
  return shopify.customer.get(id);
}
function updateCustomer() {
  const customer: any = {};
  customer.id = 7427220930874;
  customer.first_name = 'Steve 2222';
  customer.last_name = 'Lastnameson 3333';
  customer.email = 'steve.lastnameson@example.com';
  customer.phone = '+15142546011';
  customer.verified_email = true;
  customer.addresses = [
    {
      address1: '123 Oak St676767',
      city: 'Ottawa',
      province: 'ON',
      phone: '555-1212',
      zip: '123 ABC',
      last_name: 'Lastnameson',
      first_name: 'Mother',
      country: 'CA',
    },
  ];
  customer.password = 'newpass1';
  customer.password_confirmation = 'newpass1';
  customer.send_email_welcome = false;
  return shopify.customer.update(7427220930874, customer);
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

function createCustomerWithoutAddress() {
  const customer: any = {};
  customer.first_name = 'abc';
  customer.last_name = 'abc';
  customer.email = 'abc@example.com';
  customer.phone = '+12142546012';
  customer.verified_email = true;
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

function removeNotDefaultAddressFirst(cusId: number, addressId: number[]) {
  if (addressId.length > 0) {
    const params = { address_ids: addressId, operation: 'destroy' };
    return shopify.customerAddress.set(cusId, params);
  }
  return null;
}
async function updateA2eCustomerFlow(id: number) {
  const shopifyCus = await getCustomerById(id);
  const addressNotDefault = shopifyCus.addresses?.reduce(
    (store: number[], cur) => {
      if (cur.default !== true) {
        store = [...store, cur.id];
      }
      return store;
    },
    [],
  );
  if (addressNotDefault) {
    await removeNotDefaultAddressFirst(id, addressNotDefault);
  }

  const shopiFyDefaultAddress = shopifyCus.addresses?.find(
    (e) => e.default === true,
  );
  let newDefaultAddress: any = {
    id: undefined,
    address1: 'new Default address',
    city: 'Ottawa',
    province: 'ON',
    phone: '111-1212',
    zip: '123 CDE',
    last_name: 'Lastnameson',
    first_name: 'Mother',
    country: 'CA',
    default: true,
  };
  if (shopiFyDefaultAddress) {
    newDefaultAddress.id = shopiFyDefaultAddress.id;
  }

  const customerUpdated: any = {};
  customerUpdated.id = shopifyCus.id;
  customerUpdated.first_name = 'Steve 5555';
  customerUpdated.last_name = 'Lastnameson 66666';
  customerUpdated.phone = '+15142546011';
  customerUpdated.verified_email = true;
  customerUpdated.addresses = [
    newDefaultAddress,
    {
      address1: 'new other Address',
      city: 'Ottawa',
      province: 'ON',
      phone: '555-1212',
      zip: '123 ABC',
      last_name: 'Lastnameson',
      first_name: 'Mother',
      country: 'CA',
    },
  ];
  customerUpdated.password = 'newpass1';
  customerUpdated.password_confirmation = 'newpass1';
  customerUpdated.send_email_welcome = false;

  const result = await shopify.customer.update(id, customerUpdated);
  return result;
}

async function main() {
  const c = await createCustomerWithoutAddress();
  console.log('🚀 ~ file: shopify-customer.test.ts:151 ~ main ~ c:', c);
  // await getCustomerById(7427220930874).then((data) => {
  //   console.log(
  //     '🚀 ~ file: shopify-customer.test.ts:9 ~ getCustomerById ~ data:',
  //     data,
  //   );
  //   console.log(
  //     '🚀 ~ file: shopify-customer.test.ts:73 ~ getCustomerById ~ data:',
  //     data.addresses,
  //   );
  // });
  console.log('NextStep---------------------------------------------');
  // createCustomer().then((data) => {
  //   console.log('🚀 ~ file: createCustomer ~ data:', data);
  // });

  // searchCustomerByEmail('thanhquisg24@gmail.com').then((data) => {
  //   console.log('🚀 ~ file:searchCustomerByEmail ~ data:', data);
  // });

  // updateCustomer().then((data) => {
  //   console.log(
  //     '🚀 ~ file: shopify-customer.test.ts:82 ~ updateCustomer ~ data:',
  //     data,
  //   );
  // });
  // await updateA2eCustomerFlow(7427220930874).then((data) => {
  //   console.log(
  //     '🚀 ~ file: shopify-customer.test.ts:162 ~ updateA2eCustomerFlow ~ data:',
  //     data,
  //   );
  //   console.log(
  //     '🚀 ~ file: shopify-customer.test.ts:162 ~ updateA2eCustomerFlow ~ data:',
  //     data.addresses,
  //   );
  // });

  console.log('hello');
}

main().then();
