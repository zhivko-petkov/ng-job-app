# MyJobApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.4.

University Course project developed with the knowledge of Angular acquired at the university. The functionalities are viewing, creating, editing, liking and deleting job ads. The JSON SERVER is used to store Job ads, Users and Organizations. Everyone can like job ads. Standard users can apply cv. The organizations can approve or decline standard user applications. Every application has a status: 'IN PROCESS', 'TRY AGAIN', 'APPROVED'. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
1. Download the project
2. Open a terminal and run the command: `npm i` to download the necessary packages
3. Run command `cd src/app/server` (open server folder and in the terminal) after then run the command: `json-server --watch server.json` to start the json server.
4. Open another terminal and run the command: `npm start`
5. Open a browser and type the following address http://localhost:4200/
6. The json server is on port 3000

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
