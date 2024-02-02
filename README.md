# Sabest

## Brief Description
This is my final project for a two-year study in web development, focusing on e-commerce. The project is a full e-commerce solution featuring dynamic front-end design with React, a Node.js-Express server, Stripe for payment processing, Google Login for authentication, and MongoDB for the database.

## Getting Started
These instructions will guide you in setting up the project on your local machine for development purposes.

## Prerequisites
Before starting, ensure you have the following installed:

- **Node.js**: Download and install from [Node.js](https://nodejs.org/).
- **Git**: Download and install from [Git](https://git-scm.com/).

## Installation

### Clone the repository to your local machine:
```bash
git clone https://github.com/sabest2022/examenarbete.git

##Set up the Server:
## Navigate to the server directory:

bash
Copy code
cd examenarbete/server
Install server dependencies:

bash
Copy code
npm install
Start the server (by default, it will start on http://localhost:3000):

bash
Copy code
npm start

##Set up the Client:
In a new terminal window/tab, navigate to the client directory:

bash
Copy code
cd examenarbete/client
Install client dependencies:

bash
Copy code
npm install
Run the client application (by default, it will start on http://localhost:5173):

bash
Copy code
npm run dev
Environment Variables
Create a .env file in both the client and server directories with the necessary environment variables:

##Server (server/.env):
makefile
Copy code
DB_HOST=mongodb://127.0.0.1:27017/
DB_NAME=YourDatabaseName
ENDPOINT_SECRET=YourGoogleEndpointKey
MONGO_ATLAS=[MONGO ATLAS URL]
STRIPE_KEY=YourStripeSecretKey
CLIENT_URL=http://localhost:5173

##Client (client/.env):
makefile
Copy code
VITE_REACT_APP_GOOGLE_CLIENT_ID=YourGoogleClientId


##Built With
React - The web framework used for the client-side.
Node.js - Server environment.
Express - Web framework for Node.js.
MongoDB - Database.
Other technologies/libraries: TailwindCSS, Stripe, Google Login, etc.
Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

Authors
Saeed Askarian
License
This project is licensed under the Sabest License.

