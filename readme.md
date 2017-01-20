# YearEndTopTen

Deployed App:
<br>
Trello Board:

## Technologies
* Languages: Javascript, HTML5, CSS3
* Frameworks: Node.js, Express.js, Passport.js, Bootstrap.css
* Database: MongoDB (via Mongoose as the ODM)
* Agile Tools: Trello
* Text Editor: VSCode

## Mission Statement
YET10 is an app that allows users to reflect on the past year by cataloging lists of favorite things like movies or albums of that year.

## Features
* Users can create, read, update, and delete lists via a full RESTful API which persists on a Mongo Database.
* Users can signup, login, and view their secure, authorized lists. They can also log out.
* Flash messages reveal errors to users if they offer invalid data during signup and login.


## Build Process

### Planning
I did the lionshare of the planning by crafting thoughtful user stories and white-boarding layouts for all my RESTful route endpoints.

### Production Issues
My biggest build issue was trying to get my final REST endpoint of update to work. 

My mongoose model for a list included a userID reference, a title, a description, then items, which is an array of strings.

I came upon the problem doing individual testing of editing the field. I could edit title, I could edit description, but when I tried to edit one of the list items, it returned the same array as before. I could even edit the title and a list item and it would change the title but not the item.

I went into debug mode and threw console logs everywhere. I checked my requests and responses on the server and client sides. The array was definitely being passed to the server with the changes, but when it came back, the server returned the original array. 

After hours of googling and pouring over mongoose's docs, I found the mongoose method:

list.markModified('item');

It turns out Mongoose doesn't do complex diffing on non-primitive data types unless you tell it to via a .markModified method.

While this was a very annoying issue, I came out of it with a greater understanding of how ODMs function.

### Future Features
* A button to share your list on social media
* Ability to comment on other users' lists ( this is on the way )
* A websocket stream of new lists being created in the dashboard
* Add interactivity to the UI via a clientside javascript framework

## Takeaways
This project drilled into me the nature of the request response cycle of HTTP. At the end I felt like I truly grokked the idea of Representational State Transfer, aka REST and it's importance to the web as we know it.

 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
I hope you enjoy this website!

        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||