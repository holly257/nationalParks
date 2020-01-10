'use strict';
const allStates = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

const apiKey = "iKbOKYcWmcGn6Kw5VkZnsqFby54WGsrnvDs0Qefu"
const endPoint = "https://developer.nps.gov/api/v1/parks"
let quantity = 10;

var statesArr; 
function validStates(statesList){
  if(statesList.length < 1){
    displayError("Comma delimited state list malformed. Example: AL, GA");
    return false;
  }
  statesList = statesList.replace(/ /g, "").toUpperCase();
  statesArr = statesList.split(","); 
  
  statesArr.forEach(st => {
    if(st.length != 2){
      displayError(st + " is not a valid state code.  Example: AL"); 
      return false; 
    }
    if(allStates.indexOf(st) == -1){
      displayError(st + " is not a valid state code.  Example: GA")
    }
  }); 
  return true;
}

function formatParams(params) {
    const quertyItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return quertyItems.join("&")
}


function getResults(statesList, maxResults) {
    console.log(statesList, maxResults);
    const params = {
        api_key : apiKey,
        stateCode : statesArr.join(","),
        limit : maxResults
    };

    const queryString = formatParams(params)
    const url = endPoint + "?" + queryString;

    fetch(url)
    .then(response => {
        if(response.ok) {
            return response.json()
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        displayError(`Sorry, something went wrong: ${err.message}`);
    });
}

function displayResults(json) {
    console.log(json)
    $("#results-list").empty();
    for (let i=0; i<json.data.length; i++){
        $("#results-list").append(
        `<li><h3>${json.data[i].fullName}</h3>
        <p>${json.data[i].description}</p>
        <a href="${json.data[i].url}">${json.data[i].url}</a></li>`
    )};
    $("#results").removeClass('hidden');
}

function displayError(err){
    console.log(err);
    $("#js-error-message").text(err);
}

function watchForm (){
    $("form").submit (event => {
        event.preventDefault();
        const statesList = $("#search").val();
        quantity = $("#quantity").val();
        getResults(statesList, quantity);
})
}


    

$(watchForm);