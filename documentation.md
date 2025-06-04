## Wiki for the ABC Cinema Web App

### Introduction

This documentation provides insights into the design, development approach, and key decisions taken while building the Movie Discovery App.

### Project Overview

ABC Cinema Web App is a responsive web application built with NextJS. It allows users to:

- Browse and discover movies sorted by release date, alphabetical order, and ratings.
- Pull to refresh the movie list.
- Load additional movies upon scrolling to the bottom.
- View detailed movie information.
- Simulate booking a movie.

The data source of movies is from the TMDb.

### Tech Stack

- Frontend: ReactJS (with TypeScript), App router
- Styling: CSS Modules
- State Management: React Context API and Hooks
- Testing: Jest

### Design Considerations

Aesthetic value: The web application' theme colour is yellow, signifying happiness, which can be obtained via watching movies. A hero on Home page to attract visitors.
Responsiveness: Built for both mobile and desktop screens.
Reusability: Reusable components (like MovieCard, SearchNotFound and Header components) to minimize duplication.
Error Handling: Graceful handling of API calling errors. A SearchNotFound component is shown as a fallback to 404 Not Found response from TMDB.

### Key Features Implementation

#### Home Screen

- Landing Hero that allow user to click a button which kickstart exploration of movie list
- Fetch and display a paginated list of movies sorted by: Release date (default), Alphabetical (A-Z / Z-A), Popularity
- Loads more movies when near the bottom
- Shows movie cards that contain poster image
- Movie title
- Popularity

#### Detail Screen

- Fetch detailed information for a movie:
- Synopsis
- Genres
- Language
- Duration
- Simple booking UI which users can choose an available / selling fast seat in the date (3 days ahead), time and location. User will be prompted a success message afterwards

#### How to run locally

1. Install dependencies

```shell
npm install
```

2. Start web application

```shell
npm run start
```

3. Run unit test

```shell
npm run test
```
