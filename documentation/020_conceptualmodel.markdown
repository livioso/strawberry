
# Conceptual Data Model

## Overview

![ERD](figures/ERD.pdf)

### Entity: User
A user of the system *(as in member of (many | one) shopping lists)*.

### Entity: Shoppinglist
Set of items for one or several users. The list has **Notifications** about the latest changes so all members can see the latests changes to the list.

### Entity: Item
An item is defined as following: A `description` such as *Strawberry*, a `quantity` for example *some*, *one* or *many* and a `bought ✓` checkmark which indicates an item that has been ticked of the the list *(thus no longer is required to be bought).*

## Operations

Actor			| Operation			| Arguments | Result
-------------	|-------------------|-----------|-------
User 			| Add item to list	| `item`    | `success` or `fail`
User 			| Tick item on list | `item` | Changes `bought ✓` to `true`
User 			| Add user to list | `user` | `success` or `fail`
User			| Remove user from list | `user` | `success` or `fail`
User			| Login / Logout | `un/pw` | `Session ID`
Server 		| Notify change | `changes` | -

**Notes:** `fail` could be returned when you try to access a list via id you are not a member of.

