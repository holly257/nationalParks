'use strict';

const apiKey = "iKbOKYcWmcGn6Kw5VkZnsqFby54WGsrnvDs0Qefu"
const endPoint = "https://developer.nps.gov/api/v1/parks"

function formatParams(params) {
    const quertyItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return quertyItems.join("&")
}


function getResults(search, maxResults) {
    console.log(search, maxResults);
    const params = {
        api_key : apiKey,
        stateCode : search,
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
        const statesList = $("#search").val().replace(/ /g, "");
        const quantity = $("#quantity").val();
        getResults(statesList, quantity);
});
}
  

$(watchForm);