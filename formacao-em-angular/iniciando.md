## What is angular and what is its purpose?

Angular is a front-end framework like React.

### What is a framework?

We can think of framework as something that brings with it, the project's structure as well as the structures we will
need. Therefore, we won't need to bring every functionality from external libraries. Examples:

1. Assume we are creating a complex form,  we don't need to install a form dependency like we do in react with hook form,
angular already have that possibility built-in
2. Communicating with the back-end via HTTP requests. We don't need to install a library like axios, angular already has
its http own system, which is optimized for it.

But some very specific libraries, like tailwind, or date-fns. We can download it from the outside.

### What are SPAs?

As the name itself says, it is an application of single pages. This means that we can make the user to change screens
without it fully reloading. There are some websites that, if we notice, when we click on a link, we go to another, fully
reloaded page, and the page as a whole is initializing from scratch.

This causes the application to lose its context, which are the properties/variables/instances values, but with SPAs this
does not happen, we can make that when a user clicks on a link, he go to another sc een of the app, but keeping its
context and values and reuse them in that new screen.

### Typescript

Adds the type safety. However, the browser does not understand its syntax. When we serve our application for it to be
accessed under the hood, all this ts code will have to be be transpiled into pure js in a way the browser understands

### What we are able to do using angular?

. Separation of the app in reusable components
. State management
. Creation of complex and dynamic forms
   -  Angular forms are fully featured and we are able to create reactive forms, and also forms that are based on the 
   and component's template, which are the template driven forms.
. Execution and orchestrating of HTTP requests
. Creation of navigation routes
. Use of external libraries
. Reactive programming with RxJS
. Unit tests
. SSR, PWA
`
## Configuring the Development Environment

  ### How does an angular environment work


### How does the compatibility between angular and node works?

We should'nt simply install any node version and expect it to be able to execute any angular app in the latest version. 

### How to create applications utilizing the global Angular CLI in our machine

We can install it globally using npm and create applications/execute commands/create files, and so on.

### How to create apps by using npm's `npx`

With npx we are able to, temporarily download the angular cli, and create an angular app, and the cool thing about npx
is that we can use any angular cli version and dynamically create angular apps in any version we want.


## Understanding the Angular CLI compatibility

 Essentially we have compatibility rules between node -> npm -> angular/angular cli

 The version of the cli installed in our machine or that we are going to use via the npx command.

 Inside `angular.dev/reference/versions` page, we can see a relation of which angular version we must have in order to
 use a given node version.

 Usually we install node on a given version and create angular project in another version. But they need to be compatible
 because under the hood, angular cli will use node to execute its functions, such as the project build or its serve. And
 for these tasks, angular cli uses node. Therefore, we must ensure that the node installed in our machine, provides and
 have all the needed functionalities by angular cli. For example:

 I currently have node version 24 installed in my machine,  and for this node version, i need to use angular 20 or above.

## Two ways of creating our angular apps

### 1st way.

Installing npm's angular cli package with `npm install -g @angular/cli` or `npm install -g @angular/cli@20`

and simply execute ng new `app-name`

### 2nd way.

Using npx with `npx @angular/cli new app-name` or with the version `@  angular/cli@15` or with the desired flags.

--/--

When using the npm install -g without specifying the version it automatically gets the latest version of that given library
under npm.

The negative point of taking the first approach, is that we are going to be "stuck" with the installed version, but it will
be easier to execute all the angular cli commands on any place of our app.

With npx, we temporarily download the library in our machine, execute the specified command, and after it, it uninstalls
the library, and it won't be globally installed.

And the negative side with this approach is that the commands may take a bit longer to execute, since it will have the work
of downloading the library via npm, install it on our machine every single time. However, every time we can specify
the desired version meaning that we won't tied to a specific version

### nvm

For the environment to be completely dynamic, and we also be able to change even our node version, we could make use of
a nvm (node version manager) which enables us to change the node version in a simpler manner.





