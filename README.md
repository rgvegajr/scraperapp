### (Note: this file is mark-down formatted to be read in a code-editor "preview" function or on github)
## Welcome to the readme file for my WSJ News Scraper app!  

This application is deployed on heroku at:

* https://scraper-application.herokuapp.com/

The github repository ca be found at: 

* https://github.com/rgvegajr/scraperapp

## Background/Purpose:

This web application is intended to demonstrate a web-page "scraper" application.  The functional purpose of this application is to allow a user to collect ("scrape") and titles and links to current articles from the Wall Street Journal.  The user can click the article link to open a new browser tab at the article's URL.  The user can also "save" and article and add a note to any article.  Saved articles can be viewed in a separate saved article page.  The user can clear unsaved articles and can also re-scrape for a new set of articles. 

## Technologies used:

This application uses the following technologies:
1. backend:  nodejs server,  mongoDB database
2. front-end: html5, Bootstrap 4 css, and jquery.
3. NPM libraries:  express, express-handlebars, mongoose, axios and cherrio. 
4. The optional npm package nodemon was used to allow for more-efficient development.   

## My role:  

I am the app developer.  I used MS Visual Studio Code as my integrated development environment and Github for repository and version control.  Bootcamp instructors provided guidelines, instructions and requirements for this app.  The application is deployed and hosted on Heroku.

## App Organization:

The code is organized using a model-view-controller(routes) structure.

## Instructions (These instructions assume user is familiar with GITHUB and node js and has installed node.js on a PC/Mac.):

1.  Access the web-application via the url provided above.
2.  From the home page, view any previously scraped articles or click the "scrape new articles" to get the latest articles. 
3.  If desired, save one or more articles using the "save article" buttons.
4.  If desired, click "add/update note" open a form at the top of the artile list that allows you to enter a note title and text or edit/update a note that has been saved before.
5.  If desired, use the "saved articles" or "clear unsaved articles" buttons to view a new page with only the saved articles displayed or clear non-saved articles from the home page, respectively. 

