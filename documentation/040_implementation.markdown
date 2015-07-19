
# Implementation

## Final vs Mockup

- Login and Landing Page are very similar to original Mockups.
- Settings is now separate per list (the green edit button).
- Instead of just names we have profile pictures.

### Main Page

![main](figures/final/Overview.png)

### Main Page - Typeahead

![main](figures/final/Typeahead.png)

### Settings

![main](figures/final/Settings.png)

### Create

![main](figures/final/Create.png)


## API

- **Incomplete list of possible API calls.**
- **For more information please check out [routes.js](https://github.com/livioso/strawberry/blob/master/app/routes.js).**

### PUT `/api/list`

- Can be executed by authenticated user.
- Parameter with MIME-Type `application/json`.

Example Parameter:

```json 
{
	"name": "My new cool list"
}
```

### GET `/api/list`

- Can be executed by authenticated user.
- Returns all the users lists.


### POST `/api/list/:idlist`

- Can be executed by authenticated user.
- Update name of existing list.
- and/or members of existing list.
- and/or items of existing list (with `:listid`).
- Parameter with MIME-Type `application/json`.

Example Parameter:

```json 
{
	"name": "My new cool list name",
	"members": ["0193472304", "0564667234"],
	"items": [{"_id": "09293932", "checked": true}]
}
```

### GET `/api/list/:idlist`

- Can be executed by authenticated user.
- Returns all items of given list.

### DELETE `/api/list/:idlist`

- Can be executed by authenticated user.
- Deletes the list permanently.

### GET `/api/user`

- Can be executed by authenticated user.
- Gets information about the logged in user.

### POST `/login`

- Simple login with username + password.
- Or Facebook (see `/auth/facebook`).

### POST `/logout`

- Can be executed by authenticated user.
- Logs the currently signed in user out.

### GET `/auth/facebook`

- Sign in via Facebook.
- Redirects to Facebook and tries to authenticate user.
- Facebook redirects back to `/auth/facebook/callback` with success / failure message.

### GET `api/category`

- Can be executed by authenticated user.
- Returns an array of products that are used for autocompletion / typeahead.


## Technologies

### Server Side

- [Node.js](https://nodejs.org/) Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.

- [Express.js](expressjs.com) Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's responsible for the API routing e.g. `/api/list/id`.

- [Passport.js](passportjs.org) Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more. Strawberry uses the username and password as well as the Facebook Strategy.

- [MongoDB](mongodb.org) MongoDB is a document-oriented database. Classified as a NoSQL database, MongoDB eschews the traditional table-based relational database structure in favor of JSON-like documents with dynamic schemas, making the integration of data in certain types of applications easier and faster. 

### Client Side

- [AngularJS](angularjs.org) AngularJS is a web application framework maintained by Google and by a community of individual developers and corporations to address many of the challenges encountered in developing single-page applications. It aims to simplify both the development and the testing of such applications by providing a framework for client-side model–view–controller (MVC) and model-view-viewmodel (MVVM) architectures, along with components commonly used in rich Internet applications.

- [Bootstrap](http://getbootstrap.com/) Bootstrap is a sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development.

- [Flat UI](https://designmodo.github.io/Flat-UI/) is a Bootstrap Framework design and theme for flat UIs.

- [Typeahead.js](https://twitter.github.io/typeahead.js/) a flexible JavaScript library that provides a strong foundation for building robust typeaheads / auto completion. Used for the product autocompletion with a preset of over 200 commonly used [products](https://github.com/livioso/strawberry/blob/master/app/data/presets.js).

### Development Tools

- [Bower](http://bower.io/) A package manager for the web. Responsible for installation of the front end frameworks (such as Bootstrap, Flat UI Kit, etc.) *See [**bower.json**](https://github.com/livioso/strawberry/blob/master/bower.json) for a complete list of used client side packages.*

- [npm](npmjs.com) node package manager. Installs, publishes and manages node programs. *See [**package.json**](https://github.com/livioso/strawberry/blob/master/package.json) for a complete list of used packages for node.*

- [Gulp](http://gulpjs.com) Gulp is a build automation system. Automates tasks such as building and deploying etc. *See [**gulpfile.js**](https://github.com/livioso/strawberry/blob/master/gulpfile.js) for more.*

- [Jasmine](https://github.com/jasmine/jasmine) Jasmine is a Behavior Driven Development testing framework for JavaScript. *For more check out the Strawberry [**unit tests**](https://github.com/livioso/strawberry/tree/master/tests).*

- [TravisCI](https://travis-ci.org/livioso/strawberry) Continuous Integration Service. If all tests pass, commits to GitHub will be automatically deployed on [Heroku](https://heroku.com/).

- [Jshint](http://jshint.com/) Linter for JavaScript. Helps to detect errors and potential problems in code. *See [**.jshintrc**](https://github.com/livioso/strawberry/blob/master/.jshintrc) for the detailed configuration of Jshint. Commits that violate Jshint will be rejected automatically. [(see git pre commit hook)](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)*

- [JSCS](http://jscs.info/) JSCS is a code style linter for programmatically enforcing your style guide. *See [**.jscsrc**](https://github.com/livioso/strawberry/blob/master/.jscsrc) for the detailed configuration of JSCS. Commits that violate this style guide will be rejected automatically [(see git pre commit hook)](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)*


### Authentication 

**Sign in with Facebook**

While there is a simple login for some (dedicated) user, the main authentication method is via Facebook using [Passport.js Facebook authentication strategy](https://github.com/jaredhanson/passport-facebook).

Strawberry only uses the most basic information provided by Facebook:

- Given and family name
- Facebook Profile ID (to get a profile picture via [Graph API](https://developers.facebook.com/docs/graph-api/reference/user/picture/)).

![Auth](figures/final/Authentification.png)

### Important Files & Folders

In order the understand the project it is highly advisable to browse [its source code on Github](https://github.com/livioso/strawberry). The following incomplete list of files is a good starting point though:

- **[server.js:](https://github.com/livioso/strawberry/blob/master/server.js)** General server setup and configuration.
- **[app/routes.js:](https://github.com/livioso/strawberry/blob/master/app/routes.js)** Handles API requests / routes.
- **[app/models/:](https://github.com/livioso/strawberry/tree/master/app/models)** Contains the Models.
- **[public/html/views/:](https://github.com/livioso/strawberry/tree/master/public/views)** Contains the Views.
- **[public/js/controllers/:](https://github.com/livioso/strawberry/tree/master/public/js/controllers)** Contains the Controllers.
- **[public/js/services/](https://github.com/livioso/strawberry/tree/master/public/js/services)** Contains Services used by Controllers.
- **[tests/:](https://github.com/livioso/strawberry/tree/master/tests)** Contains the Unit Tests.
- **[config/:](https://github.com/livioso/strawberry/tree/master/config)** Contains database and authentication configuration.

### Installation

- **Please see the project [Readme on Github](https://github.com/livioso/strawberry/blob/master/README.md#initial-installation) for a detailed installation guide.**
- Installation: `npm install && bower install && gulp build`
- Start Server: `npm start`

## Next Steps

- Replace Flat UI with [Angular Material](https://material.angularjs.org/latest/#/) (improve responsiveness of application).
- Refactor [shoppingListController.js](https://github.com/livioso/strawberry/blob/master/public/js/controllers/shoppingListController.js). This controller has way too many responsibilities. Violates [SRP](https://en.wikipedia.org/wiki/Single_responsibility_principle).
