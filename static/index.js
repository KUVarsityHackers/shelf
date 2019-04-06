function onSubmit() {

  let userID = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  const url = '/login';
  $.post(url, {
    json_string: JSON.stringify({ userID: userID, password: password })
  });

  return false;
}

function submitListing() {

  let userID = document.getElementById("userName").value;
  let email  = document.getElementById("email").value;
  let isbn   = document.getElementById("isbn").value;
  let street = document.getElementById("address").value;
  let city   = document.getElementById("city").value;
  let state  = document.getElementById("state").value;

  const url = "/listing";
  $.post(url, {
    json_string: JSON.stringify({
      user: userID,
      email: email,
      isbn: isbn,
      city: city,
      state: state,
      street: street
    })
  })
}
