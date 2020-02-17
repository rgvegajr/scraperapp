// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].summary + "<br />" + data[i].link + "</p>");
    }
});


//when "add note" button clicked
$(document).on("click", "#addNote", function() {
    // alert("adding note!");
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        // With that done, add the note information to the page
        .then(function(data) {
            console.log(data);
            //REPLACE with modal activated form for submission and display of note
            // // The title of the article
            $("#notes").append("<div class='col-md-12'>");
            $("#notes").append("<div class='card-body'>");
            $("#notes").append("<h4>Add note to article:</h4>");
            $("#notes").append("<p class='card-title text-truncate'<em>" + data.headline + "</em></p>");
            // An input to enter a new title
            $("#notes").append("<p class='card-text'><input id='titleinput' name='title' placeholder='Enter title'></p>");
            // A textarea to add a new note body
            $("#notes").append("<p class='card-text'><textarea id='bodyinput' name='body' placeholder='Enter text'></textarea></p>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<p class='card-text'><button data-id='" + data._id + "' class='btn btn-sm btn-success' id='saveNote'>Save Note</button></p>");
            $("#notes").append("</div>");
            $("#notes").append("</div>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click the savenote button
$(document).on("click", "#saveNote", function() {
    console.log("FE save note btn clicked");
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId + "/notes",
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        // With that done
        .then(function(data) {
            // Log the response
            console.log(data);
            alert("Note saved!");
            // Empty the notes section
            $("#notes").empty();
        });
});

// When you click the save article button add to saved articles list
$(document).on("click", "#saveArticle", function() {
    console.log("FE save article btn clicked");
    console.log($(this).attr("data-id"));
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                saved: true
                // // Value taken from title input
                // title: $("#titleinput").val(),
                // // Value taken from note textarea
                // body: $("#bodyinput").val()
            }
        })
        // With that done
        .then(function(data) {
            // Log the response
            console.log(data);
            alert("Article saved!");
            // // Empty the notes section
            // $("#notes").empty();
        });

    // // Also, remove the values entered in the input and textarea for note entry
    // $("#titleinput").val("");
    // $("#bodyinput").val("");
});

// When you click the clear articles button add to saved articles list
$(document).on("click", "#clearArticles", function() {
    console.log($(this).attr("data-id"));
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                saved: true
                // // Value taken from title input
                // title: $("#titleinput").val(),
                // // Value taken from note textarea
                // body: $("#bodyinput").val()
            }
        })
        // With that done
        .then(function(data) {
            // Log the response
            console.log(data);
            alert("article saved!");
            // // Empty the notes section
            // $("#notes").empty();
        });

    // // Also, remove the values entered in the input and textarea for note entry
    // $("#titleinput").val("");
    // $("#bodyinput").val("");
});
