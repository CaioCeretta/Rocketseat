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

