-- How to use.

Just open index.html in a desktop web browser. This website has been developed and tested only in Google Chrome Version 71.0.3578.98 in Mac,
but it should work fine in all modern browsers.

Index.html and assets have do be in the same folder level because index.html will load the resources from assets.

-- Development.

This heat map has been developed using web technologies, specifically HTML5, CSS3 and JS.

 - HTML :

This document uses valid semantic HTML5 - It has been validated using the official W3C validator : https://validator.w3.org/nu/#textarea

- CSS :

All the CSS has been written in SASS files and compiled using Gulp. 
You can find all the Sass files to check the CSS code in assets/css.

- JS :

This website contains three JS files : data.js, heatClass.js and logic.js. 
Data.js just contains an array of data which is used to print the initial items in the canvas panel. 
HeatClass.js contains a JS object which handles all the painting methods in the canvas element.
Logic.js contains all the JS code for this application to work. Among other functions, it initialises 
the the canvas element and paints all the default heat points. It also initialises the events listeners 
for mouse and keyboard input.

The code in heatClass.js has been written using ES5 whilst logic.js uses ES6. Both works in modern browsers.

-- Animations :

No framework or CSS external libraries have been used for animations in this website. 
Button animations are done with CSS. This has performance advantages over animations done just with JS or jQuery. 
The heat map uses a canvas element, which is a new addition in HTML5. That means the animation of painting  happens natively in the 
browser. JS is used to indicate in which coordinates of the canvas element the browser needs to paint, among 
other parameters like the colour to use and the radio of each point painted.

-- Design :

Due to the nature of the app, a minimalistic approach has been taken when designing the UI. 
Most of the space is used by the canvas element, which is the main feature. Buttons have a smooth 
animation when the user interacts with them. Light blue color has been used by default for all buttons 
for background and plain white for text. Hover and active status used Light Red. The font used is "Quicksand" 
and it is loaded dynamically from Google Fonts. If the fonts fails to be loaded, sans-serif is used as a fallback.

-- Unity :

My idea was to create the heat map in the web as it is, then move it to a live url in GitHub ( it is free if no server side code is used )
 and from Unity use the URL to load the website in unity and re-use exactly the same code in both. I read somewhere that this is possible,
and effectible it is, but the only way to do it is using an external paid add-on from the assets store that enables Unity to accept HTTP 
requests and display the response as modern browsers do. So no Unity version of the heat map has been developed for this task, however
considering that Unity also uses canvas elements in the UI and the fact that JS can draw in canvas, I am pretty sure the same logic can be 
used to develop something similar in Unity using C#.

-- Extendibility :

For the sake of simplicity and because of time constraints, this heat map contains only simple functionality and animations, but in order 
to improve the existing software, in new iterations we could have :

    1. Reduce number of requests by compressing CSS and JS files to improve performance.
    2. Cache the font from Google Fonts to avoid external request and to allow the font to be loaded even in offline environments.
    3. Add numbers indicators to + / -  buttons. As it is the user does not know when the limit of heat has been reached.
    4. Switch on / off heat map animations.
    5. Make the site responsive to adapt the layout to all devices and screen sizes. 

-- Important notes :

Tested in modern browsers in an 22" screen in desktop in Mac. To see all the keyboard animations in smaller screens you might need to scroll 
down. This site is not responsive so it might not work as expected in mobile phones or in very low screens. An screenshot has been included 
in this folder to show how the app should look when opened in a web browser. If is not the case or it this app does not work, please 
contact me@davidguerreiro

