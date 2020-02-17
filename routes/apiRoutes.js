var db = require("../models");

module.exports = function(app) {

    app.post("/articles/:id", function(req, res) {
        console.log("save article BE route");
        console.log(req.params.id);
        // save an article by setting saved: true
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
            .then(function(dbArticle) {
                // If we were able to successfully save an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id/notes", function(req, res) {
        console.log("save note BE route");
        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body)
            .then(function(dbNote) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function(dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.redirect("/");
                res.json(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });

    });


};
