/** OnSubmit calls the login api with the username and passowrd to verify a user's credentials **/
function onSubmit() {

  let userID = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  const url = '/login';
  $.post(url, {
    json_string: JSON.stringify({ userID: userID, password: password })
  });

  return false;
}

/** putOnShelf takes in a user's id and isbn and lists it in the firebase database **/
function putOnShelf() {

  let userID = document.getElementById("userName").value;
  let email = document.getElementById("email").value;
  let isbn = document.getElementById("isbn").value;

  //get geolocation
  /*let latitude = navigator.geolocation.getCurrentPosition(function(position) {
    return position.coords.latitude;
  });

  let longitude = navigator.geolocation.getCurrentPosition(function(position) {
    return position.coords.longitude;
  });*/

  let latitude = 34;
  let longitude = 54;



  const url = "/listing";
  // let response = $.post(url, {
  //   json_string: JSON.stringify({
  //     user: userID,
  //     email: email,
  //     isbn: isbn
  //   })
  // })

  //need to make this happen after the first
  $.ajax({
    type: "POST",
    url: url,
    data: {
      json_string: JSON.stringify({
       user: userID,
       email: email,
       isbn: isbn,
       lat: latitude,
       lon: longitude
      })
    },
    success: function(response){
     alert(response);
    },
    dataType: 'text',
    async: false
  })
  
}

/** searchShelf takes in an isbn to search for and alerts the user of the various email addresses that they can contact to borrow the book **/
function searchShelf() {
  let latitude = navigator.geolocation.getCurrentPosition(function(position) {
    return position.coords.latitude;
  });

  let longitude = navigator.geolocation.getCurrentPosition(function(position) {
    return position.coords.longitude;
  });

  // let title = document.getElementById("title").value;
  // let author = document.getElementById("author").value;
  let isbn = document.getElementById("borrowISBN").value;
  let searchRadius = document.getElementById("radius").value;
  let message;
  const url = "/api/search";
  $.ajax({
    type: "POST",
    url: url,
    data: {
      json_string: JSON.stringify({
      title: title? title : "null", 
      author: author? author : "null", 
      isbn: isbn? isbn : "null",
      radius: searchRadius,
      latitude: latitude,
      longitude: longitude
      })
      

    },
    success: function(response){
      //only get relevent info
      let correctString = "CONTACT THE FOLLOWING TO BORROW YOUR BOOK:\n"
      let initialParse = response.split("\"");
      for (let i=0; i<initialParse.length; i++)
      {
        for (let j=0; j<initialParse[i].length; j++)
        {
          if (initialParse[i][j] == "@")
          {
            correctString = correctString + '\n' + initialParse[i];
            break;
          }
        }
      }
      alert(initialParse);
    },
    dataType: 'text',
    async: false
  })

}
