async function postA2ERegister(data = {}) {
  // Default options are marked with *
  try {
    const url = 'https://test.a2eship.com/api/a2e-shopify/v1/customer/register';
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

async function callA2ERegister(fisrtName, lastName, email, pass) {
  const data = {
    fisrtName,
    lastName,
    email,
    password: pass,
    defaultLocationCode: 'SIN',
  };
  try {
    const is_verify = await postA2ERegister(data);
    return is_verify;
  } catch (err) {
    alert(err.message);
  }
  return false;
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

function checkValidRegister(fisrtName, lastName, email, pass) {
  if (fisrtName.length < 1) {
    alert("First Name can't be blank");
    return false;
  }
  if (lastName.length < 1) {
    alert("Last Name can't be blank");
    return false;
  }
  if (validateEmail(email) === false) {
    alert('Email is not valid');
    return false;
  }

  if (pass.length < 5) {
    alert('Password is too short (minimum is 5 characters)');
    return false;
  }

  return true;
}

async function onSubmitRegister(form) {
  alert('hello a2e register ');
  const formData = new FormData(form.currentTarget);
  const fisrtName = document.getElementById('RegisterForm-FirstName').value;
  const lastName = document.getElementById('RegisterForm-LastName').value;
  const email = document.getElementById('RegisterForm-email').value;
  const pass = document.getElementById('RegisterForm-password').value;
  const checkPass = checkValidRegister(fisrtName, lastName, email, pass);
  if (checkPass === false) {
    return false;
  }
  console.log('Test 1', fisrtName, lastName, email, pass);
  startPageLoader();
  const isVerify = await callA2ERegister(fisrtName, lastName, email, pass);
  stopPageLoader();
  if (form !== undefined && isVerify) {
    form.submit();
  }
  return false;
}
