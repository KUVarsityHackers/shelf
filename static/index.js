/** Submit does this **/
function onSubmit() {

  let userID = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  const url = '/login';
  $.post(url, {
    json_string: JSON.stringify({ userID: userID, password: password })
  });

  return false;
}

/** put on shelf does this **/
function putOnShelf() {

  let userID = document.getElementById("userName").value;
  let email = document.getElementById("email").value;
  let isbn = document.getElementById("isbn").value;

  const url = "/listing";
  // let response = $.post(url, {
  //   json_string: JSON.stringify({
  //     user: userID,
  //     email: email,
  //     isbn: isbn
  //   })
  // })
  $.ajax({
    type: "POST",
    url: url,
    data: {
      json_string: JSON.stringify({
       user: userID,
       email: email,
       isbn: isbn})
    },
    success: function(response){
     alert(response);
    },
    dataType: 'text',
    async: false
  })
  
}

function searchShelf() {

  // let title = document.getElementById("title").value;
  // let author = document.getElementById("author").value;
  let isbn = document.getElementById("borrowISBN").value;
  let message;
  const url = "/api/search";
  $.ajax({
    type: "POST",
    url: url,
    data: {
      json_string: JSON.stringify({
      title: title? title : "null", 
      author: author? author : "null", 
      isbn: isbn? isbn : "null"})
    },
    success: function(response){
      alert(response);
    },
    dataType: 'text',
    async: false
  })

}
