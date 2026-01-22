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

/* The dialogRef which we are returning, has a closed property, which is an observable, we subscribe to that observable
and the anonymous function gets executed everytime the modal/dialog reference closes and we are able to get, inside the
function parameter, the value being emitted by the modal
```

For testing, inside the app's html, alongside with the ts, define a button which clicked opens a modal.

Inside the ts, create a private property and assign to it the inject(ModalName), create a openModal function and in
its body, call the openNewTaskModal() from the service and replicate it to the comments modal

## Lesson 2 - Making the creation/edition modal dynamic with mode flags

In this lesson, we are going to pass the mode of the modal on its opening. By mode we understand that i may be creation
or editing. Based on it, we will edit its title and the button text. For this, we will use the `data` property of the modal
configuration.

Other than the properties to modify a modal display, such as height, width, maxWidth, we also have the `data` property.
The `data` property is a dynamic object where we can pass any property into it. We are able to capture that object inside
our modal.

Initially we are going to pass the `mode` attribute, which will define what we want to display in the modal, in this case
'create' and 'edit'

### TaskFormModal Component

Inside our task form component class.

Start by defining a property \_data and assign to it the call to `inject(DIALOG_DATA)`, this injects the data provided in
the dialog configuration when this modal opens via the `Dialog.open`

• DIALOG_DATA: Injection token from angular material that holds the value defined in the modal data.

Now that we can access that property inside the HTML. However, we need to notice one thing, when we hover over the property
\_data, which the DIALOG_DATA was injected to, we can notice that it has the type of any.
It is very common in companies like angular, that they leave the typing of any. But typing as any, makes the code intent
harder to understand, and for it, we usually create interfaces to define the shape of the data.

Outside of the @Component directive, define the interface, and type the data accordingly.

### Dynamic Template

We need to dynamize the task modal component template, and do this, we make use of the \_data attribute

use angular's interpolation, and inside the task form modal html, utilize a ternary conditional to modify both the title
of the modal as well as the button text based on the \_data.mode.

### Separate the interface in its own file

Inside the app folder, create another folder interfaces and create a file for each one, like `task-form-modal-data.interface.ts`
and move our interface to this file.

### Edit Modal

For this, we will follow a similar pattern to what we just did

1. The edit modal is the same modal as the create task one, the difference is that inside the service, we have two different
   methods to handle this, each method, has a different data object property
2. Inside the card task component, define a property with the same name as the service we are injecting where we inject
   the ModalControllerService.
3. Define a method to open the edit modal which we will use onClick, the form modal already contains the data property
   value which will be contained in the fired method.
4. Modify the task card component template, so that the click on "Editar" opens the modal

## Order of Execution

We have a service that handles the modal opening, a component that injects that service, and a component that injects that
service, and call a method using this property.

How is it working?

**This is life cycle + Angular's DI (Dependency Injection) working behind the scenes. Here is a step by step:**

To understand this flow, we need to look a the chain reaction. Even though `TaskCard` and the `FormModal` are separate
components, they are linked by `Angular CDK Dialog` engine and our sevice.

### 1. The trigger (TaskCard)

Everythhing starts in the `TaskCard`. When `openEditModal()` is called:

• The component calls the `openEditTaskModal` method from our service

## Lesson 3 - Configuring the creation/editing modal

We are now going to pass more value into the modal, adressing the task name and description. Create a form with these two
fields and make the button dynamic based on its status — if it is valid or invalid.

Essentially, in the solution of this lesson, we are going to click on the edit task button, and pass its existing name and
description. And in the creation, also pass these properties, but with empty values.

Finally, we will make the button stylings so it's properties/styles are dynamic, to indicate if the task is valid or not.

Start by opening the modal service and inside the open edit modal, say that it should expect some parameters. Parameters
which will create an interface (`ITaskFormControls`) to type them.

The reason the instructor chose the name controls, is because the modal will have a form, and each form field is a control.

Now that we have defined that the editModal **expects** an object with a name and a description, we must pass the `formValues`
object into the data object.

And for the creation, we pass the same formValues object, but defaulting them as empty values.

This update was easier to make since the modal openings are at the same place (service) and not spread in multiple components.

Modify the ITaskFormModalData to include the new property, and the `TaskFormModal`'s data property has access to that
object.

### Form Controls

Essa é uma excelente pergunta conceitual. In case we are studying frameworks like Angular (Reactive Forms) or state management
libraries, terms like "Control" appear all the time

The reason is that a form field is not just a text box, it is a "live object" that needs to manage behaviors other than
the simple entered value.

Some reasons for this nomenclature are:

1. **Individual State Managing**

Each field needs to know its "history" in realtime. If the field is a `Control` object, it can track states like:

• Value: The current data (e.g. "caioceretta@gmail.com")
• Touched: If the user already clicked/entered the field
• Dirty: If the user updated the original value
• Pristine: If the value remains untouched

2. Encapsulated Version

By transforming the field in a `Control`, the validation logic remains "hanged" in it. The field becomes responsible by
answering the question: "Am i valid now?". If we have an e-mail field, internally, the `Control` executes the regex and
expose an error object in case something is wrong. Without having to consult the entire form for it.

3. Reactive data flow (Observables)

When a field is a `Control`, it usually emmits events, this allow us to "listen" to the `valueChanges` or `statusChanges`

• Example: If we trype in a `Country` field, the neighbor `Control`, such as state, can react automatically and filter
the possible options, because it is observing the first's state.

4. Interface Decoupling

By considering the field as a `Control`, it usually emmits events, This allows us to "listen" to the valueChanges or
statusChanges

#### Structure Summary

Think of the form as a tree

• FormGroup (The Form): The tree trunk that groups everything
• FormControl (The Field): The leaves that store the value and tells if they are valid or not.

• Analogy: Imagine a plane's control panel: Each button or lever is a "Control". The pilot doesn't look only to the
position of the lever, but if the error lights of that lever is turned on and if it responds to the command.

## Observable Recap

The observable pattern is very common in Angular (specially with `Angular Material`). We must think of an observable
as a "communication tunnel¨ who waits for something to happen.

The anatomy of the process is:

#### 1. The "Contract" (.subscribe)

When we execute the dialogRef.closed.subscribe(...), we are not executing any logic on that moment, we are simply telling
the code:

• Hey, i know this dialog will close any time in the future
• When this happen, get whatever leaves it (`result`) and execute this `console.log`

It is like if we left our phone number in a store for someone tro call it as soon as a product arrives. We don't remain
standing in the store, we go about our business until the phone rings.

#### 2. The Trigger (.close)

The line `dialogRef.close("Pizza!") is what pushes the data into the tunnel

• The moment `close()` method is called, the Observable understands its task is accomplished.
• It "emits" the value "Pizza!" to everyone who was listening (subscribed) inside the .subscribe

#### The Step-By-Step Flow

1. Observable (closed): This is the data source. It remains "dormant" until the dialog closes.
2. Subscription (subscribe): This is the hook that connects the Observable to our response code.
3. Emission: The close('Pizza!') acts as the trigger that shoots the message through the pipe
4. Execution: Only now is the `console.log` inside the `subscribe` executed.

#### Other Example

**`closed`** is the observable.
**`subscriber`** is the code inside our subscribe, which is listening
**`trigger`** is the .close

Each other role:

1. `dialogRef.closed` (the radio): Imagine that closed is a radio station that only plays music when the dialog closes.
2. `.subscribe(...)` (radio turned on): When we subscribe to an observable, we are "syncing" in that station. We remain
   silent (code doesn't run) until something is broadcasted
3. `.close("Pizza")` "announcer": When we call the function, it is like if the announcer pressed the "play" button and
   put "Pizza" "on air"
4. The reaction: In the instant that the announcer presses plays, the radio (subscribe) receives the sound and executes
   the console.log

So essentially, what we used inside the method close is what will "travel" across the Observable pipe and fall into the
`result`.

Origin: dialogRef.close(VALUE)
Destination: .subscribe(VALUE => { ... })

#### Why use observables instead of a simple function?

Unlike a regular function that returns an immediate value, an Observable handles **time**. A user might take 1 second or
1 hour to close the dialog. The observable keeps this connection open and organized for us. Ensuring the code only
runs when the data actually exists.

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
