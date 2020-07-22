# Innovation Geek Prototype

## Process to Extract API data

1. Clone this repository
2. Run `npm install` to install dependencies
3. Edit `config.json` (see [Configuration](#configuration))
	1. Enter the Client ID and Client Secret from the Credentials section of your app's page ([dashboard](https://developer.rbs.useinfinite.io/dashboard) -> demo-app-... -> Credentials)
	2. Enter the Domain from the Team Information section of your team's page ([dashboard](https://developer.rbs.useinfinite.io/dashboard) -> demo-team-... -> Team Information)
4. Run `node Index.js` to authenticate and fetch data from OB api and FSA ratings api.

## Process to extract FitBit api data
1. Go to Fitbit Master folder
2. Run `npm install` to install dependencies
3. Replace below variables in server.js with your client details
	1. process.env.CLIENT_ID
	2. process.env.CLIENT_SECRET 
	3. process.env.SESSION_SECRET  	
4. Run `node server.js`
5. Open chrome browser and navigate to `http://localhost:8080`. It will ask you to login to fitbit page.
6. After authetntication, it will downaload the customers activity data.

## Running the app

1. Open `Server.js` file and "ServerName" either with localhost or the server where you want to host the application.
2. Run `npm start` to host the application on any server or on localhost.
3. Access the application in Chrome browser using `https:\\ServerName:8089`.


## Configuration

The `config.json` file needs to contain some key information to allow the example app to communicate with the sandbox api:

* `clientId` & `clientSecret`: these keys need to match the app configuration. They are sent to the sandbox's API during the authentication process.
* `teamDomain`: this domain needs to match the domain specified in the team configuration. For a WebApp this should be the domain that the app is hosted on to allow redirection after manual authentication. For a CLI app it can just be a fake domain.
* `proxy`: optionally set a proxy for http requests to go through, or null for no proxy. 
