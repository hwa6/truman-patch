## Spring 2022 Semester Patch

# Description

I was tasked with bridging the gap between several independent branches of the Truman platform. The targeted repositories were:

https://github.com/kgoebel124/trumancopy -- Admin Project \
https://github.com/RyanSchmidLehigh/Truman -- Hashtag+User Projects \
https://github.com/jfeng2542/Truman -- HashTag+User Extension Project

# Results

The Admin project was succesfully merged with the Hashtag+User project. The extension project made changes that broke the admin capability, and was not implemented.

# Future Developers

The Admin project used an outdated image set to display its icons. This needs to be fixed. The extension project makes distinct changes to the overall script and comments out seemingly crucial segments of code. I would start there.

# Truman Platform

The Truman Platform is a fake social network for real results. This fake social network application allows researchers to create interesting and believable scenarios in a social network environment. Since the interactions that take place in a social setting and influence the outcome of an experiment, all content, users, interactions and notifications are “fake” and created by a set of digital actors. Each participant sees the same interactions and conversations, believe these to be unique to them.

This allows any experiment to be completely replicated, and the tools can be repurposed for other studies.

This current iteration is testing the bystander effect on cyberbullying. Future studies could be done on a number of other topics and issues.

This project and software development was supported by the National Science Foundation through IIS-1405634. Special thanks to everyone at Cornell Social Media Lab in the Department of Communication.

Also special thanks to Sahat Yalkabov and his [Hackathon Starter](https://github.com/sahat/hackathon-starter) project, which provided the basic organization for this project.

## Summer 2020 Progress

# Admin Features Added

Time editing: time can now be editing, when in editing mode displays in the form days:hours:minutes

Creating new post: Admins can create new actor posts directly through the site, similar to how users can upload their own posts

Deleting posts: Admins can delete actor posts, must confirm deletion before post will be deleted

Accessing classes: study.json contains study info, including classes and experiment groups of posts and actors, this file should be used to store study variables rather than hard coding them, also has variable descriptions

Actor page: new page at '/actors' that lists all actors in study, currently can create new actors and delete actors using this page

More details on these features are given in the final report. Location of code changes described below.

# Changes made 7/1/2020 (time editing)

In admin.js:

- lines 35-39 converts time to ms and saves it
- line 119, fixed for loop so all comments are reached and get saved
- lines 128-133, saves like and time changes to comments

In main.js:

- lines 193-203, fxn that changes text to d:h:m for all admintime
- in save fxn (starts line 247), get time from card, include likes and time in the commentsArray, include post time in first $.post, if statement on second $.post checking for comments
- in admin edit mode fxn (starts line 293), get admin and normal times for posts and comments, two while loops at end of if(editable) and else to change times between .time and .admintime and turn on/off contenteditable for posts and comments, replaces old code at end of fxn that turned this on/off for post times

In script.pug:

- added hidden attribute hiddentime on line 165 to pass on the post time value
- added hidden attribute hiddendate on line 267 to pass on the comment time value

# Changes made 7/22 (creating posts, deleting posts, accessing classes)

In app.js:

- include study.json
- create multer object for admin creation of new actor post
- included new admin post path in list of paths that nust wait for csrf to be checked
- attach study.json to app object
- created new post routes for admin creating and deleting posts

In controllers/admin.js:

- included experiment group and class in findOneAndUpdate
- created exports.newPostAdmin to save new posts to the database
- created exports.deletePostAdmin to remove posts from the database

In controllers/script.js:

- include study.json when rendering the script so exp and class variables can be accessed

In main.js:

- created a new modal "adminpost" that appears on when clicked and has a form validator and submits
- picture functions for admin post, nearly identical to normal picture functions
- in admin mode toggle, hide/show the delete button, actor/exp group/class dropdown menus

In script.pug:

- input button for new admin post
- changed the actor icons on post, dropdown has display: none, normal display is default
- exp group and class drop down menus, start as display: none
- added extra label to the comment text so the text in the dropdowns doesn't also become editable in admin mode
- admin create post modal
- admin delete post modal

Made new file study.json that has study info

# Changes made 7/31: (actor page)

In app.js:

- multer object for actor profile pictures
- created a new route for adding and deleting actors

In admin controller:

- included study.json
- getActors which gets all actors in the study and renders the actors page
- newActor creates a new actor object and saves it to the database
- deleteActor finds an actor by usernames and removes them from the database

In main.js:

- added functions for create new actor modal
- added functions for delete actor buttons and modal

In study.json:

- added actor classes

Created admin_actors.pug, which displays all the actors in the study similar to how posts are displayed in the feed. Currently, actors can be created and deleted using this page

In script.pug:

- wording changes on comfirm delete modal
