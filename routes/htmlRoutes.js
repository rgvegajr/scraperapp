const axios = require("axios");
const cheerio = require("cheerio");

var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        db.Article.find().then(function(allArticles) {
            let articles = [];
            for (let i = 0; i < allArticles.length; i++) {
                articles.push(allArticles[i])
            };
            res.render('index', { articles: articles });
        });

        // }

        //     {}).then(function(articles) {
        //     res.render("index", {
        //         title: articles.title,
        //         link: articles.link
        //     });
    });

    // Load saved articles page
    app.get("/saved", function(req, res) {
        db.Article.find().then(function(allArticles) {
            let articles = [];
            for (let i = 0; i < allArticles.length; i++) {
                articles.push(allArticles[i])
            };
            res.render('saved', { articles: articles });
        });

        // }

        //     {}).then(function(articles) {
        //     res.render("index", {
        //         title: articles.title,
        //         link: articles.link
        //     });
    });
    // A GET route for scraping the echoJS website
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with axios
        // axios.get("http://www.echojs.com/").then(function(response) {
        axios.get("https://www.wsj.com/").then(function(response) {
            console.log("Number of articles returned: ");
            console.log("1");


            // Then, we load that into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(response.data);
            console.log("2");
            // console.log(Object.keys(response.data).length);
            console.log("3");
            //empty the database
            db.Article.deleteMany({}, function(err) {});
            console.log("4");

            // Now, we grab every title within an article tag, and do the following:
            $("article").each(function(i, element) {
                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .children()
                    .text();
                result.link = $(this)
                    .find("a")
                    .attr("href");

                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function(dbArticle) {
                        // View the added result in the console
                        // console.log(dbArticle);
                    })
                    .catch(function(err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });

            // Send a message to the client
            // res.send("Scrape Complete");
            res.redirect("/");
        });
    });

    // Route for getting all Articles from the db
    app.get("/articles", function(req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
            .then(function(dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function(req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("note")
            .then(function(dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for getting all Articles from the db
    app.get("/clear", function(req, res) {
        //empty the database
        db.Article.deleteMany({ saved: false }, function(err) {})
            .then(function(dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.redirect("/");
                // res.json(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });








};