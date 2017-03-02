# Book Store

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.0.


## Project Structure

The Book Store example counts with 3 views:

- Home
a) This section can search a book querying our database through the search form, making the query by calling our API.


- Browse catalog
a) This section shows the books catalog

b) every book shows the *title*, *author*, *price* and its *image*.

c)  the user can filter the list of books by *title*, *author* and *price*

The filters has its own validation, accepts text only in *title* and *author* fileds, and for *price* accepts only decimal numbers.

- Add Book
a) This section shows the books catalog

b) every book shows the *title*, *author*, *price* and its *image*.

c)  the user can filter the list of books by *title*, *author* and *price*


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Note
To be able use successfully our web app, we need to do the following in a chrome browser
NOT FOR PROD ONLY, FOR TESTING PURPOSES

we need to paste this in our chrome:

chrome://flags/#allow-insecure-localhost

You should see highlighted text saying: Allow invalid certificates for resources loaded from localhost

Click Enable.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
