document.querySelector(".get-jokes").addEventListener("click", getJokes);

function getJokes(e) {
  // After click event get the input value for number of jokes
  const number = document.querySelector('input[type="number"]').value;

  // AJAX Request/Create Object
  const xhr = new XMLHttpRequest();

  // What we want to open/api source
  // Instead of using a hard coded number like this first xhr.open use template literal to use our input value
  // xhr.open('http://api.icndb.com/jokes/random/<number>')
  xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true);

  //   What we want to do with the API data
  xhr.onload = function () {
    // Check Status
    if (this.status == 200) {
      // Take JSON string and turn it into a JS object we can do things to like loop through
      const response = JSON.parse(this.responseText);

      let output = "";

      if (response.type === "success") {
        response.value.forEach(function (joke) {
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        output += "<li>Something went wrong</li>";
      }

      //   Append joke to HTM;
      document.querySelector(".jokes").innerHTML = output;
    }
  };

  xhr.send();

  e.preventDefault();
}
