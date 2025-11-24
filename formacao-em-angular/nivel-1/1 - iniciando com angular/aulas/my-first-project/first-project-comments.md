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

This folder contains the code of our app component, the base component of the app. It contains the stylesheet which refers
the **scope** of the component 

  
