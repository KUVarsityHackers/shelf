function onSubmit(){

  let userID = document.getElementById("userName").value;
  let password = document.getElementById("password").value;
  
  const url='/login';
  $.post(url, {
    json_string: JSON.stringify({ userID: userID, password:password})
  });

  return false;
}
