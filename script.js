
const apiKey = "iKbOKYcWmcGn6Kw5VkZnsqFby54WGsrnvDs0Qefu"
const url = "https://developer.nps.gov/api/v1"

function formatParams () {

}


function getResults(query, maxResults) {
    
    console.log(query, maxResults);


}

function displayResults() {

}

function watchForm (){
    $("form").submit (event => {
        event.preventDefault();
        const search = $("#search").val();
        const quantity = $("#quantity").val();
        getResults(search, quantity);
})
}
    

$(watchForm);