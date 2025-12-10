## Lesson 1: State Management

  ### • Initial Misconception

 The initial idea of state managenement often begins with the simple need to share data or synchronize information across
 different components.

### • Distinguishing Simple Sharing from True State Management

  **True state management** is more than just sharing data. Simple data sharing can often be accomplished using React's
  `Context API` or the `lifting state up` pattern.

  State management, specially when using dedicated libraries or advanced patterns, involves creating a **structured data model**
  that not only holds information but is specially designed to be the single source of truth for the entire application's
  UI.

### • Dynamic/Derived State ('Upload Page' Example):

 A key aspect of advanced state management is handling **derived state** (or dynamic state). In the upload example

  • We have the **primitive/source states** (e.g. progress_of_item_A and progress_of_item_B)

  • We then calculate a **derived state** (e.g. total_upload_progress) based on these two source states.

### • The role of actions/entry ports

  True state management involves formalizing **how** the state can be changed. These are the **entry ports**, commonly
  referred to as **actions** (Or dispatches, mutations). These actions are the only prescribed way to modify the central
  state, ensuring predictable updates

### • Beyong Simple Component State:

This type of application-wide state is often more complex than the simple, local state managed by a component's `useState`
hook.

A robust state management system often **minimizes direct modification** of stored data. Instead, it calculates (derives)
new state based on **Actions** and the **previous state** (data received). This principle is central to patterns like Redux
or Flux. 

## Lesson 2: Setting up the back-end

The back-end is basically going to be a server to store our files. It will simply have a route that receive the file and
upload it to the cloudflare r2.

R2 is a storage system specially for storing images similar to amazon s3.

What is the benefit of R2 in comparison to S3? 

R2 is way cheaper because when we use it with the purpose of storing images or other files we are publicly going to
display. R2 doesn't charge any download fee, meaning that we can show the images how many times we want with no added
cost. Only $0.10 month for gigabyte

S3 in other hand, has a much highter cost when our app scales because it charges for exit rate as well as the storage
itself.

R2 also uses the same API/routes that AWS S3 uses. Therefore, everything we do using S3 we can make using R2. We can
also use aws's sdk to manage R2.

Inside R2, after creating the bucket, the configuration is going to be the simple as possible. R2 allows us to creaate
life cycle rules where we can choose to delete files inside a folder after a while, such as reports csv and more. As
well as some specific rules such as abort rules time, and more.

And after finishing generating APIs secret, and more, we fill our env and can run the project

### TUS - Open Protocol for Resumable File Uploads

TUS idea is to partially upload files, so a user can upload 20% of a video, close the browser, open the page again and
resume the upload. But this protocol is used for very large files, different from images and we won't make use of it. But
that is the reason for the life cycle rule in the container

## Lesson 3 - Setting up Vite Project

Create a project with `pnpm create vite@latest web`, but now, with the latest tailwindcss, we need to make some new configs


## Lesson 4 - Structuring the widget

Start by creating a upload-widget component

Get from figma the custom shadow and create a tailwind boxShadow @theme token with this shadow

Create four components, the upload-widget, which will contain the other three inner components that are the list, the dropzone
and the header

For the structure, add a div between the dropzone and the upload list, which will have a height of one unit and the box
sizing of content box. 

### Content box explanation

The reason why box-content is necessary to show the line, is crucial because it ensures  that the
border and the padding are added outside of the width and height defined in the element.

We've defined the height as 1px, and we are using the top border to create the line.

When we use the box-sizing of content-box

the height is 1px, the border is 1px and the total height is going to be equal to 2px.

Tailwind's default is the scenario with border-box, which would make the border be included inside the height of 1px, so

height: 1px, top border: 1px, content height 0px. Because in this case, the border would consume all the height of 1px and
the content would have 0px height


## Lesson 5 - Button and Collapsible Widget

### Dynamic Component Breakdown

#### 1. Imports

In this example. we first make use of the **ComponentProps** utility from react

**ComponentProps**: It accepts a generic which is the type being dealt with, in this case ComponentProps<'button'>.
It extracts the full set of props that a normal HTML <button> supports, such as `onClick`, `disabled`, `type`, `className`,
etc.
This ensures that our component supports everything a native button can do.

**tv**: imported from tailwind-variants.
This function creates a variant-aware utility that returns Tailwind classes based
on "variant props"

**VariantProps<typeof buttonVariants>**:
This type tells React that the component also accepts the variant props defined inside `buttonVariants` (such as `size`)

#### 2. Create the buttonVariants utility

A `buttonVariant` definition consists of three properties: `base`, `variants`, and `defaultVariants`

**base:** These are classed shared by all buttons, regardless of which variant was selected.

**variants**: In this example we have: 
  ```ts
  variants: {
    size: {
      default: 'px-3 py-2',
      icon: 'p-2',
      small: 'p-1'
    }
  }
  ```

`size` is a variant group.
I t contains three possible values: default, icon, or small.

**defaultVariants**: If the user does NOT pass a `size` prop, it uses "default"

#### 3. The Button Component

The component props are a combination of

• Everything a native button can have
• All variant props we defined in our variant.

This is possible because the `tv` function merges

• the base classes
• the selected variant classes
• any custom className passed by the user

### Widget

Our widget is going to be a collapsible rather than a modal, our focus will be to expand it. Therefore, we won't use a
dialog for it, but a `Collapsible` component

Start by installing radix's `Collapsible`, import it with `* as Collapsible` and wrap the whole widget inside this
component

Wrap the whole whole widget div in a Collapsible.Root, which openOnChange and if it is open will be handled by an internal
state, and create another button component for when we the collapsible is not open.

This button will serve as a trigger for the collapsible.

Inside the upload widget header component, we are also going to have to add a Trigger button, with a button inside of it
for handling the collapsing, however, since a button cannot be nested inside other button, use asChild

## Lesson 6 - Dropzone & Title Components

Create a component for the title, and reuse it on the other components with the same text

Install the react-dropzone library

#### useDropzone explanation

Inside the `UploadWidgetDropzone` component, import `useDropzone` hook from `react-dropzone`

Assign the hook call to a `getRootProps`, `getInputProps`, `isDragActive` constants

1. `getRootProps`:

getRootProps is a function that we must use to apply the necessary properties to the parent element, it injects properties
like `onClick` and dragging and dropping event handlers to our element.
**Where to use it**: It should be used in the drop zone container

2. `getInputProps`: 

getInputProps is a function we must use to apply the necessary properties to the file input element. It configures the
input with the correct properties (such as `type="file"` and `onChange`) and visually hides it, while keeping it functional
so the user can simulate a click on it. This allows users to click in the drop area to open a file selection dialog box.

3. `isDragActive`

A boolean that indicates the current status of the drag and drop, returning true if a file is being dragged and false
if not.

The hook accepts an object with some properties like the accepted file types and if it allows multiple uploads.

`onDrop`:

  The three arguments that a onDrop requires, such as acceptedFiles, fileRejections, e events, they don't need to be
  declared by us, since they are automatically provided by any library that implements a callback structure, when the
  drop event happen

  They leave the function's default signature.

  `react-drop-zone` passes these arguments to our onDrop callback in the following order:

    1. `acceptedFiles`: An array of `File` objects that passed the validations we configured on the`accept` property.
    2. fileRejection: an array of files that were rejected
    3. event: the native browser DragEvent that fired the drop

  These variables aren´t declared by us. Dropzone declares them and send them when we call onDrop

  #### Why can i use them without declaring everything?

  onDrop is a callback, internally react-dropzone does something as

```ts
  // Inside the lib
  function handleEvent(event) {
    const acceptedFiles = [...]
    const fileRejections = [...]

    // Here we calls the callback passing the arguments
    props.onDrop(acceptedFiles, fileRejections, event)
  }
```

  Which means that:

  • It is the library that creates acceptedFiles and fileRejections and passes everything to the onDrop.


### Implementation comments

Create a nested div and pass `getRootProps` as an attribute of it along with the classes.

inside that div create an input with the `...getInPutProps()` as properties, and spans for the file to be dragged to.

### Styling based on a boolean

Inside the element, add a new attribute named `data-active` equal to the boolean value we want to style, and add a new class
named `data-[active=true]:stylewewant` what comes after the dash is dynamic.

and with this, by modifying the color when something is being dragged to the dropzone, it will modify the color.

### Finishing Setup

Inside the `useDropzone` hook options add a new property onDrop(acceptedFiles, fileRejections, event) that display which
file was accepted, rejected (based on some rule, such as types, or if other condition failed).

## Lesson 7 - List uploads Component

Create a `UploadWidgetUploadItem` component for each item we have on that list

Each item will have a div containing four buttons, download, copy url, retry and close, and in order to make then more
accessible, other than the svg, we add a span with the string className of sr-only, meaning that only screen readers will
see that text.

Install `react-progress` from `@radix-ui` and before the buttons div, include the Progress for control of each item's
progress.

### Tailwind Hack

`[&+div]:mt-2`: This attribute means that whenever we have a div after that one, add a margin-top to it

## Lesson 8 - Component's visual state

In this lesson we will focus on adding states and visual between the components.

First we add a, still hard-coded, global progress bar and a state to check if something is being uploaded

Define this check also in the title component, the reason is because it will dynamically change the text

Inside the UploadList create a constant that checks if the list is currently empty

## Lesson 9 - Widget Animations

### Parent component animation

Start by installing the motion library and importing `motion` and `useCycle` from motion/react

### useCycle

Like an useState, but it stores values change. The reason why we will opt by it, is because when working with variables
that will only be used in animations context, motion expects us to use motion's specific hooks to store these values and
make the animations more performative — and we can even see that the library itself has multiple loops.

even though it is being used in boolean values, it is not actually specific for it. useCycle is literally a simple state
machine that:

1. receives a list of values in the order we want to toggle the animation
2. returns:
  . The current value,
  . A function that advances to the next step

an example with three states could be

`const [current, cycle] = useCycle("idle", "loading", "success);

and the consecutive calls would be

cycle() -> "loading"
cycle() -> "success"
cycle() -> "idle"
cycle() -> "loading"
...


### motion.div

Replace the div with a motion.div. Every element we will animate using the framer motion, should be used inside a framer
motion container/element. 

motion.div should receive a property named variants and passing to it each step of the animation, e.g.

1 - First variant, let's say that is when the user still has'nt expanded the widget, define its width and height
2 - Second variant, is similar to the previous one, but for when the widget is "open"
3 - Define another attribute `animate` where it will animate based on the isWidgetOpen current value

In the open animation, we can also control its transition length

### motion elements / custom elements

We can notice that when creating a motion element, after the dot, we can see that it has every
element for their respective animations.

However, let's say we want to modify a component that is not part of the react, like our CircleProgressBar, that comes
from a library. In this case, we would create a constant, like `AnimatedCircularProgressBar` and assign to it, the motion
function passing the CircularProgressBar external component as argument

### Dropzone animation

In the component, start by changing the div to a motion.div and defining its initial state, and what we want to happen on
its animation

### Why the dropzone div animates without a condition?

This is the default functioning of Motion. In the dropzone we are saying

• initial -> value ONLY on the component's first render
• animate -> final value EVERY time the component is in the DOM

Meaning

. It doesn't depend on the parent
. It doesn't depend on the variants
. It doesn't depend on any state

As long as the component exists, motion will animate it.

So whenever motion mounts that component (e.g. the first time it becomes visible), it animates from 0 to 1

### Item animation

We will do the same thing as we did with the dropzone's opacity

## Lesson 10 - Button gradient border

In this lesson we will begin updating the minimized title when it has something in progress. Start creating a boolean
boolean constant `isThereAnyPendingUpload`.

Add the property `data-progress` to the `motion.div` and base it according to that constant value. Now we can create our
stylings on the combination of data-progress and data-state values. Therefore, when the pending state is true and the
`Collapsible` is closed, we will add additional stylings to it

## Animation/Keyframes Breakdown

The global css is the new place to define theme, tokens and utilities. Tailwind v4 introduced the new feature @theme, that
allows us to declare design tokens directly within the CSS — what we were able to do only in the config

In Tailwind v4, animations and keyframes follow native CSS rules, with some specifics for custom properties:

1. Animating CSS variables (--border-angle)

• We can animate a CSS variable using @property and @keyframes.
• The variable itself (--border-angle) must be defined with @property in @layer base because Tailwind does not process Houdini
properties inside @theme.

2. Using @theme

• @theme is meant for design tokens (colors, fonts, spacing, animation strings).
• We can define the animation string there, e.g.:

`--animate-border: border 2s linear infinite;`

• Tailwind understands token and keyframes defined here **only if they modify native CSS properties**
• Since `--border-angle` is a **custom property**, its keyframe must be outside of `@theme`

3. Placing @keyframes

• For native properties: inside @theme block
• For CSS variables (e.g. `--border-angle`): outside `@theme`

If an animation doesn't modify a CSS custom property, such as the @property we are defining inside `@layer base{...} ` and
use it as `@theme { @keyframes name { ... }}`, but since we are modifying a non native CSS, a property border-angle we create, it must be outside
of the theme

Our correct code is:

--animate inside @theme
@layer base {} for the property
and @keyframes outside @theme

For the border-linear-gradient, we will create a custom class more complex to it, which will be

### Custom class explanation

### Initial animation and keyframe creation

Step by step:
• 1. we defined the --animate-border variable inside the @theme block
• 2. Tailwind converted the variables into frameworks tokens, allowing us to use animate-border
• 3. In tailwind v4, we are allowed to
  . @keyframes can be declared directly in the CSS
  . Tailwind automatically registers the animation
  . We can reference this keyframe in a variable inside theme
  in other words
  ```
  @keyframes border {
    to {
      --border-angle: 360deg
    }
  }
  ```

  and on the theme

  `--animate-border: border 2s linear infinite;`

• Then, tailwind understands that there exist an animation called border in the global css and provides it as an utility

### @property works because tailwind no longer interferes in CSS

  •  Tailwind v3 processed CSS with PostCSS
    -> And certain features like @property some times didn't work

  • Tailwind v4 does not use anymore PostCSS by default, it is:
    - It's own engine
    - It doesn't "aggressively" transform our CSS
    - It doesn't remove @property
    - Doesn't rename variables
    - Doesn't rewrite keyframes
  
  As a result we were able to define @property --border-angle inside @layer base

### @layer works perfectly

  Tailwind v4 still supports @layer, but in a different way

  • We are able to create fully customized utilities
  • They coexist with tailwind classes
  • Tailwind doesn't try to extract none of it — Final CSS includes as we wrote.
  • Which means that our @layer utilities method works without having to extend anything

### Selector with `:is()` works because Tailwind v4 doesn't limit complex selectors anymore

  #### a) What `:is(...)` does?

  • `:is()` is a pseudo-class that allows us to write one selector that matches any selector in its list. Think of it as
  “selector OR selector OR selector.”

  Example:

  button:is(.primary, .secondary){ ... }

  it matches these two classes and we can use it to reduce repetition in complex selectors, make longer selectors easier
  to maintain, and allows the combination that would otherwise require multiple rewritten selectors

  In our code 

  ```css
  .progress-border {
  &:is([data-state='closed']):is([data-progress='true']) {
    background: ...;
    }
  }
  ```

  the nesting is expanded, it becomes

  ```css
    .progress-border:is([data-state='closed']):is([data-progress='true']) {
      background...
    }
  ```

  which is equivalent to 

  ```css
    .progress-border[data-state='closed'][data-progress='true'] {
      background ...
    }
  ```

  One thing to note is, that this form

  :is([a]):is([b])

  is an AND, not an OR.

  The element must satisfy both pseudo classes

    #### a) What the & does (nesting)

  The `&` stands for: "the parent selector in this nested block".

  It is used in modern CSS nesting (and older Sass-style nesting)

  Example:

    ```cs
      card {
        &.active { ... } // -> card is active
        & > .icon {...} // -> card > .icon
      } 
    ```

  Therefore, in our case:

  ```ts
    .progress-border {
      &:is([data-state="closed"])
    }
  ```

  becomes

  `.progress-border:is([data-state='closed'])`

  So `&` simply represents .progress-border when the nested selector is flattened.


  ### Last but not least: Am i using inside that class the keyframes and animations defined

1. Yes, we registered a property named --border-angle, and defined a @keyframe to this variable, changing its degree from
0 to 360.

Which means that:
  • We have a custom animatable property (`--border-angle`)
  • One animation named border
  • This animation makes the variable to spin

2. But where am i applying this animation? 
  
  We defined the --`animate-border` design token inside of theme, animate border will infinitely execute that border 
  keyframe we created. Now, it is a part of tailwind and can be accessed with the utility `animate-border`.

  However, we defined an animation token, but we did not tell the element to use this animation

3. How are we really calling it?

  The progress border class, makes use of `:is` to check if both the collapsible state is closed, and the progress is true.
  
  We do not have to call `animate` because radix + tailwind + data-attributes + css transitions are doing this automatically
  for us

  1. Radix toggles a data attribute automatically, modifying the data.state
  2. Our animation is defined in tailwind using the both these conditions
  3. The animation only starts because the attributes change and meet the requirements. Radix changes the attributer,
  Tailwind sees the new attribute and applies the animation class, and CSS "turns on" the animation

4. Why does it feels like "the class turn on"? 

Because in CSS

• Selectors = conditions
• When conditions match, the rule applies
• When conditions stop matching, the rule is removed

So it behaves almost like "switching on/off a class", even though it is a pure selector logic.

And since we have an animation inside that block, as soon as the selector matches the animation starts and stop.

  
## Lesson 11 - Store Setup With Zustand

There are different ways to handle the state storing, like useReducer. However, nowadays there are libraries that more
go beyond `useReducer`, they help us to have a better control of the renderings inside react. State management libraries
are essential because they provide **granular control over component rendering**, ensuring components only update when
the specific data they consume changes. This directly solves the performance issues where basic solutions trigger unnecessary
re-renders.

We will have a greater granular control as soon as we have a state management library, which we can also add into it,
plugins/middlewares that are ways we can add behavior to our state, like loggings, storage persistence so when he come
back, he will continue seeing the same information, and so on.

We need to be careful with this, as have previously seen, state management isn't simply sharing an updated information
among two or more components. We must be careful, as simply sharing data is not state management. Tools that merely offer
shared state often only provide a **Context API substitution**. The key flaw of Context is its coarse-grained rendering
model — when the system does not control the rendering in fine-grained elements, but yes in larger units, like a complete
component, a subtree or a full page

State management is providing a unified form of performing updates in these states in an immutable manner and share them
across the components. It is like creating a "single source of truth" — the only origin of the truth inside our app.

The best two options are **jotai** and **zustand** 

### Zustand

**Zustand** is a replacement for Redux. Its syntax is much simpler, but it follows the same core idea:
having a **single shared state** that multiple components can subscribe to.

Unlike **Jotai**, which works with many small independent pieces of state called **atoms**, Zustand typically manages asingle, centralized store.
Each component selects only the slice of the state it needs, and it re-renders when that specific slice changes.

### Implementation

First, create a `store` folder and inside it a file called `uploads.ts`.

Every **Zustand store**, the place where we keep our shared state — is built through a hook.
The create function from Zustand receives a callback with two parameters:

• `set` → used to update the store

• `get` → used to read values from the store

#### Typing the State

For type safety, start by defining a TypeScript type representing the store’s structure.
In our case, the store will contain a list of uploads, but instead of typing it as an array, we type it as a Map.

#### Why use a Map?

Map is a key–value data structure in JavaScript that provides faster and more direct lookups than arrays.

This is important because:

1. Each upload must be uniquely identifiable.
2. Not all uploads will already exist in the database at the moment they're shown.
3. The database might not have generated an ID yet.
4. Therefore, we generate a temporary ID on the frontend, and that becomes the key in the Map.

Each upload item will follow an Upload type containing at least:

• `name` → the file name
• `file` → a reference to the uploaded File object

Next, type Zustand’s create store as UploadState and define the structure it should return.
At minimum, the store starts with an **empty Map**.

Just like other state management tools, **Zustand** stores also return functions for updating the state.
Inside UploadState, define an addUploads function and implement it inside the create call.

### Set new uploads

Inside addUploads, use a loop to iterate over the dropped files and update the store using Zustand’s set.

### How set Works

`set` is similar to React’s useState, but more flexible:

• We can replace the entire state by passing an object.
• or we can partially update the state, by receiving the current state and returning the updated slice.

Because `uploads` is a Map, we can call the Map’s `.set()` method to store each new upload:

• use the generated uploadId as the key
• create an object following the Upload type
• `.set()` returns the updated Map, which we store back in Zustand

## Using the uploads state inside the dropzone component and display on the list

• Inside the dropzone component, inside the onDrop block, invoke the `addUploads` method with the `acceptedFiles`
• Inside the uploads list component, start by destructuring the useUploads we created on the store, and as argument for
the use uploads, pass the store => store.uploads
• Inside upload list component, in the condition where the list is not empty, we are doing the following:

1. `uploads` is a Map<string, Upload>, therefore, each entry stores a string: `Upload`
2. `uploads.entries()`
  . Returns an iterator that produces tuples in the format [key, value] for each entry in the `Map`
  . For our `Map`, each tuple has the type `[string, upload]`
3. `Array.from(uploads.entries())`
  . Converts the iterator into an array of tuples [[key, value], [key, value], ...].
  . This is needed to call `.map` directly (we could also use spread: [...upload.entries()])
4. `map([uploadId, upload] => { ... })
  . Here we destructure each tuple [key, value]  into two local variables: uploadId and upload
  . `uploadId` is the key of the `Map` (in our case, a UUID string)
  . `upload` is the value associated with that key (the `Upload` object)
  . Note: These variable names (`uploadId`, `Upload`) are arbitrary, we choose them. However the types come from the `Map`,
  not the variable names.
5. What `map` is doing
  . It iterates through each tuple in the array and returns a new array where each entry is the result of the cb function,
  in this case, a JSX element
  . The final result is an array of React components.
6. Typescript inference
  . If `uploads` is typed as `Map<string, Upload>`, ts automatically infers:
    .`uploadId: string`
    .`upload: Upload`
  

## Upload item

  Modify `UploadListItem` component  to accept a upload as property

  Create a new interface  that will receive an upload of type Upload defined in the store.
 
  Use the new upload property to modify the hard coded component

### formatFileSize Util

  Create a formatFileSize util function to format the uploaded file size.

## Using Immer with Zustand

Immer is a library used combined with state management tools and it helps us to deal with react's immutability. In react
when we are going to alter an information, such as uploads, we always have to completely replace this information, we can't
simply modify the information. We should not simply make an array.push and put the new information on the end, because we
always have to return the complete array.

Immer removes this necessity, we are able to make the updates the way we want and the immer itself will calculate how it
should do this update in an immutable way.

And zustand already has an internal library dedicated to immer.


### Implementation

Inside the uploads store, start by importing immer from `zustand/middleware/immer`

Wrap create's callback with immer and add a generic, along with the state, a [['zustand/immer', never]] array

By default, immer does not have type to Js's Map/set, so we have to import `enableMapSet` from immer and invoke it before
calling the hook

With immer, our set does not have anymore to return the current uploads state, only use a

```ts
  set(state => {
    state.uploads.set(uploadId, upload)
  })
```

and now it will automatically render on screen whenever a new file is uploaded

## Zustand Map Re-render

### Why wasn't without immer wasn't working?

• Map.set mutates the same Map
• Zustand makes the shallow comparison
• Reference doesn't change, so zustand doesn't recognize
• No re-render happens

### Why it started working with immer?

### ****Important: enableMapSet() is required*****

Without it, immer does not know how to correctly deal with Map/Set 

Because Immer

1) Creates a draft proxy of that state 
  - In other words, `state.uploads` becomes a "fake mutable state"

2) Any mutation inside set(state => {...})
  - Immer intercepts it
  - marks that slice as modified
  - in the end, generates a new immutable state

Meaning that

  `state.uploads.set(uploadId, upload)`

With inner becomes

  ```ts
    const copiedMap = new Map(originalMap)
    copiedMap.set(uploadId, upload)
    return copiedMap
  ```

3) As a result, the reference changes
  - zustand detects the change
  - react re-renders it
  - list updates in the same way     


## Upload Files in the API

Start by creating a folder "http" and a "upload-file-to-storage.ts" file


### initial uploadFileToStorage

1. This method will accept a file as props, and use `axios` to make the API calls
2. Define a `data: FormData` constant, and on each post request, append this file to that request
3. Define a `processUpload` function inside useUploads body

### initial processUpload function

This function retrieves the upload from zustand storage, based on the uploadId of the upload passed as parameter, and call
the uploadFileToStorage method with that specific upload.

The way we can get this id inside immer is very simple. Since zustand create inner function have a set and a get, we can
use `get().uploads.get(uploadId)` the second get comes from the Map type.

At the moment it will only be used to upload to the server, but in the future it will also be used to compressing the file,
resize, and more.

## Cancellation and retries

1. define a new status prop on the upload type, and create every constant with the status of `progress`
2. define a new method cancelUpload for the UploadState
3. In the cancel upload method, utilize the set to modify that state, we set a new state spreading over the upload we retrieved
from the database, and modify the upload status. This modify the status on the code, but it still don't stop the upload
4. Inside the uploadFileToStorage function, define a new interface for that call options, a signal of type AbortSignal,
which is how we cancel something on the web, and use this signal on the axios call.
5. Define a new `abortController` property inside the `Upload` type in the Upload interface as optional, and
add it whenever a new Upload is created in the `addUploads` function
   
### processUpload - pt2

Inside the uploadFileToStorage parameters, add a new object with the property signal using `upload.abortController.abort`

### cancelUpload

Utilize upload's signal and call `upload.abortController.abort()`.

On the upload-widget-item, start by importing the function from the state and whenever the cancel button is clicked, 
invoke the cancel function

To update the view and the user can see that the upload was canceled, add a new div beneath the file compression to inform
in case the status is error or canceled.

Modify the progress bar in case the upload fall in one of these two options

and to inform that the process is complete, do the same as we did to inform the status is canceled, but for when it succeeds

## Progress Monitoring

Modify the Upload type by adding two new properties:

`uploadSizeInBytes: number`: How many bytes already have been loaded
`originalSizeInBytes: number`: size that comes from the file

• update UploadFileToStorage, add a new property to monitor the progress of the upload.

• Inside onProcessUpload, add the new property onProcess to the `uploadFileToStorage` function, and where we update the
state, now, also, inform that `uploadSizeInBytes` it receives as parameter

• In the item component, use that new originalSizeInBytes as parameter to the formatBytes function, and define a progress
constant.

• Define a progress constant that multiples the uploadedInBytes by the original size and divide by 100, and update the
value wherever we hard-code the progress

• Modify the try catch by checking if the error is an instance of CanceledError otherwise the catch falls into Error

## Calculate pending uploads state and global percentage

• Start by creating a new hook inside the uploads store named `usePendingUploads`

• usePending uploads invoke useUploads and retrieve the uploads with status `processing`

• The way it uses to calculate a global percentage is by defining a reduce that sums all the uploads size in byte, and how
much each file has been uploaded, then defining a globalPercentage constant with how much has been uploaded by each file
divided by the total bytes, divided by 100, and then returning it to the user.

• Assign the `isThereAnyPendingUploads` constant to the returned value of that function. But this may lead to an issue.

### useShallow

When using hooks, zustand recommends to make use of the `useShallow` when we create these custom hooks that retrieve values
from the state and return more than one value, such as an object, so it can memoize it accordingly.

Therefore, wrap the function inside useUploads in a useShallow hook

### 0% Progress On Completion

In the beginning of the processUpload function, we are retrieving all the uploads, and we continue using the same value
over and over, just creating new files on the store, to fix this, we create a new function that will update that specific
upload state based on the id, and call that function every time we upload the state.

**And we must never forget that immer asks us to never return a state update, and just perform the updates with set**

This will make:

1. Every time we make an update, it will fetch the upload again without having to worry of having an out-dated version
2. In the set state, before the upload.set, update that upload by passing the id and the data we want to change, in this
case, the status
3. On the uploadFileStorage, inside the set, call the uploadUpload function, passing the data we want to update.

## Compress, Resizing and Image Compression

We start by compressing the image so it fit a maximum and minimum width

Start by creating a utils function, defining the allowed mime types, and creating a new `FileReader()` instance which wil
allow us to read a "physical" file bit by bit through the browser.

on the reader.onload create a new Image and attribute to it.

And we fit this resizing to desired width and height by making use of "canvas"

## Download Image from Cloudflare

Here we make use of a `SlotComponent`, it basically works like this

For example, we have our button component. It is a button and behaves like a button. However, if at any point we wish to
wish to, inside HTML, transform it into another tag, while maintaining its styling and use, we can do it with Slot components

Start by installing the react-slot from @radix/ui, and importing Slot inside the button component.

Define a new button property asChild and inside the function scope, define a new constant component that will check if the
asChild is true, it will be assigned to Slot, which will be whatever button child, otherwise, to 'button'

Now, on the function return, instead of returning a <button> we return a <Component>

Inside the upload widget item, inside the download button, which we want to behave as an anchor, add the property asChild
to that button, and wrap the icon in an `a` tag.

Set the href as the upload remote url and add the attribute download



## Tailwind Group

A `group` is a special Tailwind class that transforms the element in a "group", allowing that child elements react to the
parent state, such as hover, focus, data-* attributes, aria state, etc.

Without group a child can only style itself
With group a child can be styled based on what happens to the parent

A group is commonly used when a child must have his state modified based on its parent, like:

```ts
  <div class="group">
    <button class="group-hover:text-red-500" />
  </div>

  // or
  <Progress.Root
    className="group"
    data-status={upload.status}
  >

  <div className="
  group-data-[status=success]:bg-green-500
  group-data-[status=error]:bg-red-500" 
  />
```

## useUploads confusion

`useUploads(selector)` is the state slice that we are selecting, in this case, `uploads`.

However, `useUploads` isn't only a slice. It is the hook generated by Zustand to access the complete state and any function
defined in it,

### What is `useUploads`?

`useUploads` is a custom hook that works as an entry port for the complete store we created

1. The full store

  The object we return inside create is the full store state

  ```ts
    // This  is the full store (upload state)
    return {
      uploads: new Map(), // <-- 1. the data slice
      addUploads // <-- 2. The update function
    }
  ```

  The type defined (`UploadState`)  represents all the properties (data and functions) of this store

2. Selector function

  When we call `useUploads(store => store.uploads)` we are using a selector function. This function receives the full store
  as an argument, which is what we call store

  zustand passes us the complete object so that we can select which slice we want.

3. Conclusion
  
  • `useUploads` (without arguments): hook that connects our component to the store
  • `store` (inside the selector): full state object we defined ({ uploads, addUploads })
  • **Selector Return**: Is the `uploads` slice we chose, and this is what the hook returns to the component
      
### Collapsible Explanation

Radix UI's `Collapsible.Root` controls an **internal** state named `open`. This open value changes whether the component is
expanded or not. By default, radix managed the open state automatically, unless we transform it on a controlled component,
with `open` and `onOpenChange` .

• `onOpenChange`: This callback is automatically fired by radix every time the user:
  . Clicks on the `Collapsible.Trigger`
  . Presses Enter/Space on the trigger
  . Uses the keyboard to navigate
  . Any open/close interaction

- It receives the new state
  . `true` -> just open
  . `false` -> just closed 

Radix automatically modifies the value using a open state internally within the `Root` itself.



## Tailwind CSS v4: Core Changes and New Paradigm 

Tailwind CSS v4 introduces major architectural and configuration shifts, simplifying the setup while enhancing performance
and customization via native CSS features.

For the button, install the tailwind-variants library, since it will make the generic button more customizable with it.

Inside the button function, utilize the ComponentProps from react and use the 'button' as a generic.


### ● Key Architectural Changes 

The new version focuses on a Zero-Config approach powered by a rewritten, high-performance engine

#### 1. Zero-Config by Default

The configuration file (tailwind.config.js or .ts) is now optional for basic usage. Tailwind
works out of the box with only the CSS import `@import "tailwindcss";`

#### 2. Elimination of Content Scanning

Tailwind v4 replaces the manual content: [] array with a new "keyword scanning engine."

• It automatically detects all required utility classes. 

• Manual configuration of file paths is no longer necessary, drastically simplifying the build process.

#### **3. Rewritten Engine (Rust-Based)**

The core engine has been rebuilt in Rust, resulting in significant performance gains and quality-of-life improvements:

**• Speed**: Builds are approximately 10x faster.
**• Size:** Smaller final CSS output.
• **Developer Experience:** Improved IntelliSense and JIT (Just-In-Time) behavior.

### ● New Approach to Customization and Theming

Customization shifts from nested JavaScript objects to plain CSS, aligning with standard web development practices.

#### 4. CSS-First Theming (@theme Directive)

Tailwind v4 introduces the @theme directive, which is the new mechanism for extending the design tokens (colors, spacing,
fonts)

• Purpose: The @theme block instructs Tailwind to generate corresponding utility classes (e.g. defining `--color-navy-blue`
generates `bg-navy-blue`, `text-navy-blue`, etc)

• Replacement: This entirely replaces the use of `theme.extend` inside `tailwind.config.ts` for most properties.

However, `@theme` replaces it, but isn't used to create classes, only tokens

#### Tailwind v3 vs v4 Theming Syntax:

**Spacing**:
    
**v3:**  spacing: { '128': '32rem' } 
**v4**:  @theme { --spacing-128: 32rem; }


**Colors**:
    
**v3:**  colors: { 'navy-blue': '#000080´ } 
**v4**:  @theme { --colors-navy-blue: #000080; }

**Fonts**:
    
**v3:**  fonts: { sans: ['Inter', ...defaultTheme.fontFamily.sans] } 
**v4**:  @theme { --font-sans: ['Inter', ...defaultTheme.fontFamily.sans]; }

```ts
  /* Imports all the Tailwind v4's core utilities */
@import "tailwindcss"; 

/* Uses the @theme block to add or overwrite the theme */
@theme {
  --spacing-128: 32rem; 
  --color-navy-blue: #000080; 
  --font-sans: Inter, var(--default-font-sans);
}
```


#### 5. Custom Utility and Component Creation (`@layer`)
The `@layer` directive is used for a different purpose than `@theme`: it handles the organization and creation of custom
CSS rules or components that use the @apply directive.

##### Why @layer utilities is used instead of @theme:
`@theme` **creates tokens** (variables) that generate a large set of classes (e.g., bg-, text-, border-).

`@layer utilities` **creates a single class** (.btn, .card) by combining existing Tailwind utilities using @apply. This
class is placed in the correct cascade order, making it easier to override later.

##### Example: Creating a Custom Component Utility

```ts
@layer utilities {
  .btn {
    @apply px-4 py-2 bg-blue-600 text-white;
  }
}
```
This pattern replaces many traditional uses of the `theme.extend` object for creating component shortcuts.

#### 6. Minimal JavaScript Configuration

The tailwind.config.ts file still exists, but is now reserved for things that truly require a JavaScript context, such as:

• Custom colors (if complex logic is needed)
• Theme presets
• Plugin registration

### Working with Custom & Arbitrary Values

**Handling Complex CSS Properties (like `boxShadow`)**

For highly complex CSS properties that use a list of values (like our `boxShadow` example), the best practice is to combine
native CSS variables with the `@layer` directive:

1. **Define the CSS Variable**: Define our complex value as a variable (e.g., `--shadow-shape`) within `@theme` block:

--shadow-shape: 0px 8px 8px rgba(0, 0, 0, 0.1), /* ... rest of your complex value */

Create the Utility Class: Create a custom class that reference our theme variable like

```
.shadow-shape {
  box-shadow: var(--shadow-shape);
}
```

#### Understanding Arbitrary Values
Arbitrary Values ([]) are still supported and ideal for unique, one-off situations where creating a reusable theme utility
would be overkill. They allow using any custom CSS value directly within the HTML class, such as:

`bg-[url('/custom-image.jpg')]`

`w-[300px]`

Current Limitation (v4 Note): Currently, Tailwind v4 does not fully support mapping opacity values via CSS variables within
utility classes (e.g., bg-white/[var(--opacity-2)]). You must still rely on explicit arbitrary values like bg-white/[0.02].

### Utility Values Limitations

The problem wasn't about where we define the `--opacity-2` variable, yet, how tailwind interprets that utility syntax

The opacity part inside a utility class like bg-white/[value] expects

1. A direct numerical value, such as 0.02
2. Or an arbitrary css value that it can resolve.

Tailwind's parser is not able to resolve a css variable reference inside that opacity slot and convert it to a valid class
that calculates the final color.

### v4 Practical Example

#### 1. Complex shadows
   
```ts
@theme {
  --shadow-card: 0px 8px 8px rgba(0,0,0,0.1), inset 0px 2px 4px rgba(0,0,0,0.05);
}

@layer utilities {
  .shadow-card {
    box-shadow: var(--shadow-card);
  }
}
```

2. Custom components with @apply

`@layer components {
  .btn {
    @apply px-4 py-2 bg-blue-600 text-white;
  }
}`
