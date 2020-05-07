# Highspot Coding Challenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Getting Started

Clone the project

```bash
git clone git@github.com:cancerimex/highspot-test.git # (ssh) or
git clone https://github.com/cancerimex//highspot-test.git #(https)
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Additional/Future Changes

- Better error handling
- Tried using css-grid , probably should have used flex
- Create a `colors.scss` file to store color variables
- Card design could still get another pass, maybe move the set into a ribon across the top
- Some image sizes are different, should handle that in the future to make it more uniform
- Image placeholders while loading
- Scroll loading is triggered when you filter the cards, more testing needed
- Sometimes the card name return has a `|` at the end of the name, could filter that out
- Allow more sorting and filtering
- Marble to test Observables
- Use ngx-infinite-scroll instead of rolling my own, but wanted to give it a go
- Implement api caching
- Save cards into localstorage
