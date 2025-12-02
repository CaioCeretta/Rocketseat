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


## Tailwind Changes

Tailwind had some major changes with the new version v4, which are:

#### • 1.  Zero-Config by default 

In v3 you needed a tailwind.config.js for most things.
In v4, the config file is optional.
Tailwind works out of the box with just:

@import "tailwindcss"

####  • 2. No more content scanning

v3 required a content: [] array to tell Tailwind where to look.
v4 has a new “keyword scanning engine” that automatically detects all utilities.

it has no more config or file paths.

#### • 3. Many customizations moved from JS config → CSS

For example, instead of extending themes in `tailwind.config.js`, we can now use `@layer` directly in CSS

our index.css can have

```ts
@layer utilities {
  .btn {
    @apply px-4 py-2 bg-blue-600 text-white;
  }
}
```
This replace many uses of theme.extend

#### • 4. Configuration still exists — but simpler

If we want, we can still use:

`tailwind.config.ts`

But only for things that truly need it, like:

• Custom colors
• Custom fonts
• Theme presets
• Plugin registration


```
#### 5. New CSS first-theming

Tailwind v4 encourages **CSS variables** for theming (colors, dark mode, multi-themed apps).

Example:

```ts

:root {
  --brand: #ff4d4d;
}

.bg-brand {
  background: var(--brand);
}

  <div class="bg-var(--brand)> />
```

### • 6 - Rewritten Engine (faster, smaller, smarter)

Tailwind v4 rebuilt the engine in rust

• builds ~10x faster
• smaller CSS output
• better IntelliSense
• improved JIT behavior

We don't need to configure anything, it just works

In summary, v4 removes the config file requirements, moves customization into CSS using layers, eliminates content scanning,
and ships a faster, simpler, zero-config engine.

### What about the layers?

In tailwind v4, the @layer patterns and the specific directives like @base, @components, @utilities aren't necessary
in most cases.

Every structure is condensed inside @import "tailwindcss";

### Tailwind v3 vs Tailwind v4

The main difference is the change of a nested JS object to a plain list of CSS variables inside a @theme block

#### Tailwind v3

Tailwind used to create a `tailwind.config.ts` files with something like

```ts
  import defaultTheme from 'tailwindcss/defaultTheme'; 

module.exports = {
  theme: {
    extend: {
      // 1. Spacing
      spacing: {
        '128': '32rem', // Create the classes p-128, m-128, etc
      },
      
      // 2. Cores
      colors: {
        'navy-blue': '#000080', // Create the classes 'bg-navy-blue', 'text-navy-blue', etc.
      },

      // 3. Fontes
      fontFamily: {
        // extends 'sans' adding 'Inter' as the main one, maintaining the default fallbacks
        sans: ['Inter', ...defaultTheme.fontFamily.sans], 
        serif: ['Georgia', 'serif'], // Creates the class serif
      },
    },
  },
  plugins: [],
}
```

#### Tailwind v4

In this version, we make the configuration directly inside the main CSS file (ex. globals.css, index.css), using the
directive @theme and plain CSS variables, like:

```ts
/* Imports all the Tailwind v4's core */
@import "tailwindcss"; 

/* Uses the block @theme to add or overwrite the theme */
@theme {
  /* 1. Spacing - Prefix --spacing- */
  --spacing-128: 32rem; 

  /* 2. Cores - Prefix --color- */
  --color-navy-blue: #000080; 

  /* 3. Fontes - Prefix --font- */
  /* Uses var(--default-font-sans) as tailwind's native fallback */
  --font-sans: Inter, var(--default-font-sans);
  --font-serif: Georgia, serif;
}

/* 
* We can still use the classes the same way as before
* <div class="p-128 bg-navy-blue font-sans">Ciao, mondo</div>
*/
```


## Lesson 4 - Structuring the widget

Start by creating a upload-widget component

Get from figma the custom shadows we are using

### Tailwind note

When creating the variable --shadow-shape inside our css, this shadow isn't using tailwind's default utilities, but "arbitrary
values" 

Arbitrary values are a feature inside Tailwind CSS that allow us to use any custom CSS value directly within our HTML
classes, bypassing the pre defined design system.

When using [] to enclose the custom CSS value after a standard tailwind utility prefix.

It is ideal for unique situations where creating a reusable utility class in the config file would be overkill and we can
still use any valid CSS unit, including px, rem, em, var, etc

#### Our example

The reason of the way we called the class was needed because the name of our CSS variables (--shadow-shape) did not fit
the default tailwind's nomenclature

And the new way to access these values is going to be a little different, where would use something as

opacity: {
  2: 0.02
}

what would make us able to utilize something as bg/2, where 2 would be the value of this variable, we will have a little more
workaround:

`<div class="bg-white/[var(--opacity-2)]">`








