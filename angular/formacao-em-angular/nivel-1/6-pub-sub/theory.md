## Lesson 1 - Pub-Sub Introduction


That pattern is essentially having a **Publisher** — that emits values, and a **Subscriber** that receives those values
whenever a change occurs. This approach is superior to direct property access because it centralizes state management and
prevents side effects.

For this project, we will basically copy the components from the previous project.

Inside products.service, how would it be if we would like to always send a copy of these products to whoever is consuming
that property.

### The Problem: Memory reference and mutation

As we remember, with the mutation, components had direct access to the service's array. Since arrays in JS are passed by
reference, a component could accidentally mutate the list (using splice, push), affecting the data across the whole app
without the service "knowing"

While using `structuredClone()` to provide a `productsCopy` prevents direct mutation of the original array. It introduces
a new problem: The component doesn't know when the data has been changed, it relies on Angular's change detection cycle
to fetch for updates in the template, making it difficult to trigger logic inside the TS class when the list is updated.


### The Solution: `RxJS` Behavior Subject

A `BehaviorSubject` is a special type of Observable that acts as both an observer and an observable. It has "superpowers"
compared to a plain "observable" that only emits values.

RxJS also makes use of the **Late Subscription**, meaning that any new subscriber immediately receives the last emitted
value.

### Implementing the "Private Source/Public Stream" Pattern

To protect our data, we follow a strict encapsulation pattern

1. Private Source: We define the `BehaviorSubject` as `private`. This ensures that only the service can emit new values
using the `next()` method.
2. Public Stream: We expose the data as a "read-only" Observable (conventionally named with a $ suffix, like products$).
Components subscribe to this stream but cannot push data back into it.

### Transforming Data with `.pipe(map(...))`

`.pipe()` operator allows us to chain operators to process the data before it reaches the subscriber
`map()` operator intercepts the emitted value, allows us to transform it (e.g. filtering, sorting, or formatting), and
then passes the transformed result to the subscriber

### Adding new value to the products array

We use the this.products.getValue() and preserve the immutability with

[...this.products.geValue(), { id, name, price }] and assign it using the `.next` function.

#### `next()`

Next is the method used to "push" (emit) a new value into the `BehaviorSubject` (or any `Subject`)

If we imagine the `BehaviorSubject` as a water pipe, `next()` is the faucet. Every time we call it, a new "drop" of data
flows through the pipe and reaches everyone who is subscribed.

Therefore, when we utilize it, we are publishing that new updated list, storing that list inside that instance to whoever
is subscribed to that list, who will receive a copy of that list.

### Filtering the list

The `.getValue()` that retrieves the current value of that publisher, can be chained with a `.filter()` method, which
receives as callback, the current item being iterated.

And like the adding, since we are updating the value, pass a next(newConstant)

#### Subscribing to the publisher

Our products component, can no longer access the products directly. But by subscribing to it on the ngOnInit method,
with: 

```ts
  	productsList: any[] = []

    ngOnInit() {
      return this._productsService.products$.subscribe((productsList) => {
        console.log("Products Component, products list", productsList);

        this.productsList = this.productsList
      });
    }

```
where product$ is the name used asObservable to the products private property

### `modifyList` method

We can now longer attribute an empty array to the productsList, because we are receiving a memory reference that is not
the memory reference that is stored inside our BehaviorSubject. 

Therefore, if we try to make the productsList to be null, it is still a copy we are subscribing to, the original stays
intact.

### Counter and List comp

In the counter we have two options.

1. 

Since we are just using the counter on the template, and we don't have to use it in the component, we could simply use an
async pipe.

To use it, import the AsyncPipe in the component's ts

and use the pipe directly on the template with `{{ (_productsService.products$ | async)?.length}}`


2. 

The Reactive way, which is the best practice. If we want to hold the current count, we can also use an **Observable**, and
`map` operator. This will keep our data stream "alive"

So, inside our component's ts, create a new property `productQuantity$` (the $ suffix is commonly used for us and to
other developers identify it at glance that the variable is a Stream (Observable) and not a static value, reminding
us that it can't be treated as a normal variable.)

And we would be able to use it as: `<p>Quantidade de Produtos: {{ productsQuantity$ | async}} </p>`

But why is the async pipe still necessary? We need to because we are dealing with an observable, and the property
productsQuantity$ does not eliminate async, it just simplifies and organizes the logic

In the first example the template does the logic and it becomes repetitive in case we have to use in more places.

The second example is cleaner because we are calculating the length in the component's ts, simplifying the logic in the
TS (Where it should be), it is reusable and easier to evolve.


**Key Point**: Even though we may think that the property might avoid the use of async, productsQuantity$ is still an
observable. And one needs async or subscription.

### Refactoring

1. Instead of manually subscribing to product$, use the stream directly on the template with, after defining the products$
property in the `products-list` component

```
  @for(product of (products$ | async); track product.id) {
    ...
  }
```

Why?

This transforms the component in a pure react ive component, removing the manual data managing.

1. Memory leak prevention

  • **The problem**: In our code, when we move out of the scr een and the component is destroyed, this subscription remains
  alive on the browser memory. With time, this slows the app.

  • **The solution**: By using product$ | async in HTML, Angular subscribes and unsubscribes automatically for us.

2. Automatic Sync (Single Source of Truth)

  In our code, we were creating a local copy of the products list

  • Problem: If we have an error inside the logic, or try to clean it locally (like the `modifyList`), the component stops
  reflecting what is on the service. We end up having two different states

  • Solution: By consuming the observable directly in the HTML. with the `async` pipe, the component does not store data.
  He simply reflects what the service emits. There is no risk that the data is out of sync.


## Lesson 2 - What is an Observable

In this lesson we will learn more about observers and how to use `BehaviorSubject` to manage our app state.

Inside the `components` folder, create a new folder for this example. Start by creating an `observables` component
and declaring it inside app.html.

**Implementing the Observable**: In the component class, implement `OnInit`, and call a `createObservable()` method. This
method will instantiate a new `Observable`. The `Observable` constructor receives a callback (the "producer") which takes
a **subscriber** as a parameter. This subscriber is responsible for emitting values.
 
While we previously used `BehaviorSubject` to emit values via `next()`. The standard `Observable` works similarly:
Inside the constructor we call `subscriber.next(value)` to push data to listeners.

**Subscribing Manually**: To see these values, we must **subscribe**. In `ngOnInit`, after initializing the observable
property, call a method name `subscription1(). Since `createObservable()` returns an Observable, assign it to a local
property (e.g `MyObservable$`). We should also define the emission type using generics, such as `Observable<string>`

In `subscription1()`, call `this.myObservable$.subscribe(...)`. This triggers the logic defined in the constructor and 
allows us to log the emitted values.

**Memory Leaks & Unsubscribing:**: When we manually subscribe in TypeScript, the subscription remains active in memory
even if the component is destroyed (e.g., removed by an @if), to prevent memory leaks, we must manually unsubscribe.
Implement OnDestroy() and inside ngOnDestroy() call .unsubscribe on the Subscription object returned by our initial
`.subscribe()` call.

**Automatic Subscription with AsyncPipe**: The `AsyncPipe` is a cleaner alternative that handles both subscription and
unsubscription automatically. This is ideal when we simply need to display data in the template without additional
logic in the TS file.

So it is basically

1. Create `createObservableList()` that returns an `Observable<string[]>`
2. Assign it to a property called `observableList$`
3. In the HTML template, use the @let syntax: @let namesList = observableList$ | async;
4. iterate over `namesList` using a @for loop to display the data.

## Lesson 3 - RXJS operators

This lesson will be focused on `filter`, `tap`, `map` and what they are used for.

map: Transforms the emitted values before reaching the subscriber, such as manipulating the data
filter: Allows us to select only the values we want and meet some condition
tap: Used for executing collateral effects, like logs, without altering the flow

These methods are used to manipulate the data before they reach the subscriber. So for example, it reaches the subscribe
we can transform it to * 10, and so on. We can use it via pipes.

First, on the ngOnInit we will create a new property named subscriptionUppercaseList. Our observable that returns us a
list of names is the `observableList$`.

The way we can use to make all the names uppercase before reaching the list is by using pipes

pipe is where we put all rxjs's operators, where we can handle all the emitted values emitted by it.

Each operator will be a parameter in that pipe method, like:

### But isn't this similar to what we were doing with the BehaviorSubject in the products service?

Yes. Every time the BehaviorSubject, which is our observable, emitted a value, we wanted to send a clone of that list
being emitted. And we used the `.asObservable.pipe(map((products) => structuredClone(products)))`

And everyone who subscribed to that observable, would receive this clone.

### map example
```ts
	subscriptionUppercaseList() {
		this.observableList$
      .pipe(
        map((list) => {
          return list.map(name => (
            name.toUpperCase()
          ));
        })
      )
      .subscribe((list) => {
        console.log("List: ", list);
      });
  }
```
In this example, we are using rxj's map along with js's array map to get each item of the emitted list and transforming 
it to uppercase.

### filter example

Different from map, filter needs to receive a callback that returns a boolean. Meaning that the value will only fall into
the subscribe, in cause the condition evaluates to true.

```ts
	oddSubscriptions() {
		this.myObservable$
			.pipe(filter((number) => number % 2 !== 0))
			.subscribe((number) => console.log("Odd number: ", number));
	}
```

filter will receive the numbers being emitted, and check whether they are odd or not and returns to the subscriber.

### tap example

Tap is another property of pipe used for logging, we can add it to the example above by adding

```ts
			.pipe(
				tap((number) => console.log("Tap: ", number)),
        filter(...)
        ...
```

## Lesson 7 - Class Subject

### Special types of observables

1. Subject:

**No memory:** New subscribers only receive the values emitted AFTER their subscription. They do not have access to previous
values.

**Multicast**: It transmits a single sequence of values for all its subscribers. A single `next()` call notifies all the
subscribers

**Data source and Observer**: A subject acts as both an **Observable** and an **Observer**. This means we can subscribe
to it, but also manually trigger events using `next()` 

With subjects, we have explicit control over when new values are emitted, and all subscribers receive those values. With
a pure Observable, the emission logic is encapsulated inside the observable itself, so we don’t externally control when
values are emitted.

Code example
```ts
  import { Subject } from 'rxjs';
  const mySubject = new Subject<string>();

  //Emit a value, but there are no subscribers yet
  mySubject.next('This message will be lost');

  // First subscriber connects
  mySubject.subscribe(value => {
    console.log('Subscriber 1: Received the value: ', value)
  })

  // Second subscriber connects
  mySubject.subscribe(value => {
    console.log('Subscriber 2: Received the value: ', value)
  })

  // Emit new value. Both subscribers 1 and 2 receive
  mySubject.next('This message will be received by both');
```

So, for this example, we create a new `SubjectComponent` which will implement onInit.

First we define a property mySubject$ with the type of Subject<string> and assign to it a new instance of rxjs's `Subject`.

### First subject implementation

Inside ngOnInit, the first thing we  will do is call that subject, and use `next()` to print out a new string. The
"radio station" broadcasts the message, but since no one is subscribed to that subject yet, the value is emitted into
the void and disappears. It is **not stored** inside the Subject.

`this.firstSubscription` will create a new "tuned in" listener. As a result, the subscription is active, but it doesn't
receive the previous message because a `Subject` does not have memory.

setTimeout(...) (3 seconds later)

The "radio station" broadcasts "New Emitted Value". As a result, our subscription is active, and the console.log
"First Subscription: New Emitted Value" shows.

The "value" inside the subscribe parameter, is the argument that was passed by the function `.next()` at the moment of
emission.

### "Pushed" flow

Different from a common function, where we "ask" for a value, rxjs's observable pushes that value to us.

1. `mySubject$` acts like a **pipe**
2. When we call `this.mySubject$.next("Hello")`, we are dropping data into the pipe
3. The `subscribe` is like placing a bucket at the other end of the pipe
4. The `value` is exactly whatever falls into the bucket at that specific moment.

### When should we use subjects?

In our app, when we need values that are not necessarily the latest emitted value (stateless events), we can use `Subjects`.
They are very good for communication between components.

Normally, we place the subject inside a service, instantiate that subject, and since the service is typically a
single instance in the app, "everybody" that injects that service and subscribes to that subject, will be listening
to the events (emits), that it makes. This is a common pattern in Angular

**Note: to prevent memory leaks, we must always call .unsubscribe on ngOnDestroy lifecycle hook**

### Example 2

Add a button to the subject component template to subscribe to that subject and notice that it won't receive the first
value emitted by the subject.

If we create a click handler that subscribes to that subject, nothing will happen initially, it won't see the first value.
The only way for the second subscription see an emitted value is if it subscribes before the five seconds. next emission

### Conclusion

Subjects are widely used when we want to facilitate the communication between components, or we want to notify one component
that something has happened.

Assume we have a component where when we perform some action, we want to notify another component that is not directly
related to it. In order for us to avoid prop drilling (passing data through many layers of Inputs and Outputs), we can
use this pattern of creating a service, having a subject inside that service, and when something occurs inside that one
component, we notify the subject via `.next()` and the other component will be subscribed to the same subject.


## Lesson 8 - Class BehavioralSubject

With BehaviorSubject, we can control when it does the value emission and also knows who is subscribed to it.

**Different from Subject, where new subscribers don't receive the last emitted value.**

**Stores a initial value**: It always starts with a default value, this ensures that, even before some value gets
emitted, a new subscriber will have a value to work with.

**Stores the last emitted value**: It stores the last value that was sent to it, If a new subscriber connects, it will
immediately receive this last value.

**Works as an Observable**: It can be signed (subscribe()), and emit the next value for all its subscribers each time
next() is called.

Code Example:

```ts
import { BehaviorSubject } from "rxjs";

// Start with a default value: "Initial Value"
const myBehaviorSubject = new BehaviorSubject<string>("Initial Value");

// Subscriber 1 connects to it. It immediately receives the "Initial Value"
myBehaviorSubject.subscribe(value => {
  console.log(`Subscriber 1: Received the value: ${value}`)
})

// Emit a new value. BehaviorSubject stores "New Message"
myBehaviorSubject.next("New Message");

// Subscriber 2 immediately receives "New Message"
myBehaviorSubject.subscribe(value => {
  console.log(`Subscriber 2: Received the value: ${value}`)
})

// Emit a third value. both subscribers one and two receive
myBehaviorSubject.next('Third Message');
```

#### The main difference between a Subject and a BehaviorSubject is that a Subject does not have memory. It does not store
the last emitted value, and because of this, new subscribers don't receive past emissions.








## Callback Remember


### 1. Simple example:

  A callback is simply a function that we pass as an argument to another function, so it is called afterwards.
```ts
  function sayHi(callback) {
    callback();
  }

 sayHi(() => {
  console.log("Hi!);
 })
```

• () => { console.log('Hi!) } is the cb
• sayHi does not know what the function does
• He just executes


#### 2. Observable Example

When we make something as

`new Observable((subscriber) => { ...}`

What we are doing is passing a callback function for the `Observable`

. This function is not called by us
. Who calls it is the Observable internally

### 3. Where does the `subscriber` comes from?

We chose the name subscriber on that function, it could be any name like: `new Observable((banana) => { ...}` or `observer`.

• The name does not exist in our component
• It is automatically created by the `Observable`
• RxJS passes this object as an argument when it calls its callback

### 4. So what really is the `subscriber`? 

`subscriber` is an object that RxJS gives us.

It comes like:

```ts
  subscriber = {
    next: (value) => {},
    error: (err) => {},
    complete: () => {}
  }
```
It`s through that object that we send data to who is listening to that Observable

### 5. What fires that callback?

The code `this.observableList$ = new Observable((subscriber) => { ... });` 

Does not execute anything, the code only runs when some subscribes to it

`this.observableList$.subscribe((value) => { console.log(value); })`

At this moment

. `subscribe()` is called
. RxJS creates the `subscriber`
. RxJS calls the cb function
. `subscriber` arrives as argument

### 6. Entire flow

```ts
this.observableList$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next(["Caio", "Alex", "André"]);
  }, 5000);
});
```
What happens here is

1. We define the observable
2. Nothing happens yet
3. Someone calls the `subscribe()`
4. RxJS creates the `subscriber`
5. RxJS invokes the function `(subscriber) => {...}`
6. After five seconds: `subscriber.next([...])`
7. Whoever is registered receives the value

### 7. A simple analogy

Imagine this:

```ts
function faucet(callback) {
  callback({
    water: "drop"
  })
}
```
then, we call
```ts
faucet((thing) => {
  console.log(thing.water);
})
```
• Thing did not exist before
• The function water created it and passed it
• We just chose the name

`Observable` does exactly that, but for async data.

### 8. Summary in one sentence

`subscriber` does not come from the component. It is a parameter of the callback function that RxJS calls, and we chose
the name




### 9. Quick Analogy

We can think that, in the Observable callback parameter

RxJS creates a special flask (subscriber), with some valves that are ready
He provides the flask to the function (subscriber)
Our function decides when to open the valve and let the liquid flow

Translating this to code:

• The subscriber
  . Is already mounted
  . With the `next`, `complete`, `error` valves
• Our function
  . Does'nt create the liquid
  . Does'nt store the liquid
  . Just liberates the flow

### Addressing The Confusion

First, we need to understand that the subscriber parameter on the new Observable does not represents us but WHO WILL subscribe
in the future.

Even if we hadn't called the `.subscribe()` yet.

When we create an observable, what we are doing is
. Defining the behavior
. Don't fire anything yet
. We don't create the subscriber
. We don't subscribe

What will create a subscriber is in the moment something subscribe to it. And in this moment:
. RxJS creates the object
. This object represents the subscriber
. Calls our function passing that object
. This object reaches the parameter we called subscriber

#### So why that name to the property?

. It is the receiver side
. It represents the active subscription

But inside the new Observable(...), we are in the role of a `Publisher`, not consumer

#### Best terms

`new Observable((observer) => { ... });`

In the docs, this is the most common term

Or Even

`new Observable((emit) => { ... });`.

Therefore, we are creating an observable. But the function parameter represents a future subscriber, and that property
name represents this future role















