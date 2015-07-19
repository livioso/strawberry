
# Introduction

## What's the point?

**Strawberry** is a collaborative shopping list. Strawberry aims to simplify doing groceries in households with more than one person by offering a simple shared shopping lists.

## What are the features?

**Strawberry** has the following features:

+ **Shared lists** with as many users as you wish. You can simply invite everyone with a Strawberry account to take part in your list. Each user can many have as many seperate lists with different people as he wants. For example: *"me and girlfriend", "me and family" or "me and my flatmates".* Of course it is also possible to have a private list just for yourself.

+ **Simple item-based lists** simply add items and remove them by checking them off the list. You can add a short note to each item seperately. For example if you want to have a certain brand of chocolate.

+ **[Twitter Style Typeahead](https://twitter.github.io/typeahead.js/)** with common shopping items. Such as "Apples", "Bananas" or "Strawberries" in item input field. 

+ **Sign in via Facebook.**

# Requirements

## Usecase Overview

![Strawberry](figures/Usecases.pdf)

### Usecase: Login with username and password

Use Case				| Login with username and password
--------------------|--------------
**Description** 		| Allows user to login with his username + password
**Actors**	   		| User
**Preconditions**	| Not logged in (see `/loggedin` response)
**Basic Flow**		| User fills in username + password, clicks login
**Alt. Flow**			| None
**Postconditions**	| *User is logged in (has session token)*
**Notes**				| -

### Usecase: Logout

Use Case				| Logout
--------------------|--------------
**Description** 		| Logout user from running logged in session.
**Actors**	   		| User
**Preconditions**	| Logged in (see `/loggedin` response)
**Basic Flow**		| User clicks logout button.
**Alt. Flow**			| User enters URL `/logout`
**Postconditions**	| *User is logged out (has session token revoked)*
**Notes**				| -

\pagebreak

### Usecase: Display recent changes to shopping lists

Use Case				| Display recent changes to shopping lists
--------------------|--------------
**Description** 		| Shows a history of recent changes.
**Actors**	   		| User
**Preconditions**	| Logged in (see `/loggedin` response)
**Basic Flow**		| User pressed the `bell-icon` in the top right. 
**Alt. Flow**			| None.
**Postconditions**	| List is shown.
**Notes**				| -

### Usecase: Add user to existing shopping list

Use Case				| Add user to existing shopping list
--------------------|--------------
**Description** 		| User can invite others to existing shopping lists.
**Actors**	   		| User
**Preconditions**	| Logged in (see `/loggedin` response), list exists.
**Basic Flow**		| User searches / enters usernames and presses add. 
**Alt. Flow**			| None.
**Postconditions**	| User has been added to the list as collaborator.
**Notes**				| -

\pagebreak

### Usecase: Remove item to shopping lists
see *Usecase: Add item to shopping lists*. Same as this but instead of adding item will be removed.

### Usecase: Create new shopping lists

Use Case				| Create new shopping lists 
--------------------|--------------
**Description** 		| Creates a new empty shopping list.
**Actors**	   		| User
**Preconditions**	| Logged in (see `/loggedin` response)
**Basic Flow**		| User enters the name of the new list and clicks add.
**Alt. Flow**			| None.
**Postconditions**	| A new empty shopping list has been created.
**Notes**				| -  
