async function postVerifyA2eCustomerData(data = {}) {
  // Default options are marked with *
  try {
    const url = 'https://test.a2eship.com/api/a2e-shopify/v1/customer/verify';
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'unsafe-url', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const result = await response.json();
    if (response.ok) {
      console.log('Success:', result);
      return true;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function callA2eSubmitLogin(email, password) {
  const data = { email, password };
  try {
    const is_verify = await postVerifyA2eCustomerData(data);
    return is_verify;
  } catch (err) {
    alert(err.message);
  }
  return false;
}

async function onSubmitLogin(form) {
  alert('hello a2e login');
  // const formData = new FormData(form.currentTarget);
  // const email = formData.get('customer[email]');
  // const pass = formData.get('customer[password]');
  const formData = new FormData(form.currentTarget);
  const email = document.getElementById('CustomerEmail').value;
  const pass = document.getElementById('CustomerPassword').value;
  startPageLoader();
  const isVerify = await callA2eSubmitLogin(email, pass);
  console.log('Test 1', email, pass);
  console.log('Test 2');
  stopPageLoader();
  // const isVerify=true;
  if (form !== undefined && isVerify) {
    form.submit();
  }
  return false;
}
// async function onSubmitLogin(form) {
//   if (form !== undefined) {
//     form.submit();
//   }
// }
