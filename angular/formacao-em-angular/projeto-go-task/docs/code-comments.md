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

## Lesson 4 - Defining the mangament local

##

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
