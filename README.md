## myFlix React Client

![Demo](demo/demo.gif)

This project is the client-side component for an application called "myFlix" based on its existing server-side code (REST API and database). It is a single-page, responsive application with routing, rich interactions, several interface views, and a polished user experience built using the React library and handles data through previously-defined REST API endpoints.

Please click [this link](https://theflix.netlify.app/) to check the application.

### About
This project was build with **React** in ES2015+. It contains a mix of class components and function components and requires *npm*, *Babel* and *Parcel* to compile. It uses state routing to navigate between views and share URLs. The state management is taken care by **React Redux** (hence respecting the Flux pattern).

The UI was styled using **Bootstrap** and it is hosted on Netlify.

### Features
* Displays a welcome screen where users can log in or register for a new account.
* Users are authenticated, then they can view all movies.
* In the main view, users see all movies and can select a movie for more detials. They can also search for movies.
* In a single movie view, users can click on buttons to:
  * view the genre of the movie and details about the genre.
  * view the director of the movie and details about the director.
  * add the movie to their list of favorites.
* Users can also view their profile where they can see their favorite movies, remove movies from their favorites, and edit their profile details.

### Development
To run this project locally, run the following command, then navigate to the localhost port stated in your terminal.
```
npm run serve
```

In the future I intend improve the UI to make it even more attractive and easy to use. Before that, I plan to add much more movies data to the database in order to create a more exhaustive movies platform.

### Usage
Please let me know if you would like to use this project as a template to create your own. I'll be happy to get in touch and help with whatever you need.
