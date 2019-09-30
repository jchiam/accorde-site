# Accorde Website

This is the repository for Accordé Guitar Ensemble's website. Frontend is written with React. Both the backend and website are hosted on Firebase.

## Project Setup

1. Install node: `brew install node`
1. Ensure all dependencies are installed with `npm install`

### Linting
1. ESLint has been hooked to git's pre-push
1. Run manually: `npm run lint`

### Environment Variables
1. Make a copy of `.env.example` and name it `.env`
1. Fill in the necessary variables in `.env`

## Run
- Run the app with `npm start`
- View the app at [`localhost:8080`](http://localhost:8080)

## Local Staging
- Serve local staging with `npm run stage`
- View the staging app at [`localhost:5000`](http://localhost:5000)

## Deploy
1. Login to Firebase with `firebase login`
1. Deploy the app with `firebase deploy`
