# Starter pack for basic Frontend development based on Gulp.js

Install node modules with `npm install`.

## Images
All images in src/images will be moved to dist/images. If ```npm run prod``` is ran images will also be optimized. 

## Javascript Files
The src/js/app.js is the main file in this app. For modularity you can organize smaller chunks of code in different folders and import them into app.js. To include this into you HTML file you should add js/app.min.js at the bottom of your page. This file will be minified and transpiled to ES5.

## SCSS - CSS files
The src/scss/style.scss is the main stylesheet of the app. For modularity you can organize your files in partials and import them into style.scss. To add styles into your HTML you should include link to css/style.css inside of your head.

## Using npm packages
Importing packages is being done by webpack. After installing a package you can include its CSS or JS file inside of app.js. 
Examples: 
```import 'bootstrap/dist/css/bootstrap.css';```
```import 'bootstrap/scss/bootstrap.scss';```
```import 'bootstrap/dist/js/bootstrap';```

CSS and SCSS files must have extension added, while it's optional for JavaScript files.

To use jQuery you need to add this import to the top of the module that is using jQuery
```import $ from 'jquery'```

## Live reload
Open root folder in terminal and run `npm run dev` to start watching over changes in your project. This will start server with live reload and open it in you default browser. If port 3000 is not taken you will get a message in terminal:

    Local: http://localhost:3000
    External: http://192.168.0.12:3000
    -------------------------------------
    UI: http://localhost:3001
    UI External: http://localhost:3001 

which mean that you can test your project on other devices connected to the same network by using the external link(e.g. If your laptop is connected to same wifi as your mobile phone you can access to your project on mobile by going to http://192.168.0.12:3000).

## Building for production
Build command is added but it doesn't provide more than just watch. Idea is to put only the most necessary tasks on watch and to make it faster and easier to debug and to do full optimization with `npm run build`.