// I COULDN'T GET AROUND MAKING THE FUNCTION OF THE BUTTONS TO APPEAR.
// I UNDERSTAND I NEED TO MAKE AN ARRAY OF ALL THE BUTTONS DEFINED BY ME
// I ALSO UNDERSTAND THAT I NEED TO CREATE A RENDER BUTTONS FUNCTION SO THAT THE BUTTONS ACTUALLY SHOW WHEN CREATED

// Creating a function for when any button is clicked
$("button").on("click", function () {

            var nature = $(this).attr("data-nature");

            console.log(nature);

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                nature + "36zGWeBOAa33sjkBSvVYlOQbUXuU3qrI";

            console.log(queryURL);

// Calling API
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var results = response.data;
// Looping through and if the results are pg-13 and less, then return gif results to page
                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var gifDiv = $("<div class='item'>");
                        var rating = results[i].rating;
                        var displayRating = $("<p>").text("Rating: " + rating);
                        var natureImage = $("<img>");
                        natureImage.attr("src", results[i].images.fixed_height.url);
// appending to html and then adding all gifs to "gifs" id div
                        gifDiv.append(displayRating);
                        gifDiv.append(natureImage);
                        $("#gifs").prepend(gifDiv);
                    };
                };
            });
        });

// Creating function to play and pause GIFs
$(document).on("click", ".playOnClick", function () {

    var state = $(this).attr('data-state')

    console.log(state);

// if state of gif is still, then set to animate
    if (state === "still") {
        $(this).attr('src', $(this).attr("data-animated"));

        $(this).attr("data-state", "animate")
// if state is paused, then set to still
    } else {
        $(this).attr('src', $(this).attr("data-paused"));
        $(this).attr("data-state", "still")
    };
