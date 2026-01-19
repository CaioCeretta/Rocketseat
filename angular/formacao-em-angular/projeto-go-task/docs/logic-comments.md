## Lesson 1 - Creating the Service for the modal opening.

This lesson will focus on familiarize us on the angular cdk

Start by creating a services folder inside app, and creating a `modal-controller.service.ts`

Decore it with `@Injectable` and inside of that Injectable, pass a property `providedIn: "root"`. This way, any object that
it will always have a unique instance in all the app, and every component, will receive the same instance.

Install the angular/cdk package, enter the `material.angular.dev` to set up the Dialog component which will be used for
the modals.

Inside the service, define a readonly property \_dialog, and assign to it the `inject` function from `@angular/core`, and
inject the Dialog from the cdk. This is the basic set up we need to do to inject some angular cdk component.

The structure of opening a modal, is basically:

```ts
// _dialog is our property that we assigned it the `inject(Dialog)` into
const dialogRef = this._dialog.open(ModalComponent, {
  // options
});
```

The option objects have multiple properties that we can apply to the modal, like:
. width
. maxWidth
. height
. data (object we can use to pass values into the modal)
. and other properties we will see as the course goes on

We can notice that, by hovering up the `dialog.open` method, it expects it to return a `DialogRef`, which is essentially
an object that has an observable inside of it. With this, we are able to subscribe to that observable and listen when
the modal is going to close. As soon as a modal closes we can capture it, and receive the values being sent by the
modal, meaning that every modal method should return that dialog opening.

In the docs, we notice that the `dialog.open` is usually assigned to a constant named `dialogRef`, which would then
allow us to call methods like:

```ts
dialogRef.closed.subscribe((result) => {
  console.log(`Dialog result: ${result}`); // Pizza!
});

dialogRef.close('Pizza!');
```

### Observable Recap

The observable pattern is very common in Angular (specially with `Angular Material`).

### Handling the modal opening via service

We can notice that, by creating a service to handle all the methods to open the different modals, it becomes easy
to manage them.

Assume that we had to do the same thing in three or more different components in case they had to open the same modals.
And as the application gets bigger, with multiple services, modals, and so on, it would even be hard to "find ourselves
on it".

### Reuse stylings

Instead of passing the same modal stylings for each one of them, we can create a new private readonly property equal to
that specific object, and spread it on the options object

At first glance, i thought that i could pass the entire modalSizeOptions property as the `DialogConfig` parameter. However,
this would only work if it was a complete configuration object. But it is only part of the `DialogConfig`.

Using the spread (...) is a great practice because by doing { ...this.modalSizeOptions }, the dialog will understand that
the properties contained by that object are part of the dialog configuration and would'nt complain.

### Angular Material

Angular Material is a library of UI Components inside of angular. It is similar to shadcn but it with some differences

• It is an oficial library of UI components for Angular
• It is based on Google's design system: material design
• Includes "out-of-the-box" components like buttons, cards, dialogs, tables, inputs, navigation, etc
• It is specifically designed for angulr projects, with deep integration to the framework (modules, DI, forms, theming, etc)

Shadcn/ui in other hand

• It is created for React, usually used along with TailwindCSS
• It is not a complete design system by itself, it's more like a set of configurable components and utility stylings
• It is inspired in good accessibility practices, but doesn´t strictly follow something like **Material Design**
• It is "low-level", focusing on flexibility and customization wit`h TailwindCSS.

### Angular CDK

Angular CDK is angular's component dev kit, it is, in summary, the engine behind Angular Material, but we can use it
by itself, with no built styling.

It is a low level set of tools to build angular components, focusing in behavior and logic, not styles

We can think of it like

**Angular CDK** = behavior
**Angular Material** = behavior + visual (material design)

```

```
