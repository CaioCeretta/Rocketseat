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

## Lesson 3 - Using Event Binding

Event binding is using to "listen" to the events that happen on the html elements of our components, and we can are able
to be **reactive** to these events and execute methods/expressions, and so on.

We are able to subscribe to multiple inputs events, and by subscribing to these events we can execute codes inside our
component's class.

Every element inside the DOM, such as inputs, or buttons, are js objects (instance of classes like HTMLInputElement,
HTMLButtonElement, etc) and angular can listen to their events using vanilla JS: like `button.addEventListener('click', ...)

Angular attaches event listeners using its own abstraction layer, which ultimately relies on the native JS event system.

For subscribing to an element event we use (`eventName`)= then the function name. We could also create anonymous functions
but they wouldn't work as we expect. This happens because angular does not execute the arrow function. Yet, it evaluates
and discard the expression. Since we are simply returning a function, but do not call it.
The click happens, angular evaluates the expression, sees the result as a function and nothing else. We could try to do
something like an IIFE, where we create the function and invoke it, but it is not a good practice

The **parentheses** means that we are receiving something from that element.

### **Capturing Input with $event and Type Casting**

the `input` event is fired every time we type something in the element.

These events send values for us, and we can capture them using `$event`. It will hold the value that the `input` event
emits when it is fired, and for it, we also need to modify the function in the `.ts` file to inform it receives a parameter.

By console.logging that event, we will see that it is an **InputEvent**.

### **Crucial Notes about event**

We notice that by typing the parameter `onInput(event: InputEvent)` , it will warn us, saying that `$event` is not compatible
with `InputEvent` parameter.

**Why?** the value the input actually sends to the function is often treated as the more generic type, the `Event`, which
`InputEvent` derives from. This happens because the way the framework or the DOM wraps the event is by its base type,
which is safer to use across any elements

### The main issue: accessing `.value`

But if we try accessing `event.target.value`, **we won't be able to**. Why is this?

That `Event` type is very generic. It can be used for multiple HTML elements (like `<div`, `button`>), and those elements
**may or may not have the `value` property. TypeScript is preventive: if the property is not guaranteed on the base type
`Event` , it won't let us access it.

This means that **casting is absolutely necessary** from `Event` to `HTMLInputElement` (the element that we know has the
`.value` property).

`const value = (event.target as HTMLInputElement).value;`

However, some things in angular we have a different way of capturing form elements, like inputs, textarea, and more. 

This means that we don't have to manually retrieve these values, and use two-way data binding, reactive events, etc.

 
## Lesson 4 - Using Property Binding

The **property bindings** is essentially the link between the component's class with the template.

There are types of bindings: property binding, event binding, class binding, style binding, and two-way data binding.

Every HTML element have an instance inside JS where we can access its properties. We must never confuse properties with
attributes, attributes are the html we use, such as class, id, style, and more. Properties, in other hand, when acessing
the instance of that element inside JS and altering it, we are dealing with properties.

Now, assume we have a property texto inside the class and we want to bind this property to the input's value attribute.

We wrap the value around brackets, and we are starting to create the property binding of that instance, and assign to this
a property of our class around quotes, and with this, we will see that the input value is binded to our class property

property binding does not modify the property value, only reference it. However, if we reference a text property inside
an input value and we modify the value of the input, it won't update its current value with the value being typed.

A way to link both of them in a way the inputted text modify the property is using **two-way data binding**



## Lesson 5 - Using Two-Way Data Binding


Now that we've already seen event binding and property binding. We are going to see how we use two-way data binding to
keep in sync a property of the class with an element of our template.

First we have to import `FormsModule` inside the component's ts.

Two-way data bindinding uses [(ngModel)]="property", and with this, we keep the property in sync with the input, meaning
that we would have to separately make the data capturing and the data sending

With this other approach, we don't have to do all that property binding stuff like [value]="texto" to bind the texto property
to the input value (input)="updateText($event), so we create a function to modify the internal texto property and create
a single call to   make both these calls using [(ngModule)]="property"

## Lesson 6 - Styling a component with global classes

The global css, is the styles.css located at the root and they may affect all the components of our app. This file is
widely used to remove the global stylings that our browser creates by default so we can have full control of this.

###  What this means? font-size: max(16px, 1em + 1vw)

max(a, b) chooses the biggest value between a and b, in this case, 16 and 1em + 1vw.
16px is the absolute minimum size, nothing will be the less than 16px

1em = current font-size of the html itself
1vw = 1% of the viewport width. As the screen width increases, its value also increase


###  Utility class

We can also make use of global utility variables, such as

```css
  //global.css
  :root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --spacing-unit: 16px;
  }

  .uc-text-center {
    text-align-center
  }

  .uc.mt-16 {
    margin-top: 16px;
  }

```

And we can also mix our modules html/css with the global classes, like

```
  // app html
    <div class="container uc-text-center uc-mt-16">
      <p>I am a text</p>
    </div>
  //

  //app css
    container {
      background-color: grey;
      padding: 20px;
    }

  
    p {   
        color: var(--primary-color)
    }
    
```

### External Variables CSS

This example will manipulate styles from external components.

In this example, we will use angular material, and inside of it, inspect that element in the browser, find the class
which we want to modify the color, and inside the styles.css file we have access to these classes from external components.

We can modify it globally or to a specific component, like:

```css
  .mat-slider .mdc-slider__track--active_fill {
    border-color: blue;
  }

  .mat-slider#meu-slider .mdc-slider__track_active_fill {
    border-color: blue; 
  }
```

### Global Layout Classes

Some times we may need to create classes that are a bit more complex (more complex than the utility ones), and they will
need to be utilized in many different places around our app.

we can put a .container class, to delimit margins/paddings/width inside `styles.css` and share it across the components.

Or define a grid system class, and so on. The nomenclatures we choose for global variables we can prefix with g-className
if we would like, but not required 

### Separate styles.css in multiple different files

We can create a folder `styles` where we will add files specific for each behavior, like

`reset.css` (that resets the browser styling)
`variables.css` (For all our variables)
...

Then, on our styles.css, import all these files into it.  

### Order/Name-Collision

We need to be very careful with defining the correct order so a class doesn't override the other one, as well as avoiding
class names that are already used by other libraries, for example, creating and using a class items-center which is a name
already being used by tailwind.

## Lesson 7 - Applying Dynamic Classes 1

### Style binding

Style binding is a way to dynamically apply styling to the HTML document.  

Style is the html attribute/property that applies isolated custom properties for each element.

In angular, we can make some changes like, if a button is clicked, change the background from blue to red.

e.g.:

```
  // html file
  <div [style.css-property]="value"></div>

  // ts file
  @Component([
    ...
  ])
  export class SimpleComponent {
    value: any = 'blue';
  }
```

or we can define a function to change this value onclick, like `changeColor() {this.value = "blue";}` and event bind this
style to change onclick 

### Linking a CSS property with units

Units are "px", "em", "rem", "%" and more. The example could be

<div [style.width.px]="widthInPixels"></div>
<div [style.height]="height + 'px'"></div>

Assume that the widthInPixels property has the value of 100, but since we are using width.px, angular will know that the
100 is 100px

But the height, since it it isn't represented by height.px, we need to inform the unit prefix manually

### Conditional Linking (using a ternary operator)
 
Let's use for this example a boolean property isActive, which is a boolean that starts as false. We then have a toggle
function to update its value and this could be something as:

<button [style.background-color]="isActive" ? 'green' : 'gray'"
  (click)="toggleActive()"
>
  Toggle Status
</button>

### Links with getter functions

Example

```ts
  myValue: number = 10;

  getColorValue(value: number): string {
    if(value > 80) {
      return 'darkgreen'
    } else if (value > 50) {
      return 'orange'
    } else {
      return 'darkred'
    }
  }

  // increases the value
  increaseValue() {
    if(this.myValue < 100) {
      this.myValue += 10;
    }
  }
```

This function will change the color based on the myValue instance property.

### Links with interpolations

Basically the interpolation generates a string, and with this string, it will modify the value, similar to property binding.

 We use the brackets when we want something dynamic, when we are calling a function or referencing a property value.

 When we want to simply pass down a string, we can use interpolations

 for this example we have

 ```ts
  	widthInPx: number = 200;

	increaseWidth() {
		this.widthInPx += 50;
	}
```

this in our ts and in our html

```
<div style="width:  {{widthInPx}}px; background-color: lightblue; padding: 10px;">
  Dynamic Width
</div>

<button (click)="increaseWidth()">Increase</button>
```

This is a new angular syntax, so vscode will add squiggly lines but it will work as intended.

### Same example but with backticks

```
<div style="{{`width:  ${widthInPx}px; background-color: lightblue; padding: 10px;`}}">
  Dynamic Width
</div>

<button (click)="increasseWidth()"
```

This is another syntax, where we create template strings for the variables

### Linking with Object Properties

We can use objects inside our style bindings, like this:

```ts
  //ts
	styles = {
		textAlign: "center",
		"background-color": "lightblue",
		padding: `${this.padding}px`,
	};

	increasePadding() {
		this.padding += 50;

		this.styles = { ...this.styles, padding: `${this.padding}px` };
	}
  ```
  //html
  ```html
  <div [style]="styles">Dynamic width with interpolation</div>
  <button (click)="increasePadding()">Increase Padding</button>
  ```

Since the styles property is an array of styles, they all were applied to the div, with the only difference that they must
be written in camelCase inside JS.

### Important Note

When we are dealing with a style binding using an object, we can't simply update a single property, we need to update the
object as a whole. If we want to update just the padding, we need to attribute to styles a new object, spreading over the 
current styles object and modifying just the property we want


## Lesson 8 - Style binding in practice

Dynamic Text Component Example: We use <p [style.font-size.rem]="textSizeRem"> to apply the value in rems of that property
dynamically to the p.

Progress Bar Component Example: Simple example where we modify the `[style.width.px]` based on the property and increase
it on click

Dynamic Text Component Example: We used <p [style.font-size.rem]="textSizeRem"> to apply the value in rems of that property
dynamically to the p.

Square Pop Up Component Example: 

div element that moves 10% from left to right on each click, with 90% at maximum

and toggle a pop up on click makes the pop up come from not visible in the screen on each


 ## Lesson 9 - Applying dynamic styling 2 - Class Binding

### Example No 1. Class binding: 

In html we simply get a given element, and add certain classes to it with class="".

However, by doing this way, they are hard-coded, they don't change based on expressions/logics, they will be always the
same.

In order to change this behavior and make it more dynamic in angular, we can make use of the class binding

Where the value is a property of the component and use a similar syntax to property binding.

Javascript, we don't have the reserved word "class", classes are usually referenced as classList and classNames. Angular
developers created this syntax with the reserved word `class`, that is used on property binding, and it is a shortcut for
us to be able to modify the classes of a HTML element.

e.g. `[class.css-class]="value"`

this way, it will conditionally apply the class based on the value

### Example No 2. Link the class attribute to some string ([class]="string")

```ts
  //Class property
  listClasses = "full-width outlined";

  // Class HTML
  <ul [class]="listClasses">
    Items
  </ul>
```

In this case, we make the property binding on the class attribute, without specifying any class, and the property that will
be on the class will be the string property defined in the ts file

### Example No 3. Link class attribute to an array of strings 

```ts
  //Class property
  sectionClasses = ['expandable', 'elevated']

  addClass() {
    this.sectionClasses.push('visible'); // Doesn't work

    this.sectionClasses = [...this.sectionClasses, 'visible'] // Works
  }
  
  //HTML
  <section [class]="sectionClasses">
    Section
  </section>

  <button (click)="addClass()">
    Add Class
  </button>
```

We must ensure immutability by creating a new array, spread the already existing classes, with the new one we want.

Now these three css classes are going to be applied to our `section`

### Example No 4 - Link the attribute class to an object ([class]="Record<string, any>")

In addition to arrays and strings, we can pass down an object

```ts
  // Class
    sectionClasses:any = {
      expandable: true,
      elevated: false,
    }

    closeSection() {
      this.sectionClasses.expandable = false // does not work
      
      this.sectionClasses = {...this.sectionClasses, expandable: false;} // works
      } 

    addClass() {
      this.sectionClasses = { ...this.sectionClasses, visible: true} 
    }

  // HTML

  <section [class]="sectionClasses">
    Section
  </section>

  <button (click)="addClass()">
    Add Class
  </button>

  <button (click)="closeSection()">
    Close Section
  </button>

  ```

  ### Example No 5. Linking with interpolation

```ts
  // Class
    classes = 'visible container'
    //or
    classes = { visible: false, container: true} // only the true is applied to the interpolation


  // HTML
      <div class="{{classes}}">Section</div>
```

We can even do ternary operations, like

```
  <div class="{{isLogged ? "visible container" : "hidden}}>Section</div>
```  

And interpolations with back-ticks, like

```
  <div class={{
    `
      container
      ${isLogged ? 'visible' : 'hidden'}

  }}>Section</div>
```

We can even have the same scenario as above, which would be

```
  <div class="container"
      class="{{isLogged ? 'visible' : 'hidden'}}">Section</div>
```

In this example, angular accepts that we use two attributes with the same name, using one for the static values and other
for the dynamic values.

















