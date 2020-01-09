


function watchForm (){
    $("form").submit (event => {
        event.preventDefault();
        const search = $("#search").val();
        const quantity = $("#quantity").val();
        console.log(search);
        console.log(quantity);
})
}
    

$(watchForm);