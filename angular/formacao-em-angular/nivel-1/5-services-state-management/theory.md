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



 






