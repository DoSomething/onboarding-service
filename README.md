# Onboarding service
This is a service used to configure the onboarding component in Phoenix. It currently supports toggle on/off, developer toggle, and per campaign disable. However the long term goal is to allow for copy changes, custom slide creation.

## Requirements
- In order to persist data you're going to need Redis & MongoDB. `brew update` `brew install redis` `brew install mongodb`
- To simulate the staging/production environment you'll need the [Heroku toolbelt](https://devcenter.heroku.com/articles/heroku-command-line)

## Setup
- Clone the repo
- `npm install`

To grab the config you can either,
- `cp example.env .env` Then visit aurora QA to get the Onboarding client details.
- `heroku config --app ds-onboarding-service-staging` Copy the variables into your .env file (Requires access to the Heroku staging app)
 - **Note**: If you do the second method, *do not copy* the Redis URL. By default the Redis module will connect to your local server.

To run the app you'll need two commands (In this order)
1. `npm run db` -- This starts up Redis & MongoDB locally. You'll only need to run this once while you're developing.
2. In a different CLI window, run `npm start`. This starts the actual NodeJS server, which you can start/stop at will.
