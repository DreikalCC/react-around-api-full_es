# react-around-api-full

The API of "Around the U.S." with authorization and registration handled by the back-end server.

On this project we unified the front and back end of the project to make the site functional and deployable in a server.
Celebrate was implemented to help with the validation of requests, a centralized error middleware was also created to handle the errors that could come up during the use of the site.

This repository contains the full API of "Around the U.S." project that features user authorization and user registration and handles cards and users:

- the link to repository with the complete React application which uses this API: https://github.com/DreikalCC/react-around-api-full_es
- the link to the website that hosts the API: https://aldo.desarrollointerno.com

On this project you can create new users that are going to have a default set of data predetermined on the user schema, once the user is created you will be prompted to log into the site, the validation handled by the backend and the protected routes on the frontend will prevent users with the incorrect login credentials from loading the main page of the site.

If the user successfully logs into the site the front ends creates a token with JsonWebToken to allow the user to stay logged for a period of 7 days, or until the user logs out of the site.

The users are able to update their information and avatar, as well as upload cards to the site, where other users can see them and also have the option to like them.

There is a validation that checks if the user ID and the card's owner are the same user, if this is true, the user is allowed to erase the cards for which this is true, otherwise the user will only have the option to like the cards. This way we can apply restrtictions to different users, similar validations can be used for users with different roles(not on this project).

Nginx was implemented to handle users requests and forwarding them to the appropriate destination on our site.
Bcrypt was used to handle the hashing of the users passwords, this way the password that the users set for their account would be difficult to decode and will keep their information safe.
PM2 is used to keep the server online even when we close the connection from our workstation to the server, this way the site can be accessible by anyone at anytime, if the site disconnects temporarily it will handle the reconnection by itself to prevent the developers from having to initialize the server everytime this were to happen.
