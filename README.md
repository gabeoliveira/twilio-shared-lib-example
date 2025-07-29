# Twilio Shared Library Example

This repository contains a small Twilio Serverless project that showcases how to use a custom shared JavaScript library across your functions. The library is bundled with [esbuild](https://esbuild.github.io/) and served from the `assets` directory so that it can be required by your Twilio Functions at runtime.

## Project layout

- **`my-shared-lib/`** – source code for the shared library.
- **`assets/`** – output directory for the bundled library (`my-shared-lib.js`).
- **`functions/`** – Twilio Functions that make use of the library.
- **`.twilioserverlessrc`** – configuration file specifying the Node.js runtime.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Bundle the shared library using esbuild:
   ```bash
   npm run build:lib
   ```
   This command produces `assets/my-shared-lib.js` which can be required by your functions.
3. Deploy the service to Twilio using the Twilio CLI:
   ```bash
   npm run deploy
   ```
   Set your `ACCOUNT_SID` and `AUTH_TOKEN` as environment variables or create an `.env` file based on `.env.example` before deploying.

## Example function

`functions/hello-world.js` demonstrates how to load the bundled library from the assets directory and use it to generate a custom greeting:

```javascript
exports.handler = async function (context, event, callback) {
  const libPath = Runtime.getAssets()['/my-shared-lib.js'].path;
  const myLib = require(libPath);

  const response = new Twilio.Response();
  response.setBody({
    message: myLib.generateCustomGreeting(event.name || 'Anonymous'),
  });

  callback(null, response);
};
```

After deploying, invoke the function with an optional `name` parameter:

```
https://<your-domain>.twil.io/hello-world?name=Alice
```

The response will look similar to:

```json
{ "message": "Hello Alice, your session ID is <uuid>" }
```

Feel free to modify the library or add additional functions to fit your own workflow.
