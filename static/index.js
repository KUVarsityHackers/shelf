function onSubmit() {

  let userID = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  const url = '/login';
  $.post(url, {
    json_string: JSON.stringify({ userID: userID, password: password })
  });

  return false;
}

function putOnShelf() {

  let userID = document.getElementById("userName").value;
  let email = document.getElementById("email").value;
  let isbn = document.getElementById("isbn").value;

  const url = "/listing";
  $.post(url, {
    json_string: JSON.stringify({
      user: userID,
      email: email,
      isbn: isbn
    })
  })
}

function searchShelf() {

  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let isbn = document.getElementById("borrowISBN").value;

  const url = "/search";
  let response = $.post(url, {
    json_string: JSON.stringify({
      title: title? title : "null",
      author: author? author : "null",
      isbn: isbn? isbn : "null"
    })
  })
}
