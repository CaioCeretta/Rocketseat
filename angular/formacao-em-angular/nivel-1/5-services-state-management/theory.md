## Lesson 1 - Services?

### What are angular services?

In angular, while `@Input()` and `@Output()` are essential for direct communication between parent ad child, they become
problematic as an applications grows. Services offers a more scalable way to manage data and logic

### The Problem: Coupling and "Prop Drilling"

Imagine a component tree: a **Container** (Parent) holds several **Child** components, which in turn hold **Grandchild** components.

If a Grandchild needs data from the Parent, the Child must receive that data via @Input() solely to pass it down, even if
the Child doesn't use it. The same happens in reverse with @Output(): for a Grandchild to notify the Parent of a change,
the event must "mix" through every intermediate layer.

### This creates two major issues:

1. **Tight Coupling**: Components become dependent on the structure of others. Moving a component to a different part of
the app breaks the communication chain.

2. **Maintenance Burden**: Any change to the data structure requires updates to every component in the "cascade," making
refactoring difficult and error-prone.

### **The Solution**: Centralized State with Services

• **Centralize Logic and State**: The list of products and the functions to add or remove them live in the Service, not
the component.

• **Persistent Data across Routes**: When you navigate from "Route X" to "Route Y" components are destroyed and recreated.
Services (typically provided at the root) stay alive, allowing data to persist during navigation.

• **Direct Communication**: Any component, regardless of its depth in the tree, can "inject" the service and access the
data directly, bypassing unnecessary intermediaries.

**Key Takeaway**: Components should focus on Presentation (how things look). Services should focus on Logic and Data
(how things work).

### How do services fix this?

Now assume this other scenario:

A service is a TS class that will be instantiated in our app. Inside it, we may have methods, properties, and everything
we have already seen in the component's classes.
The cool thing about services is that it can have a single instance in the whole application. Which means that any component
that inject this service — create an instance of that service — all these components will get the same instance. Which
will make the properties to have the same values, the methods will affect the same memory references, and so on. This way, 
we are now able to reuse the values stored inside that service.

### Decoupling scenario

In the first scenario, where we have every child component coupled to the parents, "grandparents", and more, can now have
the child components decoupled from the parents. They still can be inside a container component but the data flow/state
is no longer in the parent but in the service, and now the component's can simply consume that service in order to get
its values.

The list is no longer managed inside the container, our service will hold the products list and contain methods that
will alter that state in a centralized place.

We now have a reliable place and it will be the only place holding the logic to modify the state. Component's should not
be able to directly modify the list. Having a reliable "source of truth" that modifies the list, will greatly improve the
flow and data structure. Since if we have a problem on that list management, we will know exactly where need to make the
given fixes. 

### Http call scenario

Let's say that component itself makes the HTTP requests to the server. But this is not what actually happen.

Assume we have a component that makes requests to an API server that has its endpoints to recover the user list, and so.

Usually, we don't make the component to directly fire the HTTP calls to the server. A component is used for managing
itself, what information the user puts on the screen , what it displays or not, and what it will process.

The state management and the HTTP calls are not made directly by it.

We commonly have a service to intermediate this communication. Such as HttpClient services, or other services used to
inject the given libraries and it will be the one to make these calls for us.

So our component will inject the service, call a method of that service (that contains the implementation of the HTTP
call), and repass to the component that requires the list and displays it on the component.

### Other scenarios/strategies to use them

Some times we want to create a service that is specific to a given component. Because many times we have components that
it is already complex by itself, with its own functionalities, and by doing the data management inside of it, it will
become a mess. Therefore, sometimes it is a good option to create a service that will be injected only in this component
and consume it.

## Lesson 2 - Creating a service and injecting it.

Create a new `products.ts` component and a `products.service.ts` each one on its own folder.

The way we create a service and make it in a way it becomes available to be injected in other components is by using the
decorator `@Injectable({providedIn: 'root'})`. the providedIn property defines the scope and the lifecycle of our service.

In our service, we are first going to define the products array, and define a method to add new items to that state.

After defining the service, go back into the component and add the line

`private readonly _productService = inject(ProductsService);`

this way, we are creating a property productService, that injects that service, and allow us to execute its methods through
this property.

The `readonly` is used for us not to assign a new value to the property, because it will only store the instance of that
service.

In case the instance has already been generated, it will reuse the existing one. If not, create it.

### List rendering inside the component

The simples and best away to ensure that the component always sees the updated list of products is by using a get.

So to a property of products always have the updated value, we use
```
get products() {
  return this._productsService.products
}
```
By using `get`, angular consults the service every time it needs to render it, what would be different if we simply create
a property of

`public products = this._productsService.products`

Because when angular executes its cycle of change detection, it calls `get products()`. Since the getter return the current
products. It always fetches the more recent version of the array stored in the service.

 

### Memory reference

One thing we need to be careful is, either objects, arrays, or arrays objects, we are dealing with memory references. If
we have an object created we have a memory reference and if any component modifies that reference, it will affect "everyone"
that is consuming that memory reference

### Global Singleton

1. Service is a global singleton

When using `root`, angular creates a single instance of that service to be used across all the appS

• If `Component A` modifies any variable inside the service, `Component B` will see this change instantaneously.
• It is exactly what ensures that the service work as a "Single Source of Truth"

2. Available in any place (Dependency Injection)

We don't have to import  the service in the array of `providers` of any module (`AppModule`, for example). Angular automatically
"registers¨ the service in the root of the app. We just need to declare the service in the constructor of any component,
and Angular will know where to fetch it.

3. Tree-Shaking (Performance Optimization)

This is the most "ninja" technical advantage. The `providedIn: root` syntax makes the service "tree-shakeable"

• **How it works**: If we create a service, but for some reason, we end up not injecting it into any component, the Angular
compiler is smart enough to exclude that service from the final bundle sent to the browser
• This keeps our application lighter by removing "dead code" that isn't actually being used.


## Lesson 3 - Service with single instance and multiple dependency injection

Start by creating two other folders under example-1 folder. A products-counter and a products-list

Move the list of products to the products-list component, copy the dependency injection to that list component and
create the getter. As well as calling injecting the service to the counter

Both the list and the counter will be inside the product component.

Doing this, with every component having a reference to the service, it would be much cleaner than having to pass that service
from the product as an Input, inside the products-counter and inside the products-list. Each one of them is communicating
with the same service and same state. Without modifying it directly inside the component, the state is centralized on the
service and he is the one handling it.

In order for the counter to work, we must make use of the `getter`

### Getter

In our original code, we were using a class property. On angular (and on javascript in general), a property is like a "box".
If we put a value inside of it, it will remain still until someone modifies it manually.

By using a `getter`, we transform that property in a "disguised function".

1. A getter doesn't store a value, it executes logic.

  When writing `get productsQuantity()`, we are telling Angular: "Every time that you need to draw this value on the screen,
  do not search for it inside a box, go to the service and count it again.

2. The change detection cycle

  The reactivity "secret" is not on the getter alone, but in how angular works:

    1. **The Event**: User clicks on "Add to Cart"
    2. **The Change**: `ProductsService` adds an item to the products array
    3. **The Detection**: Angular notices that something happened (a click, an api answer, etc) and begins its change
    detection cycle.
    4. **The Re-Render**: Angular looks to the HTML and sees {{productsQuantity}}
    5. **The Execution**: Since `productsQuantity` is a `getter`, angular executes the code inside of it on that exact
    moment. He accesses the service, sees that the length is now five, and updates the 
    
### Negative point of Getters

Even though a getter solves the reaction issue, it has a cost: Angular can call that **getter** dozens of times by second
(every time any thing changes on the page). If inside the getter there were a heavy calculus (Such as filtering a list of
10.000 itens) our application would become slow.

That`s why, in modern angular, using **Signal** is preferred

. Getter: Angular "asks" what is the value all the time
. Signal: Signal warns angular: "Hey, my value has changed, update me now"









 






