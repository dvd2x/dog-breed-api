"use strict";

function getDogImage(query, callback) {
  const options = { method: "GET" };
  fetch(`https://dog.ceo/api/breed/${query}/images/random`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error(
          "<li>Either that breed is not in our database our you just made up a new dog! !!!</li>"
        );
      } else {
        throw new Error("<li>Something went wrong try again later.</li>");
      }
    })
    .then(message => callback(message))
    .catch(error => $(".results").html(error.message));
}

function displayResultsData(data) {
  console.dir(data.message);
  $(".results")
    .html(`<li><img src="${data.message}" class="results-img"/></li>`)
    .removeClass("hidden");
}

function breedWatchForm() {
  $("form").submit(event => {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find(".js-query-breed");
    let breedOfDog = queryTarget.val();
    getDogImage(breedOfDog, displayResultsData);
  });
}

$(function() {
  console.log("App loaded! Waiting for submit!");
  breedWatchForm();
});

//$(breedWatchForm);
