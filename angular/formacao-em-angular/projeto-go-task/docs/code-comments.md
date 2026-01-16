## Lesson 1 - Drawing the app macro

Even though, the fact of drawing the app as we expect it to be, with header, main, etc, it is a trivial thing. It is very
important for our general structure understanding. Every time, before start to code an app, and create our components,
it is a good approach to always do that sort of drawing, since it is really good for us to visualize the future of the
app, how it will be componentized, if the components won't be coupled full of responsibilities, if it won't be a hard
app to maintain, and so on.

Therefore, every time we receive an app/layout to build, we should always make that macro drawing first, since in big
majority of times, people end up creating apps that are hard to scale.

Assume we create a version 1.0 of the app on "blank", we might think that it is complete, but then comes another functionalities
to implement, and we see that it is hard to implement on that version, which would even lead to discarding a great part
of the app. If the app is too coupled, without a well defined data flow, separation of responsibilities, and so on.
Having this ability, adding it to our repertoire, it is always a good approach.

## Lesson 2 - Drawing the task object structure

When we look at a task, we can clearly identify it has something like

type Comment {
id: number;
commentary: string;
}

interface TaskProps {
id: number
title: string
description: string
comments: Comment[]
status: 'to-do' | 'doing' | 'done'
}

## Lesson 3 - Defining the list structure

How will the tasks managenement be? Will they be inside a single list or they will be divided in different lists? What are
the positive and negative points of each option?

### Three Lists

**Negative Points:**

• We have three different lists, so we will have to manage these three lists. Every time we delete or update a task, we
must know its current status, and based on it, identify which list we must access to find that task. But for us, this won't
be a problem, since we will always know what is the current stage of that task.

Therefore, it won't be a problem to pass that status as a parameter to know which list to look for, be it for replacements,
deletions, etc.

### Positive Points

• We are going to have less items to iterate in each one of them, so it is going to be quicker to access the task object
and modify it.
• When thinking of our layout, it will be easier to render each task by column, since we will be able to "listen" to each
one of these lists and render the items of each one.

**The instructor chose the three lists approach, where one will have all the to-dos, doing, and complete.**

## Lesson 4 - Defining the task managament scope

A component, is solely used to manage only itself. And it is not the place to manage the state. It should not be the place
that holds a source of truth, and manage state that will be used in one or more component in our app.

Being cautious about coupling components, and preventing it, is what defines if our app is going to be scalable and easy
to maintain.

### Ideal Source of Truth Scope

The ideal would be to create a service for it. Because a service is a class that will have a single instance in our app,
and we can inject that class in any component we want, and they will always consume the same instance.

We will have a service that will hold the three task list, and each task list will hold each object representing the task.

Instead of managing the tasks inside the component, we will have methods inside the service, to manage this list. Method
to create, update, delete, and more. And whoever inject that service will be able to consume thee methods.

### List Copy

Our task list section component need to consume these three status list, to be able to render in its template columns.

But when we consume that list, and retrieve this data, it receives a decoupled copy rather than the original instance
stored in the service. This is crucial for maintaining a `Source of Truth`.

By working with a copy (using new memory references), any modification made within the component, such as moving tasks
between lists, remain scoped to that component. This prevents side effects that could unexpectedly alter the global state.

Because every modification in the lists that are made inside the component, will stay only on the scope of this component,
it won't affect our source of truth. This way, our original list structure, will remain intact and reliable. This will make
that every time we consult that list, it is not currently being handled, and its structure is not being modified

Ensuring the original list remains intact guarantees thjat the data remains predictable and reliable for all other consumers.
If componentes were allowed to mutate the source of truth directly, the application state would become inconsistent and
difficult to debug.

## Lesson 5: Defining the task management methods

Every method will receive the currentStatus in its parameters. The reason for the currentStatus parameter is to directly
iterate the correct list.

• createTask(name, description)
• deleteTask(id)
• updateStatus(id, currentStatus, nextStatus): This method, when we move a task from any list to other, we are also updating its status.
And the nextStatus will be passed to us via the component.
• editTask(id, currentStatus, name, desc): receives the id, currentStatus, and the new task properties
properties.
• updateComments(taskId, currentStatus, commentsList): We won't receive a single comment, we will treat the component,
that will have the current list of comments for that task, make the updates only inside that component, and it will
always return us the final list with all the comments from that task, and we make the replacement based on it.

All these methods will be executed through the service, which is our source of truth

## Lesson 6: Defining the modal entry point

**In which part of the application will te modal trigger logic reside?**

We have to think that we need to open them in three different places

1 - Welcome Component
2 - When clicking on the edit of the task
3 - When clicking on the "comments" button that will be used to add or remove a comment

We are used to think that we are going to use the components to open these modals, be it the task, or the welcome, or more.
But according to the instructor, there is a better approach.

Which is removing the logic from the component and putting it inside a service. Because this way, we centralize all the
modal opening logic in a service. Sometimes the components can have too many internal responsibilities and adding these
implementations may increase even more its size.

And many times, in case we have more than one modal in our app, like is the case of the task creation/edit and the comment
creation, they may also share its configurations, like height, width, classes, and so on. Which if we choose to let this
behavior for the component itself, we might end up replicating that logic.

## Lesson 7: Defining the modals responsibilities

## State Management: Local Copy vs Centralized State

In a modern software architecture, specially in frameworks like Angular, React, or Vue, we generally handle data in one
of two ways.

### 1. Local Copy (The "Sandbox" Pattern)

The service provides a **clone** of the data to the component

• **How it works:** The component receives a copy with a new memory reference. Any changes (like draggin a task) happen
only inside that component's scope

• **Pros:**
• Isolation: No other part of the app is affect by "in-progress" changes.
• Performance: UI updates are instant because they don't depend on a global refresh

• **Cons:**
• Sync Issues: The "Source of Truth" in the service becomes outdated unless we explicitly save the changes back later.
• Inconsistency: If two components show the same list, one might show the update while the other doesn´t

### 2. Centralized State (Redux / Store Pattern)

This is the pattern used by **Redux**, **NgRx**. The state is "read-only" for the components.

**How it works:** If a component wants to move a task, it cannot touch the list, it must **dispatch an action** or call a
**service method**. The service updates the master list, and the new state "flows down" to all components.

• **Pros:**

. Consistency: Every component always sees the exact same data
. Predictabily: We can track exactly when and why he state changed (TimeTravel debugging).

• Cons:

. Boilerplate: Requires more code (actions, reducers, or specific methods).

### Comparison Table

**Feature: Modification**

1. Local Copy (Isolated): Direct mutation of the local copy
2. Centralized State (Redux Style): Dispatches via methods/actions.

• Memory Reference

1. Local Copy (Isolated): New reference created for the component
2. Centralized State (Redux Style): Single reference maintained in a Store.

• Souce of Truth

1. Local Copy (Isolated): Beocmes fragmented across components.
2. Centralized State (Redux Style): Remain unified in the service/store

• Best Use Case

1. Local Copy (Isolated): Complex forms or "draft" states
2. Centralized State (Redux Style): Global data like User Info or Task Boards

### Which one to choose?

• If we want the user to "play around" with tasks (move to one place or another) and only save on the database when clicking
on the "Save" button, the **Local Copy** model is the best option.
• If we want that, by moving a task, this change is automatically showin in every places of the app (ex: a task counter
in the header), the **Centralized** style is the correct.

## When to use Interface and when to use Type?

#### Interface

We use interface when the focus is the shape of an object.

Use `interface` when you are describing the structure of an object, specially if it

• Represents a data model
• Will be extended
• Can be implemented by classes
• Is part of a public API (libs, contracts)

classical example

```ts
interface User {
  id: string;
  name: string;
  email?: string;
}
```

Therefore, interfaces is the best choice when typing

Objects
Components Props
API Contracts
Classes (via `implements`)
When we may want to extend it in the future

```ts
interface Admin extends User {
  save(data: unknown): void;
}
```

**Interface + Class**

```ts
interface Repository {
  save(data: unknown): void;
}

class UserRepository implements Repository {
  save(data: unknown) {}
}
```

A common practice would be: "If it looks like an object shape, start with an interface"

#### 2 - Type

Use `type` whenever we want to "compose types" , creating `unions` or representing something that is not just an object

#### Primitive Types and aliases

```ts
type ID = string;
type Status = 'loading' | 'success' | 'error';
```

#### Union types (interfaces do not do this)

```ts
type Result = { sucess: true; data: string } | { sucess: false; data: string };
```

##### Intersection (Type Combination)

```ts
type User = {
  id: string;
};

type Admin = User & {
  role: 'admin';
};
```

Functions

```ts
type Callback = (value: number) => void;
```

#### Tuples

```ts
type RGB = [number, number, number];
```

Mental Rule: If it not a pure object, use type

#### 3 - Critical Difference: Interfaces can be reopen

Interface can be declared multiple times

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}
```

As a result, the User interface will be

```ts
interface User {
  name: string;
  age: number;
}
```

This is called `declaration merging`

With types this does not work.

#### 4. So what to use in React?

**Component Props**

Both work, but there is a common standard

with `interface` (more traditional)

with type (more modern/common nowadays)

Both are valid
Modern teams tend to prefer type

### 5. Practical Rules

Use `interface` when:

• Modeling object
• Create public contracts
• Work with classes
• Need a clear `extends`
• Want to use declaration merging

Use type when:

• Creating Unions
• Creating intersections
• Typing functions
• Typing Tuples
• Creating aliases (`string`, `number`, etc)
• Complex types logics
