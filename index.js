'use strict';

const apiKey = 'ZNYoYacMbpemidFbebDE7svfp2rIHbU7qqGpMGRg';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length & i<maxResults ; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].url}">${responseJson[i].title}</a></h3>
      <p>${responseJson[i].description}</p>
       <p>By ${responseJson[i].body}</p>
       </li>`
     )};  
   $('#results').removeClass('hidden');
 };

// function displayResults(responseJson) {
//     console.log(responseJson);
//     $('#results-list').empty();
//    // for (let i = 0; i < responseJson.length; i++) {
//         $('#results-list').html(
//             `<li><h3>${responseJson[i].data.fullName}</h3>`
//             `<li><p>${responseJson[i]}</h3></li>`
//         )
//    // }
//     $('#results').removeClass('hidden');
// }

function getParks(query) {
  const params = {
    // parkCode: [],
    // stateCode: [],
    // limit: '',
    // start: '',
    q: query,
    // sort: [],
    // pageSize: maxResults
  };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?api_key=' + apiKey + '&' + queryString;
    //const url = `https://developer.nps.gov/api/v1/alerts?parkCode=acad,dena&api_key=ZNYoYacMbpemidFbebDE7svfp2rIHbU7qqGpMGRg`
    //const url = `https://developer.nps.gov/api/v1/parks?api_key=ZNYoYacMbpemidFbebDE7svfp2rIHbU7qqGpMGRg`
    // console.log(url);
    // fetcher(url) {
    //     .then(response => response.json())
    //     .then(responseJson => {
    //         console.log(responseJson);
    //         displayResults(responseJson);
    //     });
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm);
  });
}

$(watchForm);