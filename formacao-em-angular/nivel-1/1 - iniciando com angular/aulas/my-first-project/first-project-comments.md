## Basic configuration

### Angular.json

Angular.json is basically a configuration file for our project and it will be used by the angular-cli.
When executing any command in the terminal, like `ng serve`, it will look inside the angular.json and the configurations 
and use them to execute our project's serve. And same thing for any other command, like ng generate, and so on.

Assume we execute the command `ng generate component test-comp`. This cli command executes a component creation with this
name, but through our schematics inside `angular.json`, we are able to inform **how** the component should be created —
what kind of stylesheet it will use, if it will create the basic unit testings, and so on.

We can also configure how the build is going to be done, the assets folder — its statics, configuration of the global css,
build configuration, and more.

Basically, it centralizes the app core configurations, where we won't need to often alter it

### src folder

Inside the src folder is where every components, pipes, directives, services, and all our source code.

**styles.css**: It is our global styling, and be available inside every component of the app.
**main.ts**: responsible for initializing the app, loading the root module **(AppModule)** and executing the angular's
bootstrap in the browser — bootstrap is essentially starting the application, it loads the root module, creates the components
tree and renders the app in the browser.
**index.html**: Base html of our app, which is loading the app-root selector, and this tag represents our app component
that is going to be, essentially the app basis that load all the component — this file, is also not often modified

### app folder

### app folder

This folder holds the code for our **AppComponent**, the root component of the application.  
It includes:

- **app.component.ts**: the TypeScript class that defines the component’s behavior, including its selector, logic, and
interaction with other parts of the app.  
- **app.component.html**: the template of the component, defining what will be rendered on the screen.  
- **app.component.css / .scss**: the styles for this component, scoped only to it.  

Think of this component as the **entry point** of your app — like the main module, it orchestrates the initial structure
and layout of the application. 

  
## Generating components

To generate a component, a common syntax that is going to be used will be:

`ng generate component comp-name --skip-tests=true`

This creates the component inside the app folder

### Creating files inside custom folders

Assume we want to create our service inside a specific folder and not create it it flat inside app folder.
Create a folder services, inside app, and when generating a new service, simply specify the relative path from the app
folder for the services folder, e.g `ng g service services/user`

## Debugging

### Dev tools 

Install the browser extension "Angular DevTools" and it will now be available after we inspect the element (If using some
other browser based on chrome, such as brave, we need to disable the shield, since it may block the extension script
preventing it to detect our app).

Inside the angular dev tools tab, we will notice that it has already mapped all the component tree and we can understand
every service being injected, routers, inputs the component is receiving, and so on.

### VScode debugger

We can also mark breakpoints on our code, set the ng-serve as debug and run option and when we run the code, we will be
able to see all the current values being "watched" whenever one is targeted.

### console.logs

Suppose we are debugging a function named `onCardDrop` and in the first line, use something like

`console.log('1 - onCardProp event, event')`

Then, in case we are debugging variables, the same approach is taken, and so on

#### Useful tip

Let's say it is showing a wrong value on a certain variable, and making this point to point trail, the whole flow until it
reaches the divergence point
