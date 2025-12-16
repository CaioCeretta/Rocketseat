## Lesson 1 - View Encapsulation

### What is View Encapsulation? 

It is essentially a angular concept that will be used to encapsulate our view, basically its view/template and CSS.

### But what is the problem of having global stylings?

Assume a scenario where every class created in the app, independent of being in the style.css or the component css. Every
class we create is going to be shared across all components.
It would lead to very maintenance problems, since we would create a class that could affect other component that is not
related to it, because we may be using classes with the same name, and so on — Principally if the project is very extensive.

### How does view encapsulation helps with this? 

It encapsulates the styles created in our components for them to affect only the HTML elements of THAT specific component,
and not the other components. This way we are able to, for example, create a `container` class on the component a and
other `container` on the component b, without they clashing with each other because they will be encapsulated on their
components. However we need to be careful with creating a class with the same as a global one, so we should always look
for prefixing global variables to avoid this.

### Three main strategies

**1. Emulated**: 
  
  Emulated is the default angular strategy. It emulates the styles encapsulation without using the real Shadow DOM

  • How it works:

  Angular:
  
  . Adds unique attributes to the component elements

  ``button _ngcontent-c1></button>`

  . Rewrites the CSS

  `button[_ngcontent-c1]{...}`

  **Result**: The styling affects only the component, they don't leak, but global styles may still affect them.

  **Pros**
  . Works in every browser
  . Good balance between isolation and compatibility

  **Cons**
  . Not real encapsulation
  . Global styles may "enter"
  
  **When to use it**
    Almost every time. It is the default by a good reason.
    
**2. Shadow DOM**

  **What is it** 
  Uses the browser real Shadow DOM, like Web Components

  **How it works**
  The component's template stays inside a #shadow-root

  ```html
    <my-component>
      #shadow-root
        <button>Click</button>
    </my-component>

  **Result**
    . 100% isolated styles
    . Global styles do not "enter"
    . Component styles do not leak

  **Pros**
    . Real encapsulation
    . Total predictability

  **Cons**
    . Global styles (ex: Bootstrap, Global Tailwind) do not work directly
    . Harder to visually customize
    . Might complicate SSR and Tests

  **When to use it:**
    Design systems
    Web components
    Reusable components between projects

3. None

  **What is it?**
  No encapsulation

  **How does it work?**
  The component's CSS is used directly in the global scope

  `button { color: red;}`

  **Result**
  . Styles leak across the entire application
  . Other components may be affected

  **Pros**
  . Useful for global styles
  . Simple

  **Cons**
  . High risk of conflicts
  . Hard to maintain in large apps

  **When to use it**
  . Layout components
  . CSS resets
  . global themes


### Why do angular needs this? 

To improve maintenance, reuse, and so on.

### Preventing ng generate to create the unit tests file.

Modify the angular.json and add a rule to skipTests

  ```
    "@schematics/angular:component": {
    "skipTests": true
    }
  ```

### Product-Card component

Start by generating two components `product-card` and `user-details` and reference both of them in the app component

If we modify the p color globally and the font-weight on the user-details component, we will see that only user-details
will be affected by the weight change, because of the encapsulation. However, if we pass another parameter, beneath the
styles property of the @Component directive and say that the encapsulation of the user-details is none, the component will
start behaving as a non-encapsulated component and also affect the product-card, because its styles are basically going
to work as globals.

We can also notice that by inspecting the component, it is treating that style as a global one. But by replacing None with
Emulated, we will see that angular came back to its natural behavior, and added a random class to the p tag so it does'nt
conflict with any other component.

## Lesson 2 - View Encapsulation Emulated Strategy

Default angular behavior so the styles do not conflict with other components. Strategy used by 99.9% of the cases.

Component styles are restricted to the component's scope itself. Global styles still affect them, and they can directly
style the children within the component's template, but not on the children's own templates.

### Modifying angular specific attribute

We must be cautious and avoid modifying those specific selectors, like creating in style.css something as

```
<!-- Exact attribute selector -->
p[_ngcontent_ng-c3432423] {
  <!-- Styles to be applied only to the element that contains  this specific attribute -->
  color: blue;
}
```

This is troublesome because

1 - We won't know which component it is affecting
2 - If we need to refactor the components, be it by replacing, modifying its position, this attribute may end up changing.

### Angular not putting specific attributes on components

Even though a component may have the default view encapsulation, angular may not put attribute on every component because
it may not find it necessary, components that don't have specific styles and so on, usually don't have any.

By adding a single style to one of these components, angular will apply an attribute

### Custom button component

`product-card` is going to be the parent of this component, and even though that component has styles for the p tag and
button has a p tag, we will notice that it won't affect this component won't be affected by it.

But assume we want to change the styling based on a parent's logic. We can do this by passing to it, custom attributes to
the child, like `<app-custom-button [changeColor]="value"></app-custom-button>` and based on that value property inside
the parent, execute some logic.

## Lesson 3 - View Encapsulation - None strategy

Basically the styles used inside the component are treated as global and can affect all other components and not only itself.
Since it does not have scope attributes.

And we should not use it unless it is extremely necessary.

## Lesson 4 - View Encapsulation - Shadow DOM strategy

It is a more complex encapsulation and we are almost never going to use it. 

We are probably going to need it when creating web components. that are reusable components.

Web Components are reusable, front-end only, micro-frontend building blocks. They are primarily chosen because the Shadow
DOM fully encapsulates their logic and styling, preventing style leaking to the external page. While most global styles
are blocked, it's important to remember that CSS inherited properties (like font-family and color) will still cross the
Shadow DOM boundary. This strong isolation makes them ideal for Micro-Frontends to prevent CSS and DOM conflicts.

Essentially:

Component Styles: Shadow Host styles will be considered global inside the ShadowDOM.
Global Styles: The page global style and styles defined in the styles.css won't affect the components inside the ShadowDOM.
Child component styles: Child components inside the ShadowDOM are not affected by the page global styles.

### Example:

Assume we have a web application that will load multiple web components, that are custom components which have a specific
responsibility. Such as a button that makes an HTTP request and a specific processing, it is a separate project that can
be reused in multiple web pages and two other web components inside that app

Inside our app, we have our global styling, but we don't want our app styles to conflict with the web component's specific
styles. Because let's say that our styles.css have a container class and each web component also have its container class.

Without ShadowDOM they would end up conflicting, and this is the central idea.

ShadowDOM is a browser's functionality, not exclusive to angular itself. 

Now, assume we have defined in the global css that the button background color is red but we have a component, that defines
that same background-color blue and it has a shadow dom encapsulation. This will make this component to ignore the global
styling and apply the component's style.

We can even notice that by opening the developer tools, we see that this component is now wrapped on a
```html
#shadow-root (open)
<style>
...
```

Almost as if it was its own app. We can notice how it is not angular specific, but a browser API when defining a <video>
tag. Opening the dev tools, we will also see that the video has a #shadow-rot because it doesn't want the global styles
defined by us to affect its own.

## Lesson 4 - Using the host and host-context

How to use the pseudo classes :host and :host-context

Create two components, one child component, and one shadow host.

:host points directly do the component's selector, not to the html elements inside the component. 

Every time this tag is reused on the app, or if we have a web component that we want to delimit its sizes, and more, we
can use the :host. Therefore, for every style we create inside the component, targeting the pseudo class :host, the styles
are going to be applied to that selector.

The child component will have five different variations based on given attributes.

Meaning that, when we implement the app-child if it has an attribute, for example, child is a child of shadow-host which
uses the ShadowDom view encapsulation strategy. If we pass one of these attributes a child expect, like `theme=primary`,
it will apply the styles defined in the child 

This way, we are simulating different reuses of the same component inside the app with different styles or behaviors. 

### Host context

The host context is based on the parent element that implements our host .

So basically, inside the parent component that calls the child, if we wrap the child calls with a div and add a class to
it. This div will be the **host context**

### Reinforcement Note

When a Shadow DOM component defines a style like color: red on a parent element, all elements inside its Shadow DOM
context, including those inside child components, will inherit this style, provided the property is CSS-inheritable.

However, this mechanism is specific to the native browser implementation of Shadow DOM. It does not mean that the same
component, when used inside an Emulated component, will inherit the parent's styling (due to the CSS scoping attributes).

## Lesson 4 - Using the :root pseudo class

This pseudo class is used to directly access the HTML of our page. Commonly where we define the variables that can be used
across the app.

Inside styles.css, create a `:root` selector, e.g.

```css
:root {
  --primary-color: orange;
  --secondary-color: grey;
}
```
Now, these variables can be used inside every place of our application, even if it is a ShadowDOM.

And we can also define default dimensions, that we are going to use all across our design system

### root variables inside the ShadowDOM host

Inside the shadow host, which is the component defined as shadow dom, we can utilize something like

```css
:host {
  --shadow-color: blue; 
}
```

This shadow-color variable, will be available across every component inside this shadow root. So if  we go into the child,
and utilize var(--shadow-color), it will utilize the given color


## Lesson 5 - Flow Control and Template Variables

Pretty similar to js, with the difference that it is more focused on the component's  template

- @if, @else-if and @else

. Focused on the structures, we can decide which HTML element we want to show based on conditionals.

And this comparison is usually made using the component's class properties

- @switch

Similar to if

- @for

Used to make loops over a list. And for each item of the list, we can show an HTML element, infos about the item, and so
on.


- @let   

Angular's new directive that allows us to create a variable inside the template and easy the reading/organizing of our
flows.





