# Onboarding service
This is a service used to configure the onboarding component in Phoenix. It currently supports toggle on/off, developer toggle, and per campaign disable. However the long term goal is to allow for copy changes, custom slide creation.

## Requirements
- In order to persist data you're going to need Redis & MongoDB. `brew update` `brew install redis` `brew install mongodb`
- To simulate the staging/production environment you'll need the [Heroku toolbelt](https://devcenter.heroku.com/articles/heroku-command-line)

## Setup
- Clone the repo
- `npm install`

To grab the config,
- `cp example.env .env`
- `heroku config --app ds-onboarding-service-staging` Copy the variables into your .env file (Requires access to the Heroku staging app)
 - **Note**: Do *not* copy the Redis URL. By default the Redis module will connect to your local server.

To run the app you'll need two commands (In this order)
1. `npm run db` -- This starts up Redis & MongoDB locally. You'll only need to run this once while you're developing.
2. In a different CLI window, run `npm start`. This starts the actual NodeJS server, which you can start/stop at will.

## Fender Development
Frontend JS is located under the /js/ folder, SCSS in the /scss/ folder. We use React for constructing our interfaces & Forge to keep styling consistent.

When `npm install` runs it automatically builds the frontend dev & prod assets for you. To rebuild the assets again, use `npm run build`, which minifies and compresses everything. If you're working locally, use `npn run build_dev`, which watches for changes & does not minify assets.

## Testing
Please write tests for all new features! All tests are in the `/test` folder and can be executed with `npm run test`.

We use [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/) and [Supertest](https://github.com/visionmedia/supertest) for testing. Supertest creates actual requests to your local server, so you must have it running when you run your tests!
