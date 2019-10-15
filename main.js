const myAPIkey = "90ce47ee510b428b1165e4b13d4354ff"
const baseUrl = String.raw `https://cors-anywhere.herokuapp.com/https://flickr.com/services/rest/?api_key=`
const flickrUrlParameters = String.raw`&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5`
let keyTermsToSearch = "sunset"

// var p1 = new Promise((resolve, reject) => {
//     resolve('Success!');
//     // or
//     // reject(new Error("Error!"));
//   });
  
//   p1.then(value => {
//     console.log(value); // Success!
//   }, reason => {
//     console.error(reason); // Error!
//   });
  

let userPosition = Promise.resolve (navigator.geolocation.getCurrentPosition( function(position) {
        //when allowed, assign position based off actual location
        userPosition = {
            lattitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
    }, function() {
        //if the user declines to allow the site to know location, set default location to Tokyo, Japan.
        userPosition = {
            lattitude: 35.6762,
            longitude: 139.6503
        }
    }))

userPosition.then( function(latitude, longitude) {
    fetch(`${baseUrl}${myAPIkey}${flickrUrlParameters}&lat=${userPosition[latitude]}&lon=${userPosition[longitude]}&text=${keyTermsToSearch}`) 
     .then(responseObject => responseObject.json())
     .then(hydratedBody => {
         imageUrl = constructImageURL(hydratedBody)
     })
    })


userPosition.then ( function(imageUrl) {
    newDiv = document.createElement('img')
    newDiv.src = imageUrl;
    document.body.appendChild(newDiv)
})



function constructImageURL (photoObj) {
    return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}

