# Crypto Tokens App

## Overview

The Crypto Tokens App is a React Native application that provides users with a user-friendly interface to view and manage cryptocurrency tokens. It fetches data from a GraphQL API powered by an Express server and Apollo Server, allowing users to see token details, mark tokens as favorites, and navigate through different views seamlessly.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- View a list of cryptocurrency tokens with details like name, symbol, price, market cap, and 24h price change.
- Mark tokens as favorites.
- Navigate to detailed views of individual tokens.
- User-friendly interface built with React Native.
- Efficient data fetching and caching using Apollo Client and LFU Cache.

## Tech Stack

- **Frontend**: React Native, Apollo Client, GraphQL
- **Backend**: Node.js, Express, Apollo Server, Axios, LFU Cache
- **Database**: None (fetches data from a third-party API)

## Setup Instructions

### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dafejimi/crypto-tokens-app/tree/main
   cd crypto-tokens-app
   ```

2. **Navigate to the Backend Directory**:
   If you have separate directories for backend and frontend, navigate to the backend directory:
   ```bash
   cd cryptokit-test-server
   ```

3. **Install Dependencies**:
   Ensure you have Node.js and npm installed, then run:
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the backend directory and add the following variables:
   ```env
   COIN_API_URL=https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest 
   COIN_API_KEY=<your_coinmarketcap_api_key>
   PORT=4000
   ```

5. **Start the Backend Server**:
   ```bash
   npm start
   ```
   The server should now be running on `http://localhost:4000/graphql`.

### Frontend Setup

1. **Navigate to the Frontend Directory**:
   If you have a separate frontend directory, navigate to it:
   ```bash
   cd cryptokit-test-main
   ```

2. **Install Dependencies**:
   Ensure you have Node.js and npm installed, then run:
   ```bash
   npm install
   ```

3. **Run the React Native Application**:
   For iOS:
   ```bash
   npx react-native run-ios
   ```

   For Android:
   ```bash
   npx react-native run-android
   ```

## Running the Application

1. **Start the Backend**:
   Make sure the backend server is running before starting the frontend application.

2. **Start the Frontend**:
   Follow the frontend setup instructions to run the app on your preferred simulator or device.

3. **Accessing the App**:
   Open the app on your mobile device or simulator. You should see a list of cryptocurrency tokens. You can click on each token to view more details and manage your favorites.

## Project Structure

### Backend

- **index.js**: Entry point of the backend service, sets up the Express server and Apollo Server, Defines the GraphQL schema and resolvers and Handles caching with LFU Cache..

### Frontend

- **App.tsx**: Main entry point for the React Native application.
- **routes.tsx**: Defines navigation routes and screens.
- **screens/**: Contains all screen components (e.g., Tokens, Settings, SingleToken).
- **constants/**: Stores constants used throughout the application (e.g., colors, sizes, fonts).
- **types/**: Type definitions used across the application for TypeScript support.

## Contributing

If you'd like to contribute to this project, please fork the repository, create a feature branch, and submit a pull request. Ensure your code follows the project's coding style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
