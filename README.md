# Gitlab Changelog Generator
A browser extension to generate changelog files for releases on Gitlab.

## Prerequisites
- A Gitlab API key with Read API scope
- A Gitlab project that uses conventional commits

## How it works
This script creates a button that does the following:
1. Gets a Gitlab token
2. Fetchs the actual project for the latest tag
3. Gets all commits since the latest tag date
4. Order these commits by conventional syntax
5. Generates a mardown text with the commits messages and URLs
6. Puts the text inside the Release notes section

## How to install
1. Clone this repository
2. Open your browser
3. Activate developer mode
4. Go on extensions
5. Select "load unpacked"
6. Select the cloned repository directory

## How to use
1. Open your Gitlab repository
2. Go to Releases Page
3. Click on "New release"
4. Click the new button "Generate Changelog"

## Tips
- You can customize your conventional commits by editing [`js/content.js`](js/content.js)
