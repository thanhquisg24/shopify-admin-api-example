async function postA2EPasswordReset(data = {}) {
  // Default options are marked with *
  try {
    const url =
      'https://test.a2eship.com/api/a2e-shopify/v1/customer/password-reset';
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
    let result = null;
    if (response.ok) {
      result = await response.text();
      console.log('Success:', result);
      return true;
    } else {
      result = await response.json();
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function callA2EPasswordReset(shopifyCustomerId, password) {
  const data = { shopifyCustomerId, password };
  try {
    const is_verify = await postA2EPasswordReset(data);
    return is_verify;
  } catch (err) {
    alert(err.message);
  }
  return false;
}

function checkValidPass(pass, confirmPass) {
  if (pass.length < 5) {
    alert('Password is too short (minimum is 5 characters)');
    return false;
  }
  if (pass !== confirmPass) {
    alert('The password confirmation must match the provided password');
    return false;
  }
  return true;
}

async function onSubmitPass(form) {
  alert('hello a2e pass ');
  const formData = new FormData(form.currentTarget);
  const customerId = document.querySelector('input[name="id"]').value;
  const pass = document.getElementById('password').value;
  const confirmPass = document.getElementById('password_confirmation').value;
  const checkPass = checkValidPass(pass, confirmPass);
  if (checkPass === false) {
    return false;
  }
  console.log('Test 1', customerId, pass);
  if (customerId) {
    startPageLoader();
    const isVerify = await callA2EPasswordReset(customerId, pass);
    stopPageLoader();
    // const isVerify=true;
    if (form !== undefined && isVerify) {
      form.submit();
    }
  }
  return false;
}
