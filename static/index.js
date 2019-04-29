/** functions that affect the html page in response to user choice, and sets global variable **/
let searchBy;
function titleSearch(){
    let titleLabel = document.getElementById("bkLabel");
    let titleField = document.getElementById("title");
    let isbnLabel = document.getElementById("isbnLabel");
    let isbnField = document.getElementById("borrowISBN");
    titleLabel.style.display = "block";
    titleField.style.display = "block";
    isbnLabel.style.display  = "none";
    isbnField.style.display  = "none";
    searchBy = "Title";
}

function isbnSearch(){
  let titleLabel = document.getElementById("bkLabel");
  let titleField = document.getElementById("title");
  let isbnLabel = document.getElementById("isbnLabel");
  let isbnField = document.getElementById("borrowISBN");
  titleLabel.style.display = "none";
  titleField.style.display = "none";
  isbnLabel.style.display  = "block";
  isbnField.style.display  = "block";
  searchBy = "ISBN";
}

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

  let latitude = 99999;
  let longitude = 99999;

  let promise = new Promise(function(resolve, reject) { 
    
    latitude = navigator.geolocation.getCurrentPosition(function(position) {
      console.log("in func, lat is: " + position.coords.latitude)
      return position.coords.latitude;
    });
  
    longitude = navigator.geolocation.getCurrentPosition(function(position) {
      return position.coords.longitude;
    });

    console.log("Latitude is " + latitude + " - Longitude is " + longitude);

    if(latitude < 99999 && longitude < 99999) { 
      resolve(); 
    } else { 
      reject(); 
    } 
  });


  const url = "/listing";
  // let response = $.post(url, {
  //   json_string: JSON.stringify({
  //     user: userID,
  //     email: email,
  //     isbn: isbn
  //   })
  // })

  //need to make this happen after the first
  promise.then(function () {
  $.ajax({
    type: "POST",
    url: url,
    data: {
      json_string: JSON.stringify({
       user: userID,
       email: email,
       isbn: isbn,
       lat: latitude? latitude: 38.957,
       lon: longitude? longitude: -95.255
      })
    },
    success: function (response) {
      alert(response);
    },
    dataType: 'text',
    async: false
  })  
})
.catch(function(){
  console.log("Error in list POST")
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
  

  let title = document.getElementById("title").value;
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
        isbn: isbn? isbn : "null",
        radius: searchRadius? searchRadius : "null",
        latitude: latitude? latitude : "null",
        longitude: longitude? latitude : "null",
        searchBy: searchBy? searchBy : "null"
      })
    },
    success: function (response) {
      //only get relevent info
      let correctString = "CONTACT THE FOLLOWING TO BORROW YOUR BOOK:\n"
      let initialParse = response.split("\"");
      /*for (let i = 0; i < initialParse.length; i++) {
        for (let j = 0; j < initialParse[i].length; j++) {
          if (initialParse[i][j] == "@") {
            correctString = correctString + '\n' + initialParse[i];
            break;
          }
        }
      }*/
      alert(initialParse);
    },
    dataType: 'text',
    async: false
  })

}
