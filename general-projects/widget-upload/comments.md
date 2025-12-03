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
