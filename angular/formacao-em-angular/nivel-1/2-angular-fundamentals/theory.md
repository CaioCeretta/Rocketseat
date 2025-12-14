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

## Lesson 2 - View Encapsulation Strategy
