/** functions that affect the html page in response to user choice, and sets global variable **/
let searchBy;
let latitude = null;
let longitude = null;
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

  if (userID.length == 0)
  {
    alert("You must insert a username.");
    return;
  }
  else if (email == "")
  {
    alert("You must insert an email.");
    return;
  }
  else if (isbn == "")
  {
    alert("You must insert an isbn number.");
    return;
  }

  const url = "/listing";


  //need to make this happen after the first


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

}



/** searchShelf takes in an isbn to search for and alerts the user of the various email addresses that they can contact to borrow the book **/
function searchShelf() {
  
  let title = document.getElementById("title").value.replace("'","/");
  // let author = document.getElementById("author").value;
  let isbn = document.getElementById("borrowISBN").value;
  let searchRadius = document.getElementById("radius").value;
  if (searchRadius <= 0)
  {
    alert("Search Radius must be greater than 0");
    return;
  }
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
        latitude: latitude? latitude: 38.957,
        longitude: longitude? longitude: -95.255,
        searchBy: searchBy? searchBy : "null"
      })
    },
    success: function (response) {
      let initialParse = response.split("\"");

      let parsed = [];
      let item = "";
      for (let i = 0; i<initialParse.length; i++)
      {
        if (i%2 == 1)
        {
          item = "Email: ";
          item = item + initialParse[i];
        }
        else if (i>1)
        {
          smallParse = "";
          for (let j = 0; j< initialParse[i].length; j++)
          {
            if (j>1 && j < 8 && (!isNaN(initialParse[i][j]) || initialParse[i][j] == '.'))
            {
              smallParse = smallParse + initialParse[i][j];
            }
          }

          item = item + " - Distance: " + smallParse + " km";
          parsed.push(item);
        }

      }

      finalString = "CONTACT THE FOLLOWING TO BORROW YOUR BOOK:\n\n"
      for (let i = 0; i < parsed.length; i++)
      {
        finalString = finalString + parsed[i] + "\n"
      }
      if (parsed.length == 0)
      {
        alert("Sorry: Match not found. Please Try another book.")
      }
      else
      {
        alert(finalString);
      }
    },
    dataType: 'text',
    async: false
  })

}


function getLocation()
{ 
    function success(position) {
      latitude  = position.coords.latitude;
      longitude = position.coords.longitude;
    }
   
    function error() {
      console.log('Unable to retrieve your location');
    }
    
    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    
}