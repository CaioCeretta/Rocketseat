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
• It passes a raw object (the `formValues`) containing task's name and description.

### 2. The Service Logic (`ModalControllerService`)

The service acts as a factory for our dialogs:

• `openEditTaskModal` method is executed
• It combines our default `modalSizeOptions` (width, maxWidth) with the specific data for this task
• **Crucially**: It calls `this._dialog.open(TaskFormModal, { data: ... })
• At this exact moment, the CDK Dialog service creates a `Portal` and prepares to instantiate our component.

3. Dependency Injection and Data Passing

Before TaskFormModal is actually rendered on the screen

• Angular's injector creates an instance of `TaskFormModal`.
• The CDK Dialog Service creates a special Provider for the DIALOG_DATA token, containing the object we passed in the service
(the mode and the forrm values)
• Inside `TaskFormModal`, the line `readonly \_data = inject(DIALOG_DATA) runs. it grabs the data that was just put into
the injector

4. Initialization (TaksFormModal)

• The `TaskFormModal` is now fully instantiated
• The \_data property is populated.
• The HTML template (`task-form-modal`) is rendered, and we can now access \_data.mode and \_data.nome

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

Modify the ITaskFormModalData interface to include the new property of formValues. wjocj we will use the new interface
of the form values it will receive. This will enable `TaskFormModal`'s data property to have access to that object.

### Form Creation

Now, that we have already defined the structure of the form and "told" the modal's interface, that the formValues is of
this type. We will create our forms.

Since we are creating a "Reactive Form", the form structure will be created inside the component's class, different from
`Template Driven Forms` that we create the structure inside the template.

Steps:

1. Start by importing `ReactiveFormsModule` inside the modal component from `@angular/forms`
2. Create a taskForm property, which is typed as a FormGroup. Every form is a `FormGroup`, it is a group that consist
   of one or multiple controls, which are the form fields. This property initial value will be a new FormGroup, and
   as its parameter, the fields expected by this form
3. When defining the fields of the FormGroup object, we inform that his fileld is an instance of FormControl with the
   initial value this field will have, and as the second parameter, its validations, making use of the Validator
   object and its methods
4. Now that we have defined the structure of our form in our component, we will pass it to our template
5. Add some `Reactive Form` directives in our form element, which are
   1. Create a [formGroup] property binding, and specify our form group, which will be the taskForm property
   2. Define a event binding (ngSubmit), that will be fired when the form is submitted, for this event, we use our
      component's onFormSubmit method
   3. Reference the form controls based on our form group's form controls, name and description. And for this, simply
      add the attribute formControlName="controlName"
   4. We can now see that if the satisfy the validations, the button becomes available.

### FormGroup methods

When we have a property typed as a FormGroup, we have access to multiple validation and control methods. We can, for example,
set the button as disabled in case [taskForm.invalid] === true

## Lesson 4 - Dynamic error message.

We need to show the error message, only if the input is invalid and has already been touched. With form controls, we
can check whether the input has been "touched" or not in case something has being typed on it, don't meet the requirements,
and loses its focus.

Inside `reactive forms`, each `FormControl` maintains an internal; state, like a "mini report" of the field.

`touched` -> user entered and left the field (blur)
`dirty` -> value has been altered
`invalid` -> some validation has failed
`errors` -> which validations have failed

We don't need to create this, angular already does that for us.

The condition to make the error to display only if the input is invalid and has already been touched, is like:

```ts
    @if(taskForm.controls['description'].invalid && taskForm.controls['description'].touched) {
    <p class="font-semibold text-sm text-red-500">
      O campo é obrigatório e precisa ter no mínimo 10 caracteres.
    </p>
    }
```

OR

`@if(taskForm.get('description')?.invalid && taskForm.get('description')?.touched)`

### When to show an input error?

• Invalid field by itself -> Isn't enough
• Field touched -> isn't enough
• Invalid field AND touched -> now, show the error

## Lesson 5: Send data back on modal close.

### Current Setup (Already Done):

We already have the base structure in place:

1. Service Layer
   • using the Angular CDK dialog
   • Subscribing to the `closed` observable

2. Modal data injection
   • `readonly _data: ITaskModalData = inject(DIALOG_DATA);`
   This ensures the modal receives the configuration data passed when it opened.

3. Form Initialization
   • A `FormGroup` with `FormControl`s
   • Initial values coming from `_data.formValues`

At this point, the dialog opens correctly and the form works, bur the result emitted on lcose is `undefined`

### Why the result is `undefined`?

The `closed` observable only emits a value when a payload is exactly passed to `dialogRef(value)`. If the dialog is closed
by:

• Clicking the backgroup
. However, if we wish to disable closing it via clicking on the backgroup, in the configuration properties of the
modal, we can use `disableClose: true`
• pressing `ESC`
• calling `dialogRef.close()` without arguments

Then the emitted value is `undefined`.

### What needs to be implemented

**1. First, we will define a method for closing the modal when clicking on the x button**

We have two ways of closing a modal, by clicking on the x or on the backgroup , which will simply call close and pass
undefined as argument

**2. We should also type in the generic, what will be the expected the emitted value**

We will simply use, inside the angle brackets of the dialog.open, the ITaskFormControls interface

**2. Inject the `DialogRef` inside the modal**

```ts
   import { DialogRef } from '@angular/cdk/dialog';

   readonly _dialogref = inject(DialogRef);
```

**Important concept**

• `DialogRef` is not global
• It is created at the moment the dialog is opened
• That instance is registered in the **injector of the dialog component**
• Injecting `DialogRef` inside the modal guarantees access to the same reference created by `Dialog.open(...)`

**3. Close the dialog with a payload on submit**

```ts
   onFormSubmit() {
      if(this.taskForm.invalid) return;

      this._dialogRef.close(this.taskForm.values)
   }
```

This is the exact emission moment.

• dialog is closed
• `dialogRef.closed` emits value
• Observable completes automatically

**4. use `(ngSubmit)` on the form**

We don't need to import the `FormsModule` to use (ngSubmit) if we are using ReactiveFormsModule.

(ngSubmit) belongs to the direct NgForm but also ReactiveFormsModule.

Add this attribute to our form, pointing it to the onSubmit function.

**5. Final Flow (end to end)**

Inside the Modal:

1. user clicks on save
2. (ngSubmit) fires `onFormSubmit()`
3. dialogRef.close(formValue) emits the value

Inside the Service:

1. `dialogRef.closed.subscribe(result)`
2. result === formValue
3. Data arrives correctly

**6. Final Flow (Conceptual Summary)**
The modal:
• Injects `DialogRef`
• Closes itself
• Emit the form data, on close

This transforms the modal in a declarative component, that doesn't know the service, only communicates via closing.

## Lesson 6 - Receiving values sent by the modal in the parent component

When we define `dialogRef.closed`, we are dealig iwth an Observable, so we subscribe to it. When the dialog is closed via
`close` method, the value passed to `close` is emitted and received by subscribers.

We are able to access `dialogRef`, because our service function returns the result of `open`. The `open` method returns an
instance of `DialogRef`, which represents the currently opened modal, and exposes the `closed` observable.

### Instructor's Approach

The instructor took a different approach from the one where i handled the `closed` subscription inside the `service`

Instead of managing everything inside the service, he:

• Returns the `DialogRef` instance from the service, which is already properly typed
• Defines and handles the `dilogRef` inside the component that opens the modal
• Subscribes to closed in the component, not in the service.

This means that `openNewTaskModal` does not simply delegate everything to the service. Instead, the component

1. Calls the service to open the modal
2. Receives the `DialogRef`
3. Subscribes to closed
4. Decides what to do when the modal is closed

So, instead of creating and assigning the `dialogRef` inside the service, it is created and handled inside the component
via the `openNewTask` method

The same pattern is applied to the edit modal, the service returns the dialog reference, and the component subscribes to
`closed` and handles the result.

### Responsibility of the Modal Component

The value emitted when `close` is called is handled by the modal component itself. The task modal's submit logic is only
responsible for calling `close` with the appropriate return value, it does notcare about what happens after that.

### **Important to concept to notice**

Even though we have seen that it is important to unsubscribe whenver we subscribe to an observable, `closed` method already
unsubscribe for us

### Difference between my approach and the instructor's approach

• My Approach
   . The service opens the modal
   . The service subscribes to `dialogRef.closed`
   . The service handles the result of the modal
• Instructor's Approach
   . The service only opens the modal and returns the DialogRef
   . The component subscribes to `dialogRef.close`
   . The component decides to handle the result

In short, the approach i took centralizes the modal life cycle and result handling inside the service, while the instructor's
approach keeps the service focused on modal creation and delegates the result handling to the component, making it flexible
and more context-aware

## Lesson 7 - Creating the Task Management Service

This lesson will focus on creating the service that will represent our task's source of truth

Start by creating a new service, add the @Injectable decorator, and as an argument, use `{providedIn: "root"}` so the
instance is shared across all app. Our source of truth, is going to consist of three lists based on the status. 

Every task is going to be an instance of a behavior subject, where it is an **Observable**, and every time we update
that list, we can perform an emit so every subscriber consume the next updates.

```ts
   private todoTasks$ = new BehaviorSubject<any[]>([]);
   readonly todoTasks = this.todoTasks$.asObservable();
```
When we define a property that is equal to the Observable.asObservable(), we can send this copy for whoever subscribes to
it. The only thing something can do, is to subscribe to the copy.
 They will never consume or modify the behaviorSubject class directly. We don't want any consumer component to have the
 "power to emit" anything to the other components. Only the source of truth (service) can do this. This way, its responsibility
 is well defined and we don't have components to modify these properties. Repeat the same for the two other lists.

 Its flow is going to be:

   1. We have the three lists, and the only way to access them is subscribing to the service
   2. The service will be the one responsible for updating that lists using the utility methods.
   3. The components will subscribe and consume the list copies we created
   4. Since the service is an Observable, every time we emit a new value, we update the lists and automatically, everyone who
   is subscribed to it, will get the new list. It will propagate through the service and go to the subscribe that is being
   made on the components.
   5. To update the lists, we use the `.next()` method, which is capable for updating our source of truth, as well as emiting
   the new value for the subscribers.


## Lesson 8 

Now, we must define an interface that types the list, ITask, and ITaskComment;

However, is a good option to separate the status in a separate type or enum, if we do something like:
`status: 'to-do' | 'doing' | 'done´

is not wrong, but it can be improved, since the status may be used in different places of our app, and in case we would
like to modify that status of "to-do" to "todo" withou an hiphen, we would have to repeat it. So by creating an enum or
Type to represent that status, is a better approach, like:

export enum TaskStatusEnum {
	TODO = "to-do",
	DOING = "doing ",
	DONE = "done",
}

This enum is an object containing three properties, and would jusr fine, however. Typing a property as a enum makes the
code a little bit harder to work with when we wish to create properties that will have this enum type, passing these
strings as parameters, and so on.

That's why the instruct or likes to defining a Type, that will also have these strings, but based on our enum. It will
be like this

`export type TaskStatus = TaskStatusEnum.TODO | TaskStatusEnum.DOING	| TaskStatusEnum.DONE;`

### If i already have the ENUM, why should i create a type?

**The problem of enum as type**

When defining `status: TaskStatusEnum`, ts will, many times, require us to import the Enum and  use it explictly
`TaskStatusEnum.TODO` by assigning a value. This can be too verbose in tests or when we are receiving simple data via
an API.

**Advantage of the union type**

By creaating `type TaskStatus = TaskStatusEnum.TODO | ...`, we are obtaining the best of both worlds

• Flexibility: We can pass a pure string "to-do" and TS will accept, because it recognizes that this string is part of
the allowed set.
• Security: If we try to pass something as "fazendo", TS will give a warning.
• Single Reference: Our type is still "coupled" to the Enum. If we change a value inside the Enum, Type automatically
updates itself

**Practical Comparative**

   Pure String: 'status: to-do' is difficult to modify globally
   Simple Enum: `status: TaskStatusEnum.TODO`, it's safe, but sometimes, too much verbose/strict
   Enum + Type: `status: 'to-do'` ( validated by enum). This is flexible and easy to maintain

### Final Summary

If we typed status as `TaskStatusEnum`, if we try to use something as
```ts
   const task: ITask = {
      status: "to-do" // TS will say that to-do is not of the TaskStatusEnum type
   }
```
But if we modify to define a Type based on this enum, the same code as above would work.

And i said it was the best of both worlds because the Enum is the source of truth (if we need to modify the text, we only
modify it) and the `Type` is the entry port, acting as a "bridge" and allowing us to directly using the string without
TS complaining.

This way, we can reuse this enum everywhere on the app that we need that status, and in case we want to remove, add,
update its name. We have one single place to do so.

### Separate folder for the enum

Instead of simply creating it inside the interface folder, create a new `enums` folder and create a task-status.enum.ts.

We can also create a new types folder for the type. But in this case, i'm going to make different from the instructor and
take the "domain" approach. But to not modify too much what the instructor is doing, i am going to unite only the enum
and the type.

## Domain Approach

I came across something that made me reflect

If i have a type, that is entirely based in a enum, should i add this type in a separate folder/file than the enum?

And the real question here is, instead of

"Should i have folders for types, enum and interfaces?"

I asked myself

"How should i model my domain so my types express intent, say readable, and don't fight TypeScript?", this is the right
question.

### First: Forget folders for a second

In TypeScript:
• `interface`, `type`, and `enum` are tools
• They are not domain concepts

Our domain concept here are things like, in this case

Task
TaskStatus
TaskComment
TaskFormData/TaskModalDta

So the domain approach is:

Group things by what they represent, not by what keyword they use

### Our current situation (What was happening)

Right now, we have:

• `interfaces/`
   . ITask
   . ITaskComments
   . ITaskFormControls
• types/
   . `TaskStatusEnum`
   . TaskStatus(Derived from the enum)

This lights a lamp on our heads: "TaskStatus is part of the TaskDomain, but it lives in a different conceptual place just
because it's a `type/enum`

This is why it feels weird.

### Domain-Driven Way (Recommended)

**Rule of thumb**

   One domain concept -> one file (or folder)

   Inside that file, use whatever TS construct makes sense

**Example: Task domain (clean & scalable)**

   task/
   ├─ task.model.ts
   ├─ task-status.ts
   ├─ task-comment.model.ts
   └─ task-form.model.ts

   `task.status.ts`

   Here, we have two options

   1 - Only enum (simples and most common)

   export enum TaskStatus {
      TODO = 'to-do',
      DOING = 'doing',
      DONE = 'done',
   }

   Then, in `Task`

   status: TaskStatus

   In this case, no extra type is needed, but if we don't need the enum values at run time and we are consuming an API
   that already returns strings, it is better to convert to a type.

## Lesson 9 - Creating a function to generate the ID.

Start by creating a folder called utils, which is specific folder for functions that we can reuse on different parts
and create `generate-unique-id-with-timestamp.ts` that returns us a random id based on the timestamp.




## Enums

### 1. What actually is a `enum` in typescript

When we write

```ts
export enum TaskStatusEnum {
  TODO = 'to-do',
  DOING = 'doing',
  DONE = 'done',
}
```
TypeScript creates two things at the same time

1. A type
2. A run-tiime object

Which means that, in our case, TaskStatusEnum is simultaneously a type and a value

This is different than type and interfaces that fades away during runtime

### 2. Enum is already a type

When defining `status: TaskStatusEnum`, TypeScrpt already understands it like:

"status can only be of one of the values defined in this enum"

In practice, this means

status = TaskStatusEnum.TODO // ok
status = TaskStatusEnum.DOING // ok
status = "to-do" // doesn't work
status = "doing" // doesn´t work

Meaning that an enum restricts the type exactly how we want.

### 3 - Type Conversion

But if we create a type, consisting of a union of

```ts
export type TaskStatus =
  | TaskStatusEnum.TODO
  | TaskStatusEnum.DOING
  | TaskStatusEnum.DONE;
  ```
This union is daying

"TaskStatus is "to-do" | "doing" | "done"

**But the enum already guarantees this...**

So when we write

status: TaskStatus vs status: TaskStatusEnum; there is no difference in type security

both approaches are equivalent to ts

status: TaskStatusEnum;
status: TaskStatusEnum.TODO
     | TaskStatusEnum.DOING
     | TaskStatusEnum.DONE;

But the second is

• Longer
• More fragile (if we add a new value to enum, we must update the type)

### Benefits of creating the type

Transforming an `Enum` into a `Union Types` is a common practice named "String Literal Union"

Here are some of the reasons to prefer unions instead of traditional enums

1. Simplicity and Code Readability

With Enums, we need to import the Enum object every time we want to use a value. With Union Types, we just need the pure
string.

• With Enum: setStatus(StatusEnum.Active) (Requires import)
• With Union Types: setStatus('active') more direct and intuitive

2. Nominal Behavior vs Structural

TS is based in structural typing, but enums are nominal

• If we have an Enum with the value of 'ACTIVE´, we can't pass the string 'ACTIVE'
directly to a function that waits for an Enum; TS will complain that we did not
pass the "Enum's member"

• With Union Types, if the string is exactly the type it waits, TS accepts it.
This easies the data consume that come from APIs, JSON.

3. Less "Dirt" in the final JS

Enums in typescript generate an extra code (a reverse mapping object or an IIFE) when they are compiled to JS. Union types,
in other hand, completely disappear after compiling, resulting in a smaller, cleaner bundle.

4. Better error massages

By using `UT`, VS Code and other editors show exactly what strings are allowed (intelliSense) more clearly than pointing
to a Enum reference











## SRP (Single Responsibility Principle), which one is the best approach?

The different modal approach made me question which one is the most accurate one.

### What does SRP really says?

**A module should have only one reason to change**

This does not mean that a function should do only one thing, this is a shallow interpretation
SRP is about responsibility and reasons to change

**A module must have one single reason to change**

### Applying SRP to the moodal scenario

**Responsibilities involved**

When working with modals, several responsibilities exist

1. Opening and configuring the modal (UI infrastructure)
2. Defining the modal layout and form
3. Deciding what happens the modal closes
4. Executing a business action with the returned data (create, edit, navigate, etc.)

The SREP question is:

   **Who should change if the behavior after the modal closes change?**

### Where would our approach starts to violate SRP

In our original approach, the service:

• Opens the modal
• subscribes to `dialogRef.closed`
• Decides what to do with the result

This gives the service more than one reason to change

1. If the way the modal is opened changes
2. If the behavior after the modal closes changes

Even though the code works, this is already a violation of SRP

### Why the instructor's approach aligns better with SRP

**Service Responsibility**

The instructor's approach, the service has a **single responsibility**

   • Opening and configuring the modal

Its reason to change is limited to:

   • UI library changes
   • Modal configuration changes (size, animation, etc)

### Component's Responsibility

   The component is responsible for:

   • Orchestrating the UI flow.
   • Deciding what to do when the modal closes

   **Its reason to change is**

   • Business rules or screen specific behavior

   **This separation:**

   • Keeps responsibilities clear
   • Reduces coupling
   • Improves scalability

### A practical rule

Even though the same modal is used for both creation and editing, the key difference is not the modal itself, but what
happens after it closes.

For example

• After creating a task, the screen might
   . navigate to another page
   . show a success toast
• After editing a task, the screen might
   . Stay on the same page
   . Update the local state without showing feedback

Because these actions vary depending on the context in which ther modal is used, the logic that reacts to the modal's closure
should live in the component, not in the service

### When our approach still fits SRP

Our approach can still respect SRP when
   • The modal has a single well-defined behavior
   • The service acts more like a use case

Example
   `confirmDelete(entityId)
   
   -> open modal,
   -> if confirmed, delete entity
   -> done

   Here:
   
   . There is only one reason to change
   . SRP is not violated


### Concrete example

   Imagine a service that:

   • Formats dates
   • Fetches data from an API
   • Decides how errors are shown to the user

   This service would need change if:

   • The API changes
   • The date format changes
   • The UI error behavior changes




### Quick Summary

   • SRP !== "small functions¨
   • SRP = one reason to change
   • Generic Modals -> handle result in the component
   • Action specific modals -> handling logic can live in the service

   In our specific case, the instructor's approach applies SRP in a more correct and scalable way 

##

## What does "reason to change" actually mean?

When we say:
   "A module should have only one reason to change"

We are not talking about how often something changes, but why it would need to change.

A reason to change means:

   A single type of decision or concern that can force us to modifyt that code

In other words:

   • Who whould ask for the change?
   • What kind of change is it?
   • Which rules or constraints does it belong to?

If different kinds of decisions can break or require changes in the smae piece of code, then that code has multiple reasons
to change


## Standalone Model vs NgModules

Angular currently uses the Standalone approach. It represents the biggest paradigm change inside the framework. The
main objective is to remove unnecessary complexity and make Angular more intruitive, similar to libraries like React
and Vue.

### 1. NgModules Approach

Traditionally, every component, directive, or pipe, needed to belong to a "club" called "NgModule", nothing worked
isolately

**How it worked**: We would create a component and had to declare it in the `declarations`arrays of a module. For
example, the AppModule. If we would like to use this component in other pace, we would have to export and import
the entire module inside the given placdce.

**The analogy**: Imagine that to use a red lego block, we were forced to carry the entire box of the set "Fire Station"
set box everywhere.

### 2. New Approach (Standalone)

Now, the components are self-sufficient. They manage their own dependencies

**How it works**: Every component is standalone by default. Instead of an external module deciding what the component can
use, the component itself has an `imports` array where it declarews exactly which components, directives or pipes it
requires.

**The analogy**: We simply grab the red lego brick and snap it wherever we need it.

### 3. Key Differences

**Organization**: With NgModules, it was module based (`.module.ts`). With standalone, it is component based
**Boilerplate**: With NgModules, we had multiple boilerplates, many files and declarations. With standalone, the code is
leaner.
**Learning Curve**: With NgModules, it was difficult to grasp modules. With standalone, it is more intuitive for beginners
**Bootstrapping**: With NgModules, it was via bootstrapModule(AppModule). With standalone, it is via bootstrapApplication

### 4. Benefits of switching:

• **Reduced Boilerplate**: We eliminate the need to create `.module.ts` files for every feature. The project folder structure
becomes much cleaner.

• **Better "Tree Shaking"**: Since dependencies are explicit per component, the Angular compiler can precisely remove
unused code, resulting in smaller bundle sizes.

• **Simplified Lazy Loading**: Previously, lazy loading required creating a specific module for a route. Now, we can lazy
load a component directly in the routes file.

• ** Easier Testing**: Testing a standalone component is simpler because we don't have the need to set up a whole module
in the `TestBed`, we can just import exactly what the component needs.

• **Interoperability**: Standalone components can be used within old NgModules and vice versa, allowing for a gradual
migration.

## Class interpolation and dynamic classes: Angular x React

### Angular: HTML + Template Syntax

In angular, we are inside **real HTML**

Which means that every attribute assignment must be a string

`class = "..."`

When we want to evaluate an expression, Angular uses **interpolation**

`{{ expression }}`

If we want, inside a class, modify its styling based on a JS value, we must use

class="{...}"

HTML requires double quotes, {{}} tells angular that it is a js/ts expression, and the template string is just normal JS
running inside the interpolation

### React: JSX (Not HTML)

We don't write HTML, we write JSX, that is basically "disguised" JavaScript

className={`... ${...}`}

Here

className already indicates that this is JS
there is not interpolation {{}}
Template string is already JS, so it is direct

In JSX, {} is already js
outside of this, is normal text

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

## When to use ?? (nullish coalescinging) e when to use || (logical OR)

### || (Logical OR)

• Returns the right value if the value to the left is false
• It considers as falsy:
• `""` (empty string), `0`, `false`, `NaN`, `null`, `undefined`

value || fallback

**Examples would be: **

```ts
   const name = user.name || "Guest"

   "Caio" -> "Caio"
   "" -> "Guest"
   null -> "Guest"
   undefined -> "Guest"
```

?? (Nullish Coalascing)

• Only considers `null` and `undefined` as "abscence of value"

It preserves valid values, even if they are falsy, so it narrows more the condition than ||

value ?? fallback

**Simple example:**

```ts
   const name = user.name ?? "Guest";

   // If user.name is:
   "Caio" -> "Caio"
   "" => ""
   null -> "Guest"
   undefined -> "Guest"
```

### Direct difference (side by side)

0 || 10 // 10
0 ?? 10 // 0

"" || "abc" // abc
"" ?? "abc" // ""

false || true // true
false ?? true // false

This means that `||` discards 0 and "", and for ??, only null/undefined "doesn't exist"

### 1. When to use ||

1. Fallback for simple boolean values

`const isAdmin = user.isAdmin || false;`

In this case:

• If it is undefined, returns false
• If it is false -> false (ok)
• If it is true -> true

2. Simple feature flags

`const neableLogs = config.enableLogs || false;`

3. Values the 0, "", false doesn't make sense

`const pageSize = Number(input) || 10;`

If input is:

"0" -> 0 -> falls to `10` (ok. 0 is not valid)
"20" -> 20
undefined -> falls to 10

### 2. When to use ??

1. Values coming from the backend

const username = apiUser.username ?? "Anonymous"

If backend sends "" -> keeps ""
null -> fallback
undefined -> fallback

This is the correct use in APIs

2. Numerical values (Very important)

const quantity = product.quantity ?? 1;

if `quantity` is:

0 -> maintains 0
null -> 1;
undefined -> 1;

3. Optional configuration

`const theme = userSettings.theme ?? "dark"`

4. Forms (React, Angular, etc)

const value = formData.age ?? 10;

If the user types 0, we don't want to overwrite it.

### 5. Golden Rule

Use ?? by default
Use || only when any falsy values show falls on the fallback

### 6. Common combination with optional chaining

const city = user?.address?.city? ?? "unknown"

Prevents error (`?.`), because the question mark verifies if the value is either null or undefined. Any one of these it
stops the execution.

Only uses fallback if it is null or undefined

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

```

```

```

```
