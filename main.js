const myAPIkey = "90ce47ee510b428b1165e4b13d4354ff";
const baseUrl = String.raw`https://cors-anywhere.herokuapp.com/https://flickr.com/services/rest/?api_key=`;
const flickrUrlParameters = String.raw`&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5`;
let keyTermsToSearch = "sunset";
let imageUrl = "";
let hydratedObject = {};
let pictureNumberToDisplay = 0;

let userPosition = Promise.resolve(
  navigator.geolocation.getCurrentPosition(
    function(position) {
      //when allowed, assign position based off actual location
      userPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      fetchPicture(userPosition.latitude, userPosition.longitude);
    },
    function() {
      //if the user declines to allow the site to know location, set default location to Tokyo, Japan.
      userPosition = {
        latitude: 27.9881,
        longitude: 86.9250
      };
      fetchPicture(userPosition.latitude, userPosition.longitude);
    }
  )
);

function fetchPicture(latitude, longitude) {
  fetch(
    `${baseUrl}${myAPIkey}${flickrUrlParameters}&lat=${latitude}&lon=${longitude}&text=${keyTermsToSearch}`
  )
    .then(responseObject => responseObject.json())
    .then(hydratedBody => {
      photoObj = hydratedBody;
      imageUrl = `https://farm${photoObj.photos.photo[pictureNumberToDisplay].farm}.staticflickr.com/${photoObj.photos.photo[pictureNumberToDisplay].server}/${photoObj.photos.photo[pictureNumberToDisplay].id}_${photoObj.photos.photo[pictureNumberToDisplay].secret}.jpg`;
      let newDiv = document.createElement("img");
      newDiv.src = imageUrl;
      let destination = document.getElementById("imagesGoHere")
      destination.appendChild(newDiv);
    });
}

function advancePicture(){
    pictureNumberToDisplay += 1
    if (pictureNumberToDisplay >= 5){ pictureNumberToDisplay = 0}
    imageUrl = `https://farm${photoObj.photos.photo[pictureNumberToDisplay].farm}.staticflickr.com/${photoObj.photos.photo[pictureNumberToDisplay].server}/${photoObj.photos.photo[pictureNumberToDisplay].id}_${photoObj.photos.photo[pictureNumberToDisplay].secret}.jpg`;
    let newDiv = document.createElement("img");
    newDiv.src = imageUrl;
    let destination = document.getElementById("imagesGoHere")
    destination.innerHTML = ""
    destination.appendChild(newDiv);

}

document.getElementById("myButton").addEventListener("click", advancePicture);
