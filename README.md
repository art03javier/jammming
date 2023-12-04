# Jammming App

Jammming is a web application that allows you to search for music tracks, create custom playlists, and save your playlists to your Spotify account.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Search for Music](#search-for-music)
  - [Create Playlists](#create-playlists)
  - [Save to Spotify](#save-to-spotify)
- [Development](#development)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Setting up Spotify API](#setting-up-spotify-api)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/your-username/jammming.git
1. Navigate to the project directory:

   ```shell
   cd jammming
2. Install the project dependencies:

   ```shell
   npm install
3. Create a Spotify Developer Application:

    * Go to the Spotify Developer Dashboard.
    * Create a new application.
    * Add http://localhost:3000/callback to your application's Redirect URIs.

# Usage

## Search for Music

1. Launch the Jammming app using:

   ```shell
   npm start
   
2. Open your web browser and go to http://localhost:3000.

3. Enter a song, album, or artist in the search bar and click "Search."

4. Browse the search results and click the "+" button to add tracks to your playlist.

## Create Playlists
1. In the "Create Playlist" section, enter a name for your playlist.
2. Add tracks to the playlist using the search results.
3. Optionally, reorder or remove tracks from the playlist.
  
## Save to Spotify

1. Make sure you are logged in to your Spotify account.
2. Click the "SAVE TO SPOTIFY" button to save your playlist to your Spotify account.

## Development

### Tech Stack

- **React.js**: A JavaScript library for building user interfaces.
- **Spotify API**: Allows you to search for music and save playlists to Spotify accounts.

### Project Structure

- **src/**: Contains the application source code.
- **components/**: React components for the app.
- **utilities/**: Utility functions, including Spotify API integration.
- **public/**: Public assets, including images.
- **package.json**: Project dependencies and scripts.
- **README.md**: Project documentation (you are here).

## Setting up Spotify API

1. Create a Spotify Developer Application: Follow the instructions provided [here](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app) to create your Spotify Developer Application.

2. Configure Spotify API in Spotify.js:
   - Replace `clientId` with your Spotify Developer Application Client ID.
   - Ensure the Redirect URI (`redirectUri`) matches the one you specified when creating your Spotify Application.
   - Save the changes and restart the application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
