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

## Angular Components

### What is an angular component? 

#### Each component is divided in

. Template (HTML)
  - Is what gives form to the component, for example, assume we the component is a button. Therefore, it will be a <button>
  tag with all its stylings, or it is a items list, then we assume that the component is a div, which may have a child div
  and so on, a normal HTML
. Class (TypeScript)
  - The TS class is where can have methods, properties, and the whole component logic. 
   method executed on click, and more.
. Styles (CSS)
  - Normal stylings (css, scss, sass, and so on)

#### Why to use components? 

Components are used to facilitate reuse, modularity and organizing, encapsulation, and state management. Think of the state
management of each attribute inside the class being a state

#### How they interact?

. From parent to child via @Input
. From child to parent via @Output
. Services

## File Structuring

We will make use of a `meu-botao` component for this example

  1 - Create a new component named `meu-botao` and it will automatically be created in the app folder with all its base
  files.
  2 - To understand the communication between our typescript and our template. Assume we create a click event and this 
  button html will have `(click)` property that references that click, and in this way, we can execute some method inside
  our ts, such as a method `limpar`
  3 - By writing `(click)="limpar()"`, it will execute the method limpar() inside our ts, the same thing for the filtrar
  method

### ts file structure

  Every ts file will define the structure of every component, we will notice the @Component annotation, which tells us
  and angular that it consists of a **component**, and inside each @Component annotation constructor we must inform what
  the selector (which is the selector we will use when referencing that component inside another one), imports (where we
  import modules, pipes, directives, other components, and more), templateUrl and the styleUrl of that component.

  In older angular versions, the imports would'nt even be defined inside the component, because every import would be inside
  the module where this component is on, similar to nest. However, in newer angular versions, every component is standalone.

## Referencing a component inside other component

On the previous lesson, we saw that we have a meu-botao component which has two buttons inside of it, and we will start by
referencing it inside our app component by using the selector

But we will notice that inside `app.html` when we try to use it, we will see a warning saying that `app-meu-botao` is not
a known element, which means that every component that wants to communicate with another, needs to specify that component
in the imports

## Angular style encapsulation

The idea that angular ensures styles for one component instance don't leak to another instance or to the rest of the application
is achieved through the view encapsulation

**1. The Encapsulation Attributes**

Angular, by default, uses the `ViewEncapsulation.Emulated` strategy to achieve its isolation. This module **emulates** the
behavior of the native shadow DOM by adding unique, generated attributes to the component's HTML elements.

• It adds a unique host attribute, such as _ngcontent-cXXX (where XXX is a generated ID), to the component's host element
(the `<meu-botao>` itself in our example).

• It adds a corresponding **content attribute**, such as `_nghost-cXXX`, to all the elements inside the component's template

**2. How the CSS is Scoped**

Angular automatically rewrites the component's CSS styles to include these unique attributes as part of the selector.

**Example**

If our component's style sheet contains this CSS
```css
.title {
  color: blue;
}
```
Angular modifies it in the browser's DOM to something like this
```css
.title[_nghost-c123] {
  color: blue;
}
```
This ensures the `.title` style only applies to elements that have the `_nghost-c123` attribute, which are **only** the
elements within that specific component instance.

**3. Different Instances, Isolated Styles**

When we have two instances of the same component (e.g. two instances of `<meu-botao>`)

• Instance 1: Get's a unique attribute, e.g. `_ngcontent-c123`. The component's styles are scoped with `_ngcontent-c123`
• Instance 2: Get's a different unique attribute, e.g. `_ngcontent-c456`. The same styles are scoped with `_ngcontent-c456`

This makes each instance's styling unique and isolated from the others, even though they are share the same component class
and stylesheet.


One thing to note is, on every angular component, even though it is two different instances of the same tag, angular adds
a random ng-content-* attribute to maintain the encapsulation of this class and making that component unique.
Which means that if we modify the component styling in its selector, the style won't change for every instance of the
selector class but only on that given one.

## Inline HTML/CSS 

In case we want to create small components, we can add the inline html and styling on the ts class itself.

For this example we can create a new component with the flags --inline-style and --inline-template. What these flags do,
is prevent angular default behavior of creating the .html and .css along with the component, and initializes the template
and css with different attributes: `template` in place of `templateUrl` where we would reference a file path to the template
element and `styles` in place of `styleUrl`.

In these attributes, we can place our inline styling which will work just as if we would inform a separate file

## Lesson 1 -   What is possible to do inside a component's class

1 - Dependency Injection

  Getting the instance of a service and inject inside the class. This way, we able to consume the properties, methods and
  the state of that service inside the class.

  There are two ways of injecting dependencies

  1 - Via constructor
  2 - Using angular's inject method

2 - Creating properties / methods

  Classes can create either private, public, or readonly properties.

  When a property is readonly it says that it can only be read and not modified, nor by the class itself or externally.

  methods, in other hand, can either be public or private, they aren't able to be modified because they are already part
  of the class's definition, meaning that we can't reassign a method

3 - Utilizing life cycle methods

  Like ngOnInit and ngOnDestroy and along with it, we have to implement these methods 

  ngOnInit is called when we create that component or when we reference it

4 - We can access public attributes from the template using their name inside {{ }}

## Lesson 2 - Passing values to the template

For example, we can use the `counter` attribute from the class via {{ counter }}

But there are somethings we can do inside interpolations.

• 1: Display component's properties: {{counter}} 

• 2: Simple mathematical operations: 
  . <p>. Total: {{ unitPrice * quantity }}</p>
  . <p>. Sum: {{ 10 + 5 }}</p>
  . <p>. Result: {{ 10 / 2 + 3 }}</p>
  
• 3: String Operations:
  ```ts
    import { UpperCasePipe } from '@angular/common';
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-comp-3',
      imports: [UpperCasePipe],
      template: `
        <p> Full Name: [{ firstName + ' ' surname }] </p>
        <p> Uppercase: [{ 'angular' | uppercase}]
      `
    })

    export class Comp3Component {
      firstName = 'Caio',
      surname = 'Ceretta'
    }
  ```


• 4: Access properties of objects and arrays

  ```ts
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-comp-3',
      imports: [],
      template: `
        <p>Email: {{ user.email }}</p>
        <p>First fruit {{ fruits[0] }}
      `
    })

    export class Comp3Component {
      user = { name: 'Caio', email: 'caioceretta@gmail.com' }
      fruits = ['Apple', 'Banana', 'Grape']
    }
  ```

  We should not access an entire object inside an interpolation, we have to access the direct property of the object, since
  the interpolation isn't able to convert an object instance into a string. 

• 5. Ternary operator

```ts
  template: `<p>Status: {{ loggedIn ? 'Online' : 'Offline}}</p>`
```

• 6. Use of pipes

    ```ts

    @Component({
      selector: 'app-comp-3',
      imports: [DatePipe, CurrencyPipe, UpperCasePipe],
      template: `
        <p>Formatted date:  {{ eventDate | date : 'shortDate' }} </p>
        <p>Formatted Value:  {{ orderValue | currency : 'BRL' : 'symbol' : '1.2-2 }} </p>
        <p>Uppercase text:  {{ 'Hello, World' | uppercase }} </p>
      `
    })

    export class Comp3Component {
      eventDate = new Date();
      orderValue = 123.456
    }
  ```

• 7. Getter calls (Computed Properties)

  Assume we create a class with the attributes name and surname, and then we create a `get` 'fullName' that returns 
  name + surname, and simply call that getter inside the interpolation
    
• 8. Async operator with observables/promises

```ts
  // imports

  @Component({
    selector: 'app-comp-3',
    imports: [AsyncPipe]
    template: ` <p>{{ data$ | async }}</p> `
  })

  export class Comp3Component {
    data$: Observable<string> = of('Loaded Data!');
  }
```

AsyncPipe handles subscribing to `Observables` (or `Promises`) and returning the latest emitted value. It automatically
performs the subscription and "unsubscription" when the component is destroyed, preventing memory leaks

And if by any reason, the value of a property being displayed on the screen changes during the component's lifecycle, and
we have a method that updates the quantity. If the value of the quantity change this value will automatically be reflected
on the template and the expression will be recalculated — This is something called change detection, when angular detects
changes on the properties that are being called on the template and automatically updates it.

### What we should avoid

• 1. Unnecessary calls

Assume that we have a counter attribute and a method that sets this count + 1, but instead of simply interpolating the
counter value, we utilize this function invoking, and this will generate a collateral effect.

Because since angular makes use of its change detection, and it will end up executing the function over and over again to
update the value, in a cyclic operation. Therefore, it is not recommended to execute methods inside the interpolations 

• 2. Complex business logics
• 3. Assigning values
  - Such as trying to {{ counter = 2 }}


